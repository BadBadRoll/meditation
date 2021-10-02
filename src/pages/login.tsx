import React, { useReducer, useContext, FunctionComponent } from 'react'
import Link from 'next/link'

import update from 'immutability-helper'

import { VALIDATION_RESULT } from 'misc/validator'
import AppProvider from 'misc/providers'

import { Avatar, Button, Paper, Typography, Grid, CircularProgress } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import router from 'next/router'
import { TextField } from 'components/ui-components'

interface IState {
  loading?: boolean
  email?: string
  password?: string
  validated?: Set<string>
  validationErr?: Set<string>
}

const Login: FunctionComponent = () => {
  const context = useContext(AppProvider)

  const [state, setState] = useReducer(
    (state: IState, newState: IState) => ({ ...state, ...newState }),
    {
      loading: false,
      email: '',
      password: '',
      validated: new Set<string>(),
      validationErr: new Set<string>()
    }
  )
  const isNumeric = (value: string): boolean => {
    return /^-?\d+$/.test(value)
  }

  const variables = isNumeric(state.email) ? {
    phone: state.email,
    password: state.password
  } : {
    email: state.email,
    password: state.password
  }

  const handleChange = (name: string, value: string, result: VALIDATION_RESULT): void => {
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

  const handleLogin = (): void => {
    router.push('/')
  }

  return (
    <Paper>
      <Avatar>
        <LockOutlined />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Нэвтрэх
      </Typography>
      <div className='w-full mt-2'>
        <TextField
          margin='normal'
          required
          fullWidth
          label='И-Мэйл хаяг эсвэл утасны дугаар'
          name='email'
          autoFocus
          autoComplete='email'
          value={state.email}
          error={state.validationErr.has('email')}
          onValueChange={handleChange}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Нууц үг'
          type='password'
          id='password'
          autoComplete='current-password'
          value={state.password}
          error={state.validationErr.has('password')}
          onValueChange={handleChange}
          InputProps={{
            onKeyPress: (e) => {
              if (e.key === 'Enter' && !state.loading) {
                handleLogin()
              }
            }
          }}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          className='mx-2'
          onClick={handleLogin}
          disabled={state.loading}
        >
          Нэвтрэх
          {state.loading && <CircularProgress />}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href='/forgot-password'>
              Нууц үг мартсан?
            </Link>
          </Grid>
        </Grid>
      </div>
    </Paper>
  )
}

export default Login