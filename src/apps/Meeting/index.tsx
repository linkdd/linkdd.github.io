import type { DesktopApp } from '@/components/os/Desktop'

import PhoneDeskUrl from '@/assets/icons/phone-desk.png'

import meetingData from './data'


const App: DesktopApp = {
  id: 'meeting',
  title: 'Meeting',
  icon: <img src={PhoneDeskUrl} alt="" />,
  initialSize: { width: 640, height: 480 },
  content: (
    <iframe
      src={meetingData.calendly}
      width="99%"
      height="99%"
    />
  ),
}

export default App
