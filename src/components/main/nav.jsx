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
    <nav className='fixed left-0 top-0 z-40 flex h-[55px] w-full justify-center bg-background/70 backdrop-blur-md'>
      <div className='ctn relative flex h-full items-center justify-between px-2.5'>
        <Logo className='absolute left-0 top-0 h-[67px] w-[98px]' />

        <ul className='hidden items-center gap-10 pl-[158px] md:flex'>
          {navList.map((item, idx) => (
            <NavItem
              key={idx}
              path={item.path}
              isCurrent={
                item.path === '/'
                  ? matchPath(`/`, pathname) || matchPath(`/store/*`, pathname)
                  : matchPath(`${item.path}/*`, pathname)
              }
            >
              {item.title}
            </NavItem>
          ))}
        </ul>
        <div className='block md:hidden'></div>

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
