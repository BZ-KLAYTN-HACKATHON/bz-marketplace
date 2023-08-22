import {
  BuildingStorefrontIcon,
  GiftIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/solid'
import { ConnectKitButton } from 'connectkit'
import { Link, matchPath, useLocation } from 'react-router-dom'

import { cn } from 'lib/utils'
import { Logo } from '.'

const navList = [
  {
    title: 'Store',
    path: '/',
    icon: <BuildingStorefrontIcon className='h-full w-full' />
  },
  {
    title: 'Marketplace',
    path: '/marketplace',
    icon: <ShoppingCartIcon className='h-full w-full' />
  },
  {
    title: 'Event',
    path: '/event',
    icon: <GiftIcon className='h-full w-full' />
  }
]

export const Nav = () => {
  const { pathname } = useLocation()

  return (
    <>
      <nav className='fixed left-0 top-0 z-40 flex h-[55px] w-full justify-center bg-background/70 backdrop-blur-md'>
        <div className='ctn relative flex h-full items-center justify-between px-2.5'>
          <Logo className='absolute left-0 top-0 h-[67px] w-[98px]' />

          <ul className='hidden items-center gap-10 pl-[158px] md:flex'>
            {navList.map((item, idx) => (
              <NavItem
                key={idx}
                path={item.path}
                active={
                  item.path === '/'
                    ? matchPath(`/`, pathname) ||
                      matchPath(`/store/*`, pathname)
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

      <div
        className={cn('nav-mobile grid justify-center md:hidden')}
        style={{
          gridTemplateColumns: `repeat(${navList.length}, minmax(0, 1fr))`
        }}
      >
        {navList.map(({ title, icon, path }, idx) => (
          <MobileNavItem
            key={idx}
            icon={icon}
            title={title}
            active={
              path === '/'
                ? matchPath(`/`, pathname) || matchPath(`/store/*`, pathname)
                : matchPath(`${path}/*`, pathname)
            }
            path={path}
          />
        ))}
      </div>
    </>
  )
}

const NavItem = ({ children, path, active }) => {
  return (
    <li
      className={cn(
        'transition-default text-base text-white underline-offset-4 hover:text-primary hover:underline',
        active ? 'text-primary' : ''
      )}
    >
      <Link to={path}>{children}</Link>
    </li>
  )
}

const MobileNavItem = ({ icon, title, active = false, path = '', onClick }) => {
  return (
    <Link
      to={path}
      className={cn(
        'hover:text-highlight flex cursor-pointer flex-col items-center capitalize transition duration-150 ease-in-out',
        active ? 'font-bold text-secondary' : 'font-normal text-white'
      )}
      onClick={() => onClick && onClick()}
    >
      <div className='h-7 w-7'>{icon}</div>
      <p className=''>{title}</p>
    </Link>
  )
}
