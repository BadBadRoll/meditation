import { Business, Group, ListAlt, Person } from '@mui/icons-material'
import { IMenuItem } from './types'

export const menu: IMenuItem[][] = [
  [
    {
      icon: ListAlt,
      text: 'Packing lists',
      route: '/packing-lists',
      scopes: ['*', 'package']
    },
  ],
  [
    {
      icon: Group,
      text: 'Customers',
      route: '/customers',
      scopes: ['*', 'customer']
    },
    {
      icon: Business,
      text: 'Employee',
      route: '/employee',
      scopes: ['*', 'employee']
    },
  ],
  [
    {
      icon: Person,
      text: 'My profile',
      route: '/profile',
      scopes: []
    }
  ]
]
