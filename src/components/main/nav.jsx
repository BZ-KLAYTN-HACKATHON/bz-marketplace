import { ConnectKitButton } from 'connectkit'
import { cn } from 'lib/utils'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { Logo } from '.'

const navList = [
  {
    title: 'Store',
    path: '/'
  },
  {
    title: 'Marketplace',
    path: '/marketplace'
  },
  {
    title: 'Event',
    path: '/event'
  }
]

export const Nav = () => {
  const { pathname } = useLocation()

  return (
    <nav className='fixed left-0 top-0 z-40 flex h-[55px] w-full justify-center bg-background'>
      <div className='relative flex h-full w-full max-w-[1420px] items-center justify-between'>
        <Logo className='absolute left-0 top-0 h-[67px] w-[98px]' />

        <ul className='flex items-center gap-10 pl-[158px]'>
          {navList.map((item, idx) => (
            <NavItem
              key={idx}
              path={item.path}
              isCurrent={matchPath(
                `${item.path}${
                  item.path[item.path.length - 1] !== '/' ? '/' : ''
                }*`,
                pathname
              )}
            >
              {item.title}
            </NavItem>
          ))}
        </ul>

        <ConnectKitButton showBalance={true} showAvatar={false} />
      </div>
    </nav>
  )
}

const NavItem = ({ children, path, isCurrent }) => {
  return (
    <li
      className={cn(
        'transition-default text-base text-white underline-offset-4 hover:text-primary hover:underline',
        isCurrent ? 'text-primary' : ''
      )}
    >
      <Link to={path}>{children}</Link>
    </li>
  )
}
