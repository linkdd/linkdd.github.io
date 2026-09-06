import type { DesktopApp } from '@/components/os/Desktop/types'

import GroupBox from '@/components/base/GroupBox'
import FreelancingOffer from '@/apps/AboutMe/components/FreelancingOffer'

import ChmUrl from '@/assets/icons/chm.png'

import Markdown from 'react-markdown'

import { profile, freelancing } from '@/apps/AboutMe/data'

import { AboutLayout, BioPanel } from './styled'

const App: DesktopApp = {
  id: 'about-me',
  title: 'About Me',
  icon: <img src={ChmUrl} alt="" />,
  initialSize: { width: 560, height: 480 },
  content: (
    <AboutLayout>
      <GroupBox legend="Bio">
        <BioPanel className="sunken-panel">
          <Markdown>{profile.bio}</Markdown>
        </BioPanel>
      </GroupBox>

      <FreelancingOffer offer={freelancing} />
    </AboutLayout>
  ),
}

export default App
