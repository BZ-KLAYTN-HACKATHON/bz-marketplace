import { ConnectKitButton } from 'connectkit'
import { cn } from 'lib/utils'
import { Logo } from '.'

export const Nav = () => {
  return (
    <nav className='fixed left-0 top-0 z-40 flex h-[55px] w-full justify-center bg-background'>
      <div className='relative flex h-full w-full max-w-[1420px] items-center justify-between'>
        <Logo className='absolute left-0 top-0 h-[67px] w-[98px]' />

        <ul className='flex items-center gap-10 pl-[158px]'>
          <li className={cn('text-base text-white')}>Store</li>
          <li className={cn('text-base text-white')}>Marketplace</li>
          <li className={cn('text-base text-white')}>Events</li>
        </ul>

        <ConnectKitButton showBalance={true} showAvatar={false} />
      </div>
    </nav>
  )
}
