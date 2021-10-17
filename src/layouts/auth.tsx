import { FunctionComponent } from 'react'
import theme from 'misc/mui-theme'
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core'

const AuthLayout: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs' classes={{ root: 'min-h-screen flex flex-col justify-center items-center' }}>
        <CssBaseline />
        {children}
      </Container>
    </ThemeProvider>
  )
}

export default AuthLayout
