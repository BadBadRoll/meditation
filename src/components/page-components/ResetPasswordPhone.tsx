import { FunctionComponent, useReducer, useContext } from 'react'
import AppProvider from 'misc/providers'

import ReactCodeInput from 'react-verification-code-input'
import { VALIDATION_RESULT } from 'misc/validator'
import update from 'immutability-helper'
import { useRouter } from 'next/router'

import { TextField } from 'components/ui-components'
import { Button, CircularProgress, Typography } from '@mui/material'

interface IProp{
  phone: string
}
interface IState {
  loading?: boolean
  validationCode?: string
  password?: string
  passwordConfirm?: string
  validated?: Set<string>
  validationErr?: Set<string>
}

const ResetPassword: FunctionComponent<IProp> = (props) => {
  const context = useContext(AppProvider)
  const router = useRouter()

  const [state, setState] = useReducer(
    (state: IState, newState: IState) => ({ ...state, ...newState }),
    {
      loading: false,
      validationCode: '',
      password: '',
      passwordConfirm: '',
      validated: new Set<string>(),
      validationErr: new Set<string>()
    }
  )

  const setPasswordHandler = async (): Promise<void> => {
    setState({ loading: true })
    try {
      await console.log('ResetPassword')
      setState({ loading: false })
      context.showNotification('Амжилттай', 'info')
      setTimeout(() => {
        router.push('/login').catch(e => console.error(e))
      }, 3000)
    } catch (err) {
      setState({ loading: false })
      context.showNotification(err.message, 'error')
    }
  }

  const handleSetPassword = (): void => {
    if (state.loading) {
      return
    }
    let { validated, validationErr, validationCode } = state

    if (!validated.has('password')) {
      validationErr = update(validationErr, { $add: ['password'] })
    }
    if (!validated.has('passwordConfirm')) {
      validationErr = update(validationErr, { $add: ['passwordConfirm'] })
    }

    if (validationErr.size > 0) {
      setState({ validationErr })
      return
    }
    if (validationCode.length !== 6) {
      context.showNotification('Баталгаажуулах код оруулна уу.', 'error')
      return
    }

    setPasswordHandler().catch(e => {
      console.error(e)
      context.showNotification('set password failed', 'error')
    })
  }

  const handleCode = (value: string): void => {
    setState({ validationCode: value })
  }

  const handleChange = (name: string, value: string, result: VALIDATION_RESULT): void => {
    if (state.loading) {
      return
    }

    let { validated, validationErr } = state
    if (result === VALIDATION_RESULT.VALID) {
      validated = update(validated, { $add: [name] })
      validationErr = update(validationErr, { $remove: [name] })
    } else if (result === VALIDATION_RESULT.INVALID) {
      validated = update(validated, { $remove: [name] })
      validationErr = update(validationErr, { $add: [name] })
    } else if (result === VALIDATION_RESULT.EMPTY) {
      validated = update(validated, { $remove: [name] })
      validationErr = update(validationErr, { $remove: [name] })
    }

    if (name === 'password') {
      validated = update(validated, { $remove: ['passwordConfirm'] })
      validationErr = update(validationErr, { $add: ['passwordConfirm'] })
    } else if (name === 'passwordConfirm') {
      if (value === state.password) {
        validated = update(validated, { $add: ['passwordConfirm'] })
        validationErr = update(validationErr, { $remove: ['passwordConfirm'] })
      } else {
        validated = update(validated, { $remove: ['passwordConfirm'] })
        validationErr = update(validationErr, { $add: ['passwordConfirm'] })
      }
    }

    setState({ [name]: value, validationErr, validated })
  }

  return (
    <div>
      <Typography variant='subtitle2' color='textSecondary'>
        Та мессежээр ирсэн 6 оронтой кодыг оруулна уу.
      </Typography>
      <ReactCodeInput
        type='number'
        fields={6}
        autoFocus
        onChange={handleCode}
      />
      <div>
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Нууц үг'
          type='password'
          id='password'
          regex={/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/}
          helperText={state.validationErr.has('password') ? 'Дор хаяж 8 урттай, том жижиг үсэг мөн тоо эсвэл тусгай тэмдэгт агуулсан' : undefined}
          value={state.password}
          notEmpty
          success={state.validated.has('password')}
          error={state.validationErr.has('password')}
          onValueChange={handleChange}
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
          notEmpty
          success={state.validated.has('passwordConfirm')}
          error={state.validationErr.has('passwordConfirm')}
          onValueChange={handleChange}
          InputProps={{
            onKeyPress: (e) => {
              if (e.key === 'Enter' && !state.loading) {
                handleSetPassword()
              }
            }
          }}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleSetPassword}
          disabled={state.loading}
        >
          Үргэлжлүүлэх
          {state.loading && <CircularProgress />}
        </Button>
      </div>

    </div>
  )
}

export default ResetPassword