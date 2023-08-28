import {
  BuildingStorefrontIcon,
  CubeIcon,
  GiftIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/solid'
import { ConnectKitButton } from 'connectkit'
import { useCallback, useEffect, useMemo } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useAccount, useNetwork } from 'wagmi'

import { useGlobalContext } from 'contexts/global'
import { DanceTokenABI } from 'contract/abis'
import { RG02_TOKEN_ADDRESS } from 'contract/addresses'
import { useTokenBalance } from 'hooks'
import { cn } from 'lib/utils'
import { Logo } from '.'

export const Nav = () => {
  const { pathname } = useLocation()
  const { inventory } = useGlobalContext()

  const { chain } = useNetwork()
  const { balance, refetch } = useTokenBalance({
    abi: DanceTokenABI,
    token: RG02_TOKEN_ADDRESS[chain?.id]
  })

  useEffect(() => {
    const sti = setInterval(() => {
      refetch()
    }, 15000)

    return () => clearInterval(sti)
  }, [refetch])

  const navList = useMemo(
    () => [
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
      },
      {
        title: 'Inventory',
        path: null,
        icon: <CubeIcon className='h-full w-full' />,
        right: true,
        isPrivate: true,
        onClick: () => inventory.open()
      }
    ],
    [inventory]
  )

  const { address } = useAccount()

  const allowShowPrivate = useCallback(
    (privateValue) => !privateValue || (address && privateValue),
    [address]
  )

  return (
    <>
      <nav className='fixed left-0 top-0 z-40 flex h-[55px] w-full justify-center bg-background/70 backdrop-blur-md'>
        <div className='ctn relative flex h-full items-center justify-between gap-10 px-2.5'>
          <Logo className='absolute left-0 top-0 h-[67px] w-[98px]' />

          <ul className='hidden items-center gap-10 pl-[158px] md:flex'>
            {navList
              .filter((item) => !item?.right)
              .map((item, idx) =>
                allowShowPrivate(item?.isPrivate) ? (
                  <NavItem
                    key={idx}
                    path={item.path}
                    active={
                      item.path === '/'
                        ? matchPath(`/`, pathname) ||
                          matchPath(`/store/*`, pathname)
                        : matchPath(`${item.path}/*`, pathname)
                    }
                    onClick={item?.onClick}
                  >
                    {item.title}
                  </NavItem>
                ) : null
              )}
          </ul>

          <div className='block md:hidden'></div>

          <div className='flex items-center gap-5'>
            <ul className='hidden items-center gap-10 md:flex'>
              {navList
                .filter((item) => item?.right)
                .map((item, idx) =>
                  allowShowPrivate(item?.isPrivate) ? (
                    <NavItem
                      key={idx}
                      path={item.path}
                      active={
                        item.path === '/'
                          ? matchPath(`/`, pathname) ||
                            matchPath(`/store/*`, pathname)
                          : matchPath(`${item.path}/*`, pathname)
                      }
                      onClick={item?.onClick}
                    >
                      <div
                        className={cn(
                          'flex items-center gap-1',
                          item.path === '/'
                            ? matchPath(`/`, pathname) ||
                                matchPath(`/store/*`, pathname)
                            : matchPath(`${item.path}/*`, pathname)
                            ? 'text-primary'
                            : 'text-white'
                        )}
                      >
                        <div className='h-4 w-4'>{item.icon}</div>
                        {item.title}
                      </div>
                    </NavItem>
                  ) : null
                )}
            </ul>
            {address ? (
              <div className='font-bai-jamjuree font-bold text-secondary'>
                {balance} IDWT
              </div>
            ) : null}
            <ConnectKitButton showAvatar={false} />
          </div>
        </div>
      </nav>

      <div
        className={cn('nav-mobile grid justify-center md:hidden')}
        style={{
          gridTemplateColumns: `repeat(${navList.length}, minmax(0, 1fr))`
        }}
      >
        {navList.map(({ title, icon, path, isPrivate, onClick }, idx) =>
          allowShowPrivate(isPrivate) ? (
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
              onClick={onClick}
            />
          ) : null
        )}
      </div>
    </>
  )
}

const NavItem = ({ children, path, active, onClick }) => {
  return (
    <li
      className={cn(
        'transition-default cursor-pointer text-base underline-offset-4 hover:text-primary hover:underline',
        active ? 'text-primary' : 'text-white'
      )}
      onClick={() => onClick?.()}
    >
      {path ? <Link to={path}> {children}</Link> : children}
    </li>
  )
}

const MobileNavItem = ({ icon, title, active = false, path = '', onClick }) => {
  return (
    <div
      className='col-span-1 select-none'
      onClick={() => {
        console.log(true)
        onClick?.()
      }}
    >
      {path ? (
        <Link
          to={path}
          className={cn(
            'flex cursor-pointer flex-col items-center capitalize transition duration-150 ease-in-out hover:text-secondary',
            active ? 'font-bold text-secondary' : 'font-normal text-white'
          )}
        >
          <div className='h-6 w-6'>{icon}</div>
          <p className='text-sm'>{title}</p>
        </Link>
      ) : (
        <div
          className={cn(
            'flex cursor-pointer flex-col items-center capitalize transition duration-150 ease-in-out hover:text-secondary',
            active ? 'font-bold text-secondary' : 'font-normal text-white'
          )}
        >
          <div className='h-6 w-6'>{icon}</div>
          <p className='text-sm'>{title}</p>
        </div>
      )}
    </div>
  )
}
