import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'

import { Button } from 'components/ui/button'

export const ConnectButtonPre = ({ children }) => {
  const { address } = useAccount()

  return !address ? (
    <ConnectKitButton.Custom>
      {({ show, isConnecting }) => (
        <Button
          className='w-full text-white'
          size='lg'
          disable={isConnecting}
          onClick={show}
        >
          {isConnecting ? 'Submit on wallet' : 'Connect wallet to order'}
        </Button>
      )}
    </ConnectKitButton.Custom>
  ) : (
    children
  )
}
