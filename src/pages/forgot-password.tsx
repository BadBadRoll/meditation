import React, { useReducer, FunctionComponent } from 'react'
import Link from 'next/link'

import { TextField } from 'components/ui-components'

import ResetPassword from 'components/page-components/ResetPasswordPhone'
import { Avatar, Button, CircularProgress, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'

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

  const handleSelect = (event: any): void => {
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
            onChange={(e: any) => setState({ email: e.target.value })}
          />
          <Typography variant='subtitle2' color='textSecondary'>
            Та бүртгүүлсэн И-Мэйл хаягаа оруулна уу. Нууц үг сэргээх зааврыг таны И-Мэйл хаяг руу илгээх болно
          </Typography>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            disabled={state.emailRequested}
          >
            Үргэлжлүүлэх
            {state.emailRequested === true && <CircularProgress />}
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
            onChange={(e: any) => setState({ phone: e.target.value })}
          />
          <Typography variant='subtitle2' color='textSecondary'>
            Та бүртгүүлсэн утасны дугаараа оруулна уу. Нууц үг сэргээх кодыг таны утсанд мессежээр илгээх болно.
          </Typography>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            disabled={state.phoneRequested === true}
          >
            Үргэлжлүүлэх
            {state.phoneRequested === true && <CircularProgress />}
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
        state.isDone === true ? <></> : (
          <FormControl>
            <RadioGroup value={state.method} onChange={handleSelect}>
              <FormControlLabel value='email' control={<Radio />} label='Э-мэйлээр сэргээх' />
              <FormControlLabel value='phone' control={<Radio />} label='Утсаар сэргээх' />
            </RadioGroup>
          </FormControl>
        )
      }
      {
        (state.isDone !== true)
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
            ) : <ResetPassword phone={String(state.phone)} />
          )
      }
    </Paper>
  )
}

export default ForgotPasswordPage
