import type { DesktopApp } from '@/components/os/Desktop/types'

import CalendarUrl from '@/assets/icons/calendar.png'

import ExperienceExplorer from '@/apps/Experiences/components/ExperienceExplorer'


const App: DesktopApp = {
  id: 'experiences',
  title: 'Experiences',
  icon: <img src={CalendarUrl} alt="" />,
  initialSize: { width: 580, height: 400 },

  content: (
    <ExperienceExplorer />
  ),
}

export default App
