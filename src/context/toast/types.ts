import { Color } from '@material-ui/lab'

export interface ToastContext {
  showInfo: (message: string) => void
  showSuccess: (message: string) => void
  showWarn: (message: string) => void
  showError: (message: string) => void
}

export interface ToastMessage {
  open: boolean
  message?: string
  severity?: Color
}