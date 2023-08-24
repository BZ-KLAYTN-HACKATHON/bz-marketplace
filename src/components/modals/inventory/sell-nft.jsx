import { Label } from '@radix-ui/react-dropdown-menu'
import { Button } from 'components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from 'components/ui/dialog'
import { Input } from 'components/ui/input'
import { useInput } from 'hooks'

export const SellNFT = ({
  open,
  initValue,
  exit,
  loading,
  disabled,
  onSubmit
}) => {
  const { value, bind } = useInput(initValue)
  
  return (
    <Dialog open={open}>
      <DialogContent exit={exit}>
        <DialogHeader>
          <DialogTitle>{initValue ? 'Update' : 'Sell'} NFT</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='space-y-2'>
          {initValue ? (
            <div className='space-y-1'>
              <Label htmlFor='price' className='text-left'>
                Current Price
              </Label>
              <Input
                id='price'
                type='number'
                disabled
                placeholder='Enter price'
                value={initValue}
                onChange={() => {}}
              />
            </div>
          ) : null}

          <div className='space-y-1'>
            <Label htmlFor='price' className='text-left'>
              {initValue ? 'New' : ''} Price
            </Label>
            <Input
              id='price'
              type='number'
              placeholder='Enter price'
              {...bind}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            loading={loading}
            disabled={
              disabled ||
              Number(value) <= 0 ||
              (initValue ? initValue === value : false)
            }
            type='submit'
            onClick={() => onSubmit(value)}
          >
            Submit and {initValue ? 'update' : 'sell'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
