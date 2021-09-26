import { SvgIconProps } from '@mui/material'

export interface IJwt {
  token: string
  firstName: string
  lastName: string
}
export interface IAuthToken {
  userId: string
  email?: string
  phone?: string
  type: string
  iss: string
  iat: number
  exp: number
  [key: string]: any
}
export interface IMenuItem {
  icon: (props: SvgIconProps) => JSX.Element
  text: string
  route: string
  scopes: string[]
}