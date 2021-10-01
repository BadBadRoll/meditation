import { FunctionComponent } from 'react'
import { Container, CssBaseline } from '@mui/material'

const AuthLayout: FunctionComponent = ({ children }) => {
  return (
    <Container component='main' maxWidth='xs' classes={{ root: 'min-h-screen flex flex-col justify-center items-center' }}>
      <CssBaseline />
      {children}
    </Container>
  )
}

export default AuthLayout