import IWLogo from 'assets/img/iw-logo.svg'
import { cn } from 'lib/utils'

export const Logo = ({ className }) => {
  return (
    <img
      src={IWLogo}
      alt='idol-world logo'
      className={cn('w-full', className)}
    />
  )
}
