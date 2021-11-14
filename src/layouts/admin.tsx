import React, { FunctionComponent, useState, useEffect } from 'react'
import cn from 'classnames'
import Link from 'next/link'

import {
  Tooltip,
  Zoom,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'

import ConfirmDialog from 'components/ui-components/Dialogs/ConfirmDialog'
import MenuIcon from '@material-ui/icons/Menu'
// import NotificationsIcon from '@material-ui/icons/Notifications'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { useStyles } from 'assets/jss/admin'
import Router from 'next/router'
import { MenuItem } from 'misc/types'
import { menu } from 'misc/constants'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '@/misc/mui-theme'
import { ChevronRight } from '@material-ui/icons'
import { removeState } from '@/misc/localStorage'

interface StateMenu extends MenuItem {
  badgeContent?: number
}

const AdminLayout: FunctionComponent<{ token: string }> = ({ children, token }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [appBarTitle, setAppBarTitle] = useState('Dashboard')
  const handleDrawerOpen = (): void => {
    setOpen(true)
  }
  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  // const fixedHeightPaper = cn(classes.paper, classes.fixedHeight)

  useEffect(() => {
    setAppBarTitle(formatRoute(Router.route))
  }, [menu])

  const formatRoute = (route: string): string => {
    const title = route.split('/')[1]
    const capitalized = title !== '' ? title.charAt(0).toUpperCase() + title.slice(1) : 'Task Management'
    return (capitalized)
  }
  const handleLogout = (): void => {
    removeState('token')
    location.reload()
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={cn(classes.root)}>
        <CssBaseline />
        <AppBar className={cn(classes.appBar, { [classes.appBarShift]: open }, 'border-0 shadow-xl ')}>
          <Toolbar className={classes.toolbar} classes={{ root: '' }}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              className={cn(classes.menuButton, { [classes.menuButtonHidden]: open })}
            >
              <MenuIcon />
            </IconButton>
            <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
              {appBarTitle}
            </Typography>
            <Tooltip title='Гарах' placement='right' TransitionComponent={Zoom}>
              <IconButton color='inherit' onClick={() => { setConfirmOpen(true) }}>
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          classes={{
            paper: cn(classes.drawerPaper, { [classes.drawerPaperClose]: !open }, 'border-0')
          }}
          open={open}
        >
          <div className={cn(classes.toolbarIcon, 'justify-end')}>
            {open && <ChevronRight className='mx-4 text-3xl cursor-pointer' onClick={handleDrawerClose} />}
          </div>
          <Divider />
          {menu.map((list: StateMenu[], idx: number) => (
            <div key={idx}>
              <List>
                {list.map((menuItem: StateMenu, i: number) => {
                  const { icon: ItemIcon, text, route } = menuItem
                  return (
                    <Link key={idx.toString() + i.toString()} href={route} passHref>
                      <ListItem component='a' button onClick={() => { setAppBarTitle(formatRoute(route)) }} className='gap-2'>
                        <ListItemIcon>
                          <ItemIcon className='text-3xl ml-2' />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    </Link>
                  )
                })}
              </List>
              {idx !== 2 && <Divider />}
            </div>
          ))}
        </Drawer>
        <main className={cn(classes.content)}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth={false} className={cn(classes.container)}>
            {children}
          </Container>
          <ConfirmDialog
            open={confirmOpen}
            onClose={() => { setConfirmOpen(false) }}
            onConfirm={handleLogout}
            confirmText='Зөвшөөрөх'
          >
            Та вебсайтаас гарах гэж байна.
          </ConfirmDialog>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default AdminLayout
