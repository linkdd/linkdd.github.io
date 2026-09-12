import type { DesktopApp } from '@/components/os/Desktop/types'

import PictureGallery from './components/PictureGallery'
import DirectoryPicturesUrl from '@/assets/icons/directory-pictures.png'


const App: DesktopApp = {
  id: 'pictures',
  title: 'Pictures',
  icon: <img src={DirectoryPicturesUrl} alt="" />,
  initialSize: { width: 680, height: 480 },

  content: <PictureGallery />,
}


export default App
