import { readFile, mkdir } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import { finished } from 'node:stream/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { parse } from 'yaml'
import PDFDocument from 'pdfkit'


const root = fileURLToPath(new URL('../', import.meta.url))
async function read(name) {
  return parse(await readFile(path.join(root, 'data', `${name}.yaml`), 'utf8'))
}

function requireValue(value, message) {
  if (!value) {
    throw new Error(message)
  }
}

function leaves(nodes) {
  return nodes.flatMap(node => node.children ? leaves(node.children) : [node])
}

function plain(text) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)').replace(/\*+/g, '').trim()
}

const [profile, experienceData, skills, projects, freelancing, cvs] = await Promise.all(
  ['profile', 'experiences', 'skills', 'projects', 'freelancing', 'cvs'].map(read),
)
const categories = leaves(skills)
const experiences = experienceData.entries

function experienceDate(value) {
  return /on ?going/i.test(value) ? Infinity : Date.parse(value)
}

for (const cv of cvs) {
  requireValue(/^[a-z0-9-]+$/.test(cv.id), `Invalid CV id: ${cv.id}`)

  // Omitted filters include all entries, including future additions to the data.
  cv.experienceIds ??= experiences.map(entry => entry.id)
  cv.skillCategoryIds ??= categories.map(entry => entry.id)
  cv.projectNames ??= projects.map(entry => entry.name)

  for (const id of cv.experienceIds) {
    requireValue(experiences.some(entry => entry.id === id), `Unknown experience ${id}`)
  }

  cv.experienceIds.sort((leftId, rightId) => {
    if (cv.id !== 'general') {
      const linkSocietyOrder = Number(leftId === 'link-society') - Number(rightId === 'link-society')

      if (linkSocietyOrder !== 0) {
        return linkSocietyOrder
      }
    }

    const left = experiences.find(entry => entry.id === leftId)
    const right = experiences.find(entry => entry.id === rightId)

    return (experienceDate(right.endDate) - experienceDate(left.endDate))
      || (experienceDate(right.startDate) - experienceDate(left.startDate))
  })

  for (const id of cv.skillCategoryIds) {
    requireValue(categories.some(entry => entry.id === id), `Unknown skill category ${id}`)
  }

  for (const name of cv.projectNames) {
    requireValue(projects.some(entry => entry.name === name), `Unknown project ${name}`)
  }
}

requireValue(new Set(cvs.map(cv => cv.id)).size === cvs.length, 'Duplicate CV ids')

await mkdir(path.join(root, 'public/cvs'), { recursive: true })

