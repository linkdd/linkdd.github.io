import type { DesktopApp } from '@/components/os/Desktop/types'

import CVDocuments from '@/apps/CVs/components/CVDocuments'
import PrinterUrl from '@/assets/icons/printer.png'

import { cvs } from '@/apps/CVs/data'


const App: DesktopApp = {
  id: 'cvs',
  title: 'CVs',
  icon: <img src={PrinterUrl} alt="" />,
  initialSize: { width: 460, height: 360 },

  content: (
    <CVDocuments documents={cvs} />
  ),
}


export default App
