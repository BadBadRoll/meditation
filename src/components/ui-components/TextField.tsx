import React, { FunctionComponent } from 'react'

import { validate, VALIDATION_RESULT, IValidationProps } from 'misc/validator'

import {
  TextField,
  TextFieldProps
} from '@mui/material'

type ITextFieldProps = TextFieldProps & {
  allowEmpty?: boolean
  notEmpty?: boolean
  maxLength?: number
  minLength?: number
  length?: number
  regex?: RegExp
  phone?: boolean
  phoneInternational?: boolean
  email?: boolean
  url?: boolean
  number?: boolean
  numeric?: boolean
  maxValue?: number
  minValue?: number
  /** not implemented */
  inValue?: any
  equalTo?: any
  notEqualTo?: any
  money?: boolean
  success?: boolean
  onValueChange: (name: string, value: string, result: VALIDATION_RESULT) => void
}

const ValidTextField: FunctionComponent<ITextFieldProps> = ({ onValueChange, success, allowEmpty, notEmpty, maxLength, minLength, length, regex, phone, phoneInternational, email, url, number, numeric, maxValue, minValue, inValue, equalTo, notEqualTo, money, ...props }) => {
  const validationProps: IValidationProps = { allowEmpty, notEmpty, maxLength, minLength, length, regex, phone, phoneInternational, email, url, number, numeric, maxValue, minValue, inValue, equalTo, notEqualTo, money }
  function onChange (event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target
    const result = validate(validationProps, value)
    if (result !== VALIDATION_RESULT.UNACCEPTED) {
      onValueChange(name, value, result)
    }
  }
  return (
    <TextField
      onChange={onChange}
      {...props}
    />
  )
}

export default ValidTextField