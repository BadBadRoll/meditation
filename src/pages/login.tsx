import React, { useReducer, FunctionComponent } from 'react'
import Link from 'next/link'

import update from 'immutability-helper'

import { VALIDATION_RESULT } from 'misc/validator'
import router from 'next/router'
import { TextField } from 'components/ui-components'
import { Avatar, Button, CircularProgress, Grid, Paper, Typography } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'

interface IState {
  loading?: boolean
  email?: string
  password?: string
  validated?: Set<string>
  validationErr?: Set<string>
}

const Login: FunctionComponent = () => {
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
          onChange={handleChange}
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
          onValueChange={handleChange}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          className='mx-2'
          onClick={async () => await router.push('/')}
          disabled={state.loading}
        >
          Нэвтрэх
          {state.loading === true && <CircularProgress />}
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
