import { FunctionComponent } from 'react'
import theme from 'misc/mui-theme'
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core'

const AuthLayout: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' classes={{ root: 'min-h-screen flex flex-col justify-center items-start w-screen max-w-full px-0' }}>
        <CssBaseline />
        {children}
      </Container>
    </ThemeProvider>
  )
}

export default AuthLayout
