import { FunctionComponent, useReducer } from 'react'

import ReactCodeInput from 'react-verification-code-input'

import { Typography, Button, TextField, CircularProgress } from '@material-ui/core'

interface IProp {
  phone: string
}
interface IState {
  loading?: boolean
  validationCode?: string
  password?: string
  passwordConfirm?: string
}

const ResetPassword: FunctionComponent<IProp> = (props) => {
  const [state, setState] = useReducer(
    (state: IState, newState: IState) => ({ ...state, ...newState }),
    {
      loading: false,
      validationCode: '',
      password: '',
      passwordConfirm: ''
    }
  )

  return (
    <div className='w-full mt-2s'>
      <Typography variant='subtitle2' color='textSecondary'>
        Та мессежээр ирсэн 6 оронтой кодыг оруулна уу.
      </Typography>
      <ReactCodeInput
        type='number'
        fields={6}
        autoFocus
        onChange={(value) => setState({ validationCode: value })}
      />
      <div className='w-full mt-2s'>
        <TextField
          margin='normal'
          fullWidth
          name='password'
          label='Нууц үг'
          type='password'
          id='password'
          value={state.password}
          onChange={(e) => setState({ password: e.target.value })}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='passwordConfirm'
          label='Нууц үг давтах'
          type='password'
          id='passwordConfirm'
          value={state.passwordConfirm}
          onChange={(e) => setState({ passwordConfirm: e.target.value })}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          className='mx-2'
          disabled={state.loading === true}
        >
          Үргэлжлүүлэх
          {state.loading === true && <CircularProgress />}
        </Button>
      </div>

    </div>
  )
}

export default ResetPassword
