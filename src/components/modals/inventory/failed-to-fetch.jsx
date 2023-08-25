import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from 'components/ui/alert-dialog'
import { Button } from 'components/ui/button'

export const FailedToFetch = ({ open, onClick }) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Faild To Fetch</AlertDialogTitle>
          <AlertDialogDescription>
            The new data has not been updated, please reload the page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            className='bg-red-600 hover:bg-red-600/90'
            loadingType='white'
            onClick={onClick}
          >
            Reload this page
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
