import React, { useReducer, useContext, FunctionComponent } from 'react'
import Link from 'next/link'

import update from 'immutability-helper'

import { TextField } from 'components/ui-components'

import { VALIDATION_RESULT } from 'misc/validator'
import AppProvider from 'misc/providers'

import ResetPassword from 'components/page-components/ResetPasswordPhone'
import { Avatar, Button, CircularProgress, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'

interface IState {
  emailRequested?: boolean
  phoneRequested?: boolean
  method?: string
  email?: string
  phone?: string
  isDone?: boolean
  validated?: Set<string>
  validationErr?: Set<string>
}

const ForgotPasswordPage: FunctionComponent = () => {
  const context = useContext(AppProvider)

  const [state, setState] = useReducer(
    (state: IState, newState: IState) => ({ ...state, ...newState }),
    {
      emailRequested: false,
      phoneRequested: false,
      isDone: false,
      method: 'email',
      email: '',
      phone: '',
      validated: new Set<string>(),
      validationErr: new Set<string>()
    }
  )

  const emailReset = async (): Promise<void> => {
    setState({ emailRequested: true })
    try {
      await console.log('emailReset')
      setState({ isDone: true, emailRequested: false })
    } catch (err) {
      setState({ emailRequested: false })
      context.showNotification(err.message, 'error')
    }
  }

  const phoneReset = async (): Promise<void> => {
    setState({ phoneRequested: true })
    try {
      await console.log('phoneReset')
      setState({ isDone: true, phoneRequested: false })
    } catch (err) {
      setState({ phoneRequested: false })
      context.showNotification(err.message, 'error')
    }
  }

  const handleChange = (name: string, value: string, result: VALIDATION_RESULT): void => {
    if (state.emailRequested) {
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
    setState({ [name]: value, validationErr, validated })
  }

  const handleContinue = (): void => {
    if (state.emailRequested || state.phoneRequested) {
      return
    }
    let { validated, validationErr } = state

    if (state.method === 'email') {
      if (!validated.has('email')) {
        validationErr = update(validationErr, { $add: ['email'] })
      }

      if (validationErr.size > 0) {
        setState({ validationErr })
        return
      }
      console.log('email Reset')
    } else {
      if (!validated.has('phone')) {
        validationErr = update(validationErr, { $add: ['phone'] })
      }

      if (validationErr.size > 0) {
        setState({ validationErr })
        return
      }

           console.log('phone Reset')
    }
  }
  const handleSelect = (event): void => {
    setState({ method: event.target.value })
  }

  const Input: FunctionComponent = () => {
    if (state.method === 'email') {
      return (
        <div>
          <TextField
            margin='normal'
            required
            fullWidth
            label='И-Мэйл хаяг'
            name='email'
            autoFocus
            autoComplete='email'
            value={state.email}
            notEmpty
            success={state.validated.has('email')}
            error={state.validationErr.has('email')}
            onValueChange={handleChange}
            InputProps={{
              onKeyPress: (e) => {
                if (e.key === 'Enter' && !state.emailRequested) {
                  handleContinue()
                }
              }
            }}
          />
          <Typography variant='subtitle2' color='textSecondary'>
            Та бүртгүүлсэн И-Мэйл хаягаа оруулна уу. Нууц үг сэргээх зааврыг таны И-Мэйл хаяг руу илгээх болно
          </Typography>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={handleContinue}
            disabled={state.emailRequested}
          >
            Үргэлжлүүлэх
            {state.emailRequested && <CircularProgress />}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/login'>
                Нэвтрэх
              </Link>
            </Grid>
          </Grid>
        </div>
      )
    } else {
      return (
        <div>
          <TextField
            margin='normal'
            required
            fullWidth
            label='Утасны дугаар'
            name='phone'
            autoFocus
            autoComplete='phone'
            value={state.phone}
            notEmpty
            success={state.validated.has('phone')}
            error={state.validationErr.has('phone')}
            onValueChange={handleChange}
            InputProps={{
              onKeyPress: (e) => {
                if (e.key === 'Enter' && !state.phoneRequested) {
                  handleContinue()
                }
              }
            }}
          />
          <Typography variant='subtitle2' color='textSecondary'>
            Та бүртгүүлсэн утасны дугаараа оруулна уу. Нууц үг сэргээх кодыг таны утсанд мессежээр илгээх болно.
          </Typography>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={handleContinue}
            disabled={state.phoneRequested}
          >
            Үргэлжлүүлэх
            {state.phoneRequested && <CircularProgress />}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/login'>
                Нэвтрэх
              </Link>
            </Grid>
          </Grid>
        </div>
      )
    }
  }

  return (
    <Paper>
      <Avatar>
        <LockOutlined />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Нууц үгээ мартсан
      </Typography>
      {
        state.isDone ? <></> : (
          <FormControl>
            <RadioGroup value={state.method} onChange={handleSelect}>
              <FormControlLabel value='email' control={<Radio />} label='Э-мэйлээр сэргээх' />
              <FormControlLabel value='phone' control={<Radio />} label='Утсаар сэргээх' />
            </RadioGroup>
          </FormControl>
        )
      }
      {
        (!state.isDone)
          ? <Input />
          : (
            state.method === 'email' ? (
              <div>
                <Typography variant='subtitle2' paragraph color='textSecondary' style={{ marginTop: 10 }}>
                  Нууц үг сэргээх зааврыг таны И-Мэйл хаяг руу илгээлээ. И-Мэйл хаягаа шалгана уу
                </Typography>
                <Grid container>
                  <Grid item xs>
                    <Link href='/login'>
                      Нэвтрэх
                    </Link>
                  </Grid>
                </Grid>
              </div>
            ) : <ResetPassword phone={state.phone} />
          )
      }
    </Paper>
  )
}

export default ForgotPasswordPage