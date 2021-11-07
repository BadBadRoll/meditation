import { FunctionComponent } from 'react'
import theme from 'misc/mui-theme'
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core'

const AuthLayout: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' classes={{ root: 'min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-400 via-blue-200 to-white w-screen max-w-full' }}>
        <CssBaseline />
        {children}
      </Container>
    </ThemeProvider>
  )
}

export default AuthLayout
