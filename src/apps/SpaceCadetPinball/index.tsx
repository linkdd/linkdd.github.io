import type { DesktopApp } from '@/components/os/Desktop'

import PinballUrl from './assets/icon.png'


const App: DesktopApp = {
  id: 'pinball',
  title: 'Pinball',
  icon: <img src={PinballUrl} alt="" />,
  // The web build renders at 600×440, plus the 3px frame and 20px title bar.
  initialSize: { width: 606, height: 466 },
  resizable: false,
  noborder: true,
  content: (
    <iframe
      src="/templates/spacecadetpinball.html"
      title="Space Cadet Pinball"
      width="100%"
      height="100%"
      style={{ display: 'block', border: 0 }}
    />
  ),
}

export default App
