import { Nav } from 'components/main'
import { Toaster } from 'components/ui/toaster'

export const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Nav />
      <Toaster />
      {children}
    </div>
  )
}
