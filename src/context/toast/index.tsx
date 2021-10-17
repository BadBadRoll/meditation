import { FunctionComponent, useContext, createContext, useState } from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert, Color } from '@material-ui/lab'
import { ToastContext, ToastMessage } from './types'

const toastContext = createContext<ToastContext>({
  showInfo: async () => {
    throw new Error('showInfo not implemented')
  },
  showSuccess: async () => {
    throw new Error('showSuccess not implemented')
  },
  showWarn: async () => {
    throw new Error('showWarn not implemented')
  },
  showError: async () => {
    throw new Error('showError not implemented')
  }
})

export const ToastProvider: FunctionComponent = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage>({ open: false })

  const showToast = (message: string, severity: Color): void => {
    setToast({
      open: true,
      message,
      severity
    })
  }

  const hideToast = (): void => {
    setToast({
      ...toast,
      open: false
    })
  }
  return (
    <toastContext.Provider
      value={{
        showInfo: async (message) => showToast(message, 'info'),
        showSuccess: async (message) => showToast(message, 'success'),
        showWarn: async (message) => showToast(message, 'warning'),
        showError: async (message) => showToast(message, 'error')
      }}
    >
      {children}
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={hideToast} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <Alert onClose={hideToast} severity={toast.severity} variant='filled'>
          {toast.message}
        </Alert>
      </Snackbar>
    </toastContext.Provider>
  )
}

export const useToast = (): ToastContext => {
  return useContext(toastContext)
}