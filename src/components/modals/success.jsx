import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from 'components/ui/dialog'

export const SuccessModal = ({ open, exit, title, children, action }) => {
  return (
    <Dialog open={open}>
      <DialogContent exit={exit}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className=''>{children}</div>
        <DialogFooter>{action}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
