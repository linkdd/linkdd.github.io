import Desktop from '@/components/os/Desktop'
import type { DesktopApp } from '@/components/os/Desktop/types'

import AboutMe from '@/apps/AboutMe'
import { profile } from '@/apps/AboutMe/data'
import Experiences from '@/apps/Experiences'
import Skills from '@/apps/Skills'
import Projects from '@/apps/Projects'
import Blog from '@/apps/Blog'
import CVs from '@/apps/CVs'
import Meeting from '@/apps/Meeting'

import GithubLogo from '@/assets/logos/github.ico'
import LinkedinLogo from '@/assets/logos/linkedin.ico'
import MediumLogo from '@/assets/logos/medium.svg'
import DevtoLogo from '@/assets/logos/devto.svg'
import LinuxfrLogo from '@/assets/logos/linuxfr.png'


const apps: DesktopApp[] = [
  AboutMe,
  Experiences,
  Skills,
  Projects,
  Blog,
  CVs,
  Meeting,
]


export default function App() {
  return (
    <Desktop
      apps={apps}
      links={[
        { title: 'GitHub', url: profile.github, icon: GithubLogo },
        { title: 'LinkedIn', url: profile.linkedin, icon: LinkedinLogo },
        { title: 'Medium', url: profile.medium, icon: MediumLogo },
        { title: 'DevTo', url: profile.devto, icon: DevtoLogo },
        { title: 'LinuxFR', url: profile.linuxfr, icon: LinuxfrLogo },
      ]}
      initialOpen={['about-me']}
    />
  )
}
