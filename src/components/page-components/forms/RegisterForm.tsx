import { FunctionComponent } from 'react'
import cn from 'classnames'
import { Button, CircularProgress, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'

import { PHONE_REGEX, PASSWORD_PATTERN_REGEX } from '@/misc/constants'
import { emailValidator, requiredValidator } from '@/misc/validator'

export interface RegisterFields {
  identifier: string
  password: string
}

interface RegisterFormFields extends RegisterFields {
  confirmPassword: string
  acceptTerms: boolean
}

interface Props {
  className?: string
  loading: boolean
  onRegister: (fields: RegisterFields) => void
}

const RegisterForm: FunctionComponent<Props> = ({ className, loading, onRegister }) => {
  const formik = useFormik<RegisterFormFields>({
    initialValues: {
      identifier: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    },
    validate: (values) => {
      const errors: Partial<RegisterFormFields> = {}
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
        .min(6, 'Нууц үг багадаа 6 тэмдэгттэй байх ёстой')
        .matches(PASSWORD_PATTERN_REGEX, 'Нууц үг том, жижиг үсэг, тоо агуулсан байх ёстой'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Нууц үг таарахгүй байна')
        .required('Нууц үгээ давтан оруулна уу'),
      acceptTerms: Yup.bool()
        .oneOf([true], 'Үйлчилгээний нөхцөл, журмыг зөвшөөрөх шаардлагатай')
    }),
    onSubmit: onRegister
  })

  return (
    <form className={cn(className, 'w-full')} onSubmit={formik.handleSubmit}>
      <span className='flex justify-center text-2xl'>Бүртгүүлэх</span>
      <div className='flex flex-col items-center my-4 w-96 gap-8 px-6'>
        <TextField
          FormHelperTextProps={{ classes: { root: 'h-auto md:-bottom-4 -bottom-10 text-xs' } }}
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
        <TextField
          fullWidth
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          label='Нууц үгээ баталгаажуулна уу'
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword === true && formik.errors.confirmPassword !== undefined}
          helperText={formik.touched.confirmPassword === true ? formik.errors.confirmPassword : undefined}
        />
        <div className='w-full flex justify-center h-10'>
          <Button disabled={loading} type='submit' className='w-full text-white hover:bg-white hover:bg-opacity-30 hover:text-primary'>
            Бүртгүүлэх
            {loading && <CircularProgress color='inherit' size='0.875rem' className='ml-1' />}
          </Button>
        </div>
        <div className='justify-end flex w-full'>
          <Link href='/login'>
            <Button variant='text'>
              Нэвтрэх хэсэгрүү буцах
            </Button>
          </Link>
        </div>
      </div>
    </form>
  )
}

export default RegisterForm
