import { FunctionComponent } from 'react'
import Cancel from '@material-ui/icons/Cancel'

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  PropTypes
} from '@material-ui/core'

import Slide from '@material-ui/core/Slide'

// function SlideTransition (props) {
//   return <Slide direction='up' {...props} />
// }

interface IProp {
  open: boolean
  title?: string
  onClose: () => void
  onConfirm: () => void
  confirmText?: string
  confirmColor?: PropTypes.Color
  cancelText?: string
  cancelColor?: PropTypes.Color
  loading?: boolean
}

const ConfirmDialog: FunctionComponent<IProp> = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Slide}
      fullWidth
    >
      <DialogTitle>{props.title ?? 'Та итгэлтэй байна уу'}</DialogTitle>
      <DialogContent>
        <div>
          <div>
            {props.children}
          </div>
          <div className='p-4 mt-8 flex justify-end gap-4'>
            <Button
              color={props.cancelColor ?? 'primary'}
              onClick={props.onClose}
            >
              <Cancel className='mx-2' />
              {props.cancelText ?? 'Болих'}
            </Button>
            <Button
              variant='outlined'
              color={props.confirmColor ?? 'primary'}
              onClick={props.onConfirm}
              disabled={props.loading}
            >
              {props.confirmText ?? 'Үргэлжлүүлэх'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default ConfirmDialog
