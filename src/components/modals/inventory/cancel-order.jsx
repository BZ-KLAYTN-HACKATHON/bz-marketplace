import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from 'components/ui/alert-dialog'
import { Button } from 'components/ui/button'

export const CancelOrder = ({ open, loading, disabled, exit, onSubmit }) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Order</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel the sale order for this NFT?
            <br />
            By doing so, the NFT will be removed from the marketplace, and the
            listing will no longer be available for potential buyers. If you
            change your mind, you'll need to relist the NFT for sale. Please
            confirm your decision to proceed with the cancellation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={exit}>Close</AlertDialogCancel>
          <Button
            className='bg-red-600 hover:bg-red-600/90'
            loading={loading}
            loadingType='white'
            disabled={disabled}
            onClick={onSubmit}
          >
            Sure and cancel this order
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
