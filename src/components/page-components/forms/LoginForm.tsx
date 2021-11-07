import { FunctionComponent } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { Button, CircularProgress, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { PHONE_REGEX } from '@/misc/constants'
import { emailValidator, requiredValidator } from '@/misc/validator'

export interface LoginFields {
  identifier: string
  password: string
}

interface Props {
  className?: string
  loading: boolean
  onLogin: (fields: LoginFields) => void
}

const LoginForm: FunctionComponent<Props> = ({ className, loading, onLogin }) => {
  const formik = useFormik<LoginFields>({
    initialValues: {
      identifier: '',
      password: ''
    },
    validate: (values) => {
      const errors: Partial<LoginFields> = {}
      if (!requiredValidator.isValidSync(values.identifier)) {
        errors.identifier = 'И-Мэйл хаяг эсвэл Утасны дугаараа оруулна уу'
      } else if (values.identifier.includes('@')) { // email
        if (!emailValidator.isValidSync(values.identifier)) {
          errors.identifier = 'И-Мэйл хаяг эсвэл Утасны дугаарын формат буруу байна'
        }
      } else { // phone
        if (!PHONE_REGEX.test(values.identifier)) {
          errors.identifier = 'И-Мэйл хаяг эсвэл Утасны дугаарын формат буруу байна'
        }
      }
      return errors
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required('Нууц үг оруулна уу')
    }),
    onSubmit: onLogin
  })

  return (
    <form className={cn(className, 'w-full')} onSubmit={formik.handleSubmit}>
      <span className='flex justify-center text-2xl'>Нэвтрэх</span>
      <div className='flex flex-col items-center my-4 gap-8 w-96 px-6'>
        <TextField
          fullWidth
          id='identifier'
          name='identifier'
          label='И-Мэйл хаяг эсвэл Утасны дугаар'
          value={formik.values.identifier}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.identifier === true && formik.errors.identifier !== undefined}
          helperText={formik.touched.identifier === true ? formik.errors.identifier : undefined}
        />
        <TextField
          fullWidth
          id='password'
          name='password'
          type='password'
          label='Нууц үг'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password === true && formik.errors.password !== undefined}
          helperText={formik.touched.password === true ? formik.errors.password : undefined}
        />
        <Button disabled={loading} type='submit' className='w-full text-white hover:bg-white hover:bg-opacity-30 hover:text-primary'>
          Нэвтрэх
          {loading && <CircularProgress color='inherit' size='0.875rem' className='ml-1' />}
        </Button>
        <div className='justify-end flex w-full'>
          <Link href='/register'>
            <Button variant='text'>
              Бүртгүүлэх үү?
            </Button>
          </Link>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
