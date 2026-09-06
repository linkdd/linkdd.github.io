import type { DesktopApp } from '@/components/os/Desktop/types'

import SkillsBrowser from '@/apps/Skills/components/SkillsBrowser'

import ComputerUrl from '@/assets/icons/computer.png'

import { skills } from '@/apps/Skills/data'


const App: DesktopApp = {
  id: 'skills',
  title: 'Skills',
  icon: <img src={ComputerUrl} alt="" />,
  initialSize: { width: 780, height: 480 },

  content: (
    <SkillsBrowser groups={skills} />
  ),
}


export default App
