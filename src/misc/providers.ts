import React from 'react'
import { Color as AlertColor } from '@material-ui/lab/Alert'
import { IJwt } from './types'

interface IAppProvider {
  token: string | null
  handleError?: (error: Error) => void
  handleLogin?: (res: IJwt) => void
  showNotification?: (text: string, color: AlertColor) => void
}

export default React.createContext<IAppProvider>({
  token: null,
  showNotification: (text, color: AlertColor) => {
    console.log('showNotification not implemented', text)
  },
  handleError: (error) => {
    console.error(error)
  },
  handleLogin: (res) => {
    console.log('handleLogin not implemented', res)
  }
})

export const DataProvider = React.createContext({

})
