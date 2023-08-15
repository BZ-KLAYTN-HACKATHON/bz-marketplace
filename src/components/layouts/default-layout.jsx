import { Nav } from 'components/main'

export const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  )
}
