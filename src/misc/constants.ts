import { Assignment, ListAlt } from '@material-ui/icons'
import { MenuItem } from 'misc/types'

export const menu: MenuItem[][] = [
  [
    {
      icon: Assignment,
      text: 'Categories',
      route: '/categories'
    },
    {
      icon: ListAlt,
      text: 'Projects',
      route: '/projects'
    }
  ]
]

export const PHONE_REGEX = /^\d{8}$/
export const PASSWORD_PATTERN_REGEX = /^.{6,}$/
export const PHONE_VERIFY_CODE_REGEX = /^\d{6}$/
export const NAME_REGEX = /^([A-Za-zА-Яа-яЁӨҮёөү-]+)?$/
