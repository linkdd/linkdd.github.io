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

for (const cv of cvs) {
  requireValue(/^[a-z0-9-]+$/.test(cv.id), `Invalid CV id: ${cv.id}`)

  for (const id of cv.experienceIds) {
    requireValue(experiences.some(entry => entry.id === id), `Unknown experience ${id}`)
  }

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

  function measure(value, size = 10, bold = false) {
    doc.font(bold ? 'Bold' : 'Body').fontSize(size)

    return doc.heightOfString(plain(value), { width, lineGap: 0.5 })
  }

  function reserve(height) {
    if (doc.y > 40 && doc.y + height > doc.page.height - 40) {
      doc.addPage()
    }
  }

  function text(value, size = 10, bold = false, tag = 'P', options = {}) {
    const content = plain(value)

    reserve(measure(content, size, bold))

    const color = options.color ?? (tag.startsWith('H') ? '#164E63' : '#222222')

    doc.font(bold ? 'Bold' : 'Body').fontSize(size).fillColor(color)
    doc.text(content + ' ', 40, doc.y, {
      width,
      lineGap: 0.5,
      structParent: structure,
      structType: tag,
      ...options,
    })
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

    reserve(
      measure(company, 12, true)
      + measure(job.title, 11, true)
      + measure(dates)
      + measure(job.context)
      + measure(firstMission)
      + 16,
    )

    text(company, 12, true, 'H3')
    text(job.title, 11, true)
    text(dates, 10, false, 'P', { color: '#525252' })
    doc.y += 3
    text(job.context)
    doc.y += 5

    for (const mission of job.missions) {
      text(`• ${plain(mission.description)}`)
      doc.y += 1
    }

    const technologies = [...new Set(job.missions.flatMap(mission => mission.environment))]

    if (technologies.length > 0) {
      text(`Technologies: ${technologies.join(', ')}`, 9)
    }

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