for (const cv of cvs) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 40, bottom: 40, left: 40, right: 40 },
    bufferPages: true,
    pdfVersion: '1.7',
    tagged: true,
    displayTitle: true,
    lang: 'en-GB',
    info: {
      Title: `${profile.name} - ${cv.title}`,
      Author: profile.name,
      Subject: `Curriculum vitae - ${cv.title}`,
      Keywords: cv.skillCategoryIds.flatMap(id => (
        categories.find(category => category.id === id).technologies.map(skill => skill.name)
      )).join(', '),
    },
  })

  const output = createWriteStream(path.join(root, 'public/cvs', `${cv.id}.pdf`))
  const completion = finished(output)

  doc.pipe(output)
  doc.registerFont('Body', path.join(root, 'src/assets/fonts/Lato-Regular.ttf'))
  doc.registerFont('Bold', path.join(root, 'src/assets/fonts/Lato-Bold.ttf'))

  const width = doc.page.width - 80
  const structure = doc.struct('Document')

  doc.addStructure(structure)

  function measure(value, size = 10, bold = false, textWidth = width) {
    doc.font(bold || value.includes('**') ? 'Bold' : 'Body').fontSize(size)

    return doc.heightOfString(plain(value), { width: textWidth, lineGap: 0.5 })
  }

  function reserve(height) {
    if (doc.y > 40 && doc.y + height > doc.page.height - 40) {
      doc.addPage()
    }
  }

  function text(value, size = 10, bold = false, tag = 'P', options = {}) {
    const { x = 40, ...layout } = options

    reserve(measure(value, size, bold, layout.width ?? width))

    const color = options.color ?? (tag.startsWith('H') ? '#164E63' : '#222222')

    const segments = value.trim().split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
    const textOptions = {
      width,
      lineGap: 0.5,
      structParent: structure,
      structType: tag,
      ...layout,
    }

    for (const [index, segment] of segments.entries()) {
      const last = index === segments.length - 1
      const content = segment.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)').replace(/\*+/g, '')

      doc.font(bold || segment.startsWith('**') ? 'Bold' : 'Body').fontSize(size).fillColor(color)

      const runOptions = { ...textOptions, continued: !last }

      if (index === 0) {
        doc.text(content + (last ? ' ' : ''), x, doc.y, runOptions)
      } else {
        doc.text(content + (last ? ' ' : ''), runOptions)
      }
    }
  }

  function section(title, followingHeight = 40) {
    reserve(measure(title, 12, true) + followingHeight + 14)
    doc.y += 8

    text(title, 12, true, 'H2')
    doc.save().strokeColor('#B9CDD5').lineWidth(0.5)
      .moveTo(40, doc.y + 2).lineTo(40 + width, doc.y + 2).stroke().restore()

    doc.y += 8
  }

  function link(label, url) {
    text(label, 9, false, 'P', { color: '#075985', link: url })
  }

  function contactIcon(kind, x, y) {
    doc.markContent('Artifact')
    doc.save().translate(x, y).strokeColor('#075985').fillColor('#075985').lineWidth(0.8)

    if (kind === 'email') {
      doc.rect(0, 1, 10, 7).stroke()
      doc.moveTo(0, 1).lineTo(5, 5).lineTo(10, 1).stroke()
    } else if (kind === 'website') {
      doc.circle(5, 5, 4.5).stroke()
      doc.ellipse(5, 5, 2, 4.5).stroke()
      doc.moveTo(0.5, 5).lineTo(9.5, 5).stroke()
    } else if (kind === 'github') {
      doc.moveTo(2, 2).lineTo(2, 8).stroke()
      doc.moveTo(8, 2).bezierCurveTo(8, 6, 2, 4, 2, 8).stroke()

      for (const [cx, cy] of [[2, 1.5], [8, 1.5], [2, 8.5]]) {
        doc.circle(cx, cy, 1.3).fill()
      }
    } else {
      doc.roundedRect(0, 0, 10, 10, 1).fill()
      doc.font('Bold').fontSize(8).fillColor('#FFFFFF')
      doc.text('in', 1.5, 0, { lineBreak: false })
    }

    doc.restore()
    doc.endMarkedContent()
  }

  function contacts() {
    const entries = [
      { kind: 'email', label: freelancing.email, url: `mailto:${freelancing.email}` },
      { kind: 'website', label: profile.website.replace(/^https?:\/\//, ''), url: profile.website },
      { kind: 'github', label: profile.github.replace(/^https?:\/\//, ''), url: profile.github },
      { kind: 'linkedin', label: profile.linkedin.replace(/^https?:\/\//, ''), url: profile.linkedin },
    ]
    const iconWidth = 14
    const gap = 12

    doc.font('Body').fontSize(8)

    const totalWidth = entries.reduce((total, entry) => (
      total + iconWidth + doc.widthOfString(entry.label)
    ), gap * (entries.length - 1))
    const y = doc.y
    let x = 40 + (width - totalWidth) / 2

    for (const entry of entries) {
      contactIcon(entry.kind, x, y)
      doc.font('Body').fontSize(8).fillColor('#075985')
      doc.text(entry.label, x + iconWidth, y, {
        lineBreak: false,
        link: entry.url,
        structParent: structure,
        structType: 'P',
      })

      x += iconWidth + doc.widthOfString(entry.label) + gap
    }

    doc.x = 40
    doc.y = y + 18
  }

  text(profile.name, 24, true, 'H1', { align: 'center' })
  text(cv.title, 15, true, 'P', { color: '#164E63', align: 'center' })
  doc.y += 10

  contacts()

  section('Professional Summary')
  text(cv.summary, 10)

  section('Relevant Technical Skills')

  for (const id of cv.skillCategoryIds) {
    const category = categories.find(entry => entry.id === id)

    const technologies = category.technologies.map(entry => entry.name).join(', ')

    reserve(measure(category.label, 10, true) + measure(technologies) + 5)
    text(category.label, 10, true)
    text(technologies)
    doc.y += 5
  }

  section('Relevant Professional Experience', 100)

  for (const id of cv.experienceIds) {
    const job = experiences.find(entry => entry.id === id)
    const company = `${job.company}${job.documentName ? ` / ${job.documentName}` : ''}`
    const dates = `${job.startDate} - ${/on ?going/i.test(job.endDate) ? 'Present' : job.endDate}`
    const firstMission = job.missions[0]?.description ?? ''
    const headerPadding = 10
    const headerWidth = width - headerPadding * 2
    const columnGap = 20
    const titleWidth = (headerWidth - columnGap) * 0.58
    const contextWidth = headerWidth - columnGap - titleWidth
    const headerHeight = Math.max(
      measure(job.title, 11, true, titleWidth) + measure(dates, 10, false, titleWidth),
      measure(job.context, 10, false, contextWidth),
    )
    const abstractPadding = 10
    const abstractWidth = width - abstractPadding * 2

    reserve(
      measure(company, 12, true, headerWidth)
      + headerHeight
      + headerPadding * 2
      + (job.abstract ? measure(job.abstract, 10, false, abstractWidth) + 25 : 0)
      + measure(firstMission, 10, false, headerWidth)
      + 16,
    )

    const headerBorderTop = doc.y
    const headerBoxHeight = measure(company, 12, true, headerWidth)
      + headerHeight + headerPadding * 2

    doc.markContent('Artifact')
    doc.save().fillColor('#F4F7F9')
      .rect(40, headerBorderTop, width, headerBoxHeight).fill().restore()
    doc.endMarkedContent()

    doc.y += headerPadding
    text(company, 12, true, 'H3', { x: 40 + headerPadding, width: headerWidth })
    const headerTop = doc.y

    text(job.title, 11, true, 'P', { x: 40 + headerPadding, width: titleWidth })
    text(dates, 10, false, 'P', { x: 40 + headerPadding, color: '#525252', width: titleWidth })
    const titleBottom = doc.y

    doc.y = headerTop
    text(job.context, 10, false, 'P', {
      x: 40 + headerPadding + titleWidth + columnGap,
      width: contextWidth,
      color: '#525252',
      align: 'right',
    })
    doc.y = Math.max(titleBottom, doc.y) + headerPadding
    doc.x = 40

    doc.markContent('Artifact')
    doc.save().strokeColor('#B9CDD5').lineWidth(1)
      .moveTo(40 + width, headerBorderTop).lineTo(40, headerBorderTop)
      .lineTo(40, doc.y).lineTo(40 + width, doc.y)
      .lineTo(40 + width, headerBorderTop).stroke().restore()
    doc.endMarkedContent()

    if (job.abstract) {
      reserve(measure(job.abstract, 10, false, abstractWidth) + 25)
      const abstractTop = doc.y

      doc.y += abstractPadding
      text(job.abstract, 10, false, 'P', { x: 40 + abstractPadding, width: abstractWidth })
      const abstractBottom = doc.y + abstractPadding

      doc.markContent('Artifact')
      doc.save().strokeColor('#B9CDD5').lineWidth(1)
        .moveTo(40, abstractTop).lineTo(40, abstractBottom)
        .lineTo(40 + width, abstractBottom)
        .lineTo(40 + width, abstractTop).stroke().restore()
      doc.endMarkedContent()
      doc.x = 40
      doc.y = abstractBottom
    }

    const missionsStartPage = doc.bufferedPageRange().count - 1
    const missionsTop = doc.y

    doc.y += 10

    for (const mission of job.missions) {
      text(`• ${mission.description}`, 10, false, 'P', {
        x: 40 + headerPadding,
        width: headerWidth,
      })
      doc.y += 1
    }

    const technologies = [...new Set(job.missions.flatMap(mission => mission.environment))]

    if (technologies.length > 0) {
      text(`Technologies: ${technologies.join(', ')}`, 9, false, 'P', {
        x: 40 + headerPadding,
        width: headerWidth,
      })
    }

    const missionsEndPage = doc.bufferedPageRange().count - 1
    const missionsBottom = doc.y + 10

    // Continue both side borders across pages and close the final mission section.
    for (let page = missionsStartPage; page <= missionsEndPage; page += 1) {
      doc.switchToPage(page)
      const top = page === missionsStartPage ? missionsTop : 40
      const bottom = page === missionsEndPage ? missionsBottom : doc.page.height - 40

      doc.markContent('Artifact')
      doc.save().strokeColor('#B9CDD5').lineWidth(1)
        .moveTo(40, top).lineTo(40, bottom)
        .moveTo(40 + width, top).lineTo(40 + width, bottom)

      if (page === missionsEndPage) {
        doc.moveTo(40, bottom).lineTo(40 + width, bottom)
      }

      doc.stroke().restore()
      doc.endMarkedContent()
    }

    doc.x = 40
    doc.y = missionsBottom
    doc.y += 6
  }

  section('Projects', 80)

  for (const name of cv.projectNames) {
    const project = projects.find(entry => entry.name === name)

    reserve(
      measure(project.name, 11, true)
      + measure(project.description)
      + measure(project.stack.join(', '))
      + (project.website ? measure(project.website) : 0)
      + 10,
    )

    text(project.name, 11, true, 'H3')
    text(project.description)
    text(`Technologies: ${project.stack.join(', ')}`)

    if (project.website) {
      link(`Website: ${project.website}`, project.website)
    }

    doc.y += 6
  }

  // Content stays in normal flow: no out-of-margin footer text that can add pages.
  const pageCount = doc.bufferedPageRange().count

  structure.end()
  doc.end()
  await completion

  console.log(`Generated ${cv.id}.pdf (${pageCount} pages)`)
}
