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
