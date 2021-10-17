import { Assignment, Group, ListAlt, NotificationImportant, Person } from '@material-ui/icons'
import { MenuItem } from 'misc/types'

export const menu: MenuItem[][] = [
  [
    {
      icon: Assignment,
      text: 'Task Maker',
      route: '/tasks'
    }
  ],
  [
    {
      icon: ListAlt,
      text: 'Task List',
      route: '/task-list'
    },
    {
      icon: Group,
      text: 'Customers',
      route: '/customers'
    },
    {
      icon: NotificationImportant,
      text: 'User Feedback',
      route: '/feedbacks'
    }
  ],
  [
    {
      icon: Person,
      text: 'My profile',
      route: '/profile'
    }
  ]
]

export const PHONE_REGEX = /^\d{8}$/
export const PASSWORD_PATTERN_REGEX = /^.{6,}$/
export const PHONE_VERIFY_CODE_REGEX = /^\d{6}$/
export const NAME_REGEX = /^([A-Za-zА-Яа-яЁӨҮёөү-]+)?$/
