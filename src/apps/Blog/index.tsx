import type { DesktopApp } from '@/components/os/Desktop/types'

import BlogReader from '@/apps/Blog/components/BlogReader'

import ExplorerUrl from '@/assets/icons/explorer.png'


const App: DesktopApp = {
  id: 'blog',
  title: 'Blog',
  icon: <img src={ExplorerUrl} alt="" />,
  initialSize: { width: 800, height: 480 },

  content: (
    <BlogReader />
  ),
}


export default App
