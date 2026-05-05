$(function() {
  const $focusSelector = $('#cv-focus-selector')

  const $title = $('#cv-title')
  const $skills = $('div[data-skill-category]')
  const $skillChart = $('#skill-chart')
  const $jobs = $('div[data-job]')
  const $projectSection = $('#cv-projects')
  const $projects = $('tr[data-project-tags]')

  function onFocusChanged(desiredTags) {
    $title.text($focusSelector.find('option:selected').text())

    const series = {}

    $skills.each(function() {
      const skillCategory = $(this).data('skill-category')

      const datapoints = []

      const $table = $(this).find('table')
      const $rows = $table.find('tr[data-skill-tags]')

      let hasVisibleSkills = false

      $rows.each(function() {
        const $elt = $(this)
        const skillTags = $elt.data('skill-tags') ?? []
        const skillRating = $elt.data('skill-rating') ?? 0
        const tagsOverlap = desiredTags === null || skillTags.some(tag => desiredTags.includes(tag))

        if (tagsOverlap) {
          $elt.show()
          hasVisibleSkills = true
          datapoints.push(skillRating)
        } else {
          $elt.hide()
        }
      })

      if (hasVisibleSkills) {
        $(this).show()
        series[skillCategory] = datapoints.reduce((a, b) => a + b, 0) / datapoints.length
      } else {
        $(this).hide()
      }
    })

    const chartOptions = {
      type: 'radar',
      data: {
        labels: Object.keys(series),
        datasets: [
          {
            data: Object.values(series),
            fill: true,
          },
        ],
      },
      options: {
        layout: {
          padding: 0,
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
            },
          },
        },
        elements: {
          line: {
            borderWidth: 3,
          },
        },
      },
    }

    const oldChart = Chart.getChart($skillChart[0])
    if (oldChart) {
      oldChart.destroy()
    }
    new Chart($skillChart[0], chartOptions)

    $jobs.each(function() {
      const $elt = $(this)

      const $missions = $elt.find('article[data-job-mission-tags]')

      let hasVisibleMissions = false

      $missions.each(function() {
        const $mission = $(this)
        const missionTags = $mission.data('job-mission-tags') ?? []

        const tagsOverlap = desiredTags === null || missionTags.some(tag => desiredTags.includes(tag))

        if (tagsOverlap) {
          $mission.show()
          hasVisibleMissions = true
        } else {
          $mission.hide()
        }
      })

      if (hasVisibleMissions) {
        $elt.show()
      } else {
        $elt.hide()
      }
    })

    let hasVisibleProjects = false

    $projects.each(function() {
      const $elt = $(this)

      const projectTags = $elt.data('project-tags') ?? []

      const tagsOverlap = desiredTags === null || projectTags.some(tag => desiredTags.includes(tag))

      if (tagsOverlap) {
        $elt.show()
        hasVisibleProjects = true
      } else {
        $elt.hide()
      }
    })

    if (hasVisibleProjects) {
      $projectSection.show()
    } else {
      $projectSection.hide()
    }
  }

  $focusSelector.on('change', function() {
    onFocusChanged(JSON.parse(this.value))
  })

  onFocusChanged(null)
})
