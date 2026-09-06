import type { DesktopApp } from '@/components/os/Desktop/types'

import ProjectsTable from '@/apps/Projects/components/ProjectsTable'

import DirectoryProgramGroupUrl from '@/assets/icons/directory-program-group.png'

import { projects } from '@/apps/Projects/data'


const App: DesktopApp = {
  id: 'projects',
  title: 'Projects',
  icon: <img src={DirectoryProgramGroupUrl} alt="" />,
  initialSize: { width: 780, height: 440 },

  content: (
    <ProjectsTable projects={projects} />
  ),
}


export default App
