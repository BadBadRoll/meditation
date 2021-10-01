import React, { FunctionComponent, useState, useEffect } from 'react'
import cn from 'classnames'
import jwt from 'jsonwebtoken'
import Link from 'next/link'

import {
  Tooltip,
  Zoom,
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  CircularProgress
} from '@mui/material'

import { useStyles } from 'assets/jss/layouts/admin'

// import ConfirmDialog from 'components/ui-components/Dialogs/ConfirmDialog'

import { Menu, ChevronLeft, ExitToApp } from '@mui/icons-material';

import Router from 'next/router'
import { IMenuItem } from 'misc/types'
import { removeState } from 'misc/localStorage'
import { menu } from 'misc/constants'
import { isNil } from 'lodash'
import { ThemeProvider } from '@mui/styles'
import theme from 'misc/mui-theme'

interface IProp{
  token: string
}
interface StateMenu extends IMenuItem {
  badgeContent?: number
}

const AdminLayout: FunctionComponent<IProp> = (props) => {
  const classes = useStyles()
  const { token } = props
  const [open, setOpen] = useState(true)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [appBarTitle, setAppBarTitle] = useState('Dashboard')
  const [stateMenu, setStateMenu] = useState<StateMenu[][]>(menu)
  const [loading, setLoading] = useState(true)
  const handleDrawerOpen = (): void => {
    setOpen(true)
  }
  const handleDrawerClose = (): void => {
    setOpen(false)
  }
  // const fixedHeightPaper = cn(classes.paper, classes.fixedHeight)

  const tokenPayload: any = jwt.decode(token)
  const employeeScopes: string[] = tokenPayload.scopes

  useEffect(() => {
    setAppBarTitle(formatRoute(Router.route))
  }, [menu])


  const formatRoute = (route: string): string => {
    const title = route.split('/')[1]
    const capitalized = title !== '' ? title.charAt(0).toUpperCase() + title.slice(1) : 'My tasks'
    return (capitalized)
  }
  const handleLogout = (): void => {
    removeState('token')
    location.reload()
  }

  if (loading) {
    return <CircularProgress />
  }

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='absolute' className={cn(classes.appBar, { [classes.appBarShift]: open })}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={cn(classes.menuButton, { [classes.menuButtonHidden]: open })}
          >
            <Menu />
          </IconButton>
          <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
            {appBarTitle}
          </Typography>
          <Tooltip title='Гарах' placement='right' TransitionComponent={Zoom}>
            <IconButton color='inherit' onClick={() => { setConfirmOpen(true) }}>
              <ExitToApp />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        classes={{
          paper: cn(classes.drawerPaper, { [classes.drawerPaperClose]: !open })
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        {stateMenu.map((list: StateMenu[], idx: number) => (
          <div key={idx}>
            <List>
              {list.map((menuItem: StateMenu, i: number) => {
                const { icon: ItemIcon, text, route, scopes } = menuItem
                if (scopes.length === 0) {
                  return (
                    <Link key={idx.toString() + i.toString()} href={route} passHref>
                      <ListItem component='a' button onClick={() => { setAppBarTitle(formatRoute(route)) }}>
                        <ListItemIcon>
                            <ItemIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    </Link>
                  )
                } else if (employeeScopes.some(e => scopes.includes(e))) {
                  return (
                    <Link key={idx.toString() + i.toString()} href={route} passHref>
                      <ListItem component='a' button onClick={() => { setAppBarTitle(formatRoute(route)) }}>
                        <ListItemIcon>
                                <ItemIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    </Link>
                  )
                }
              })}
            </List>
            {idx !== 2 && <Divider />}
          </div>
        ))}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false} className={classes.container}>
          {props.children}
        </Container>
        {/* <ConfirmDialog
          open={confirmOpen}
          onClose={() => { setConfirmOpen(false) }}
          onConfirm={handleLogout}
          confirmText='Зөвшөөрөх'
        >
          Та вебсайтаас гарах гэж байна.
        </ConfirmDialog> */}
      </main>
    </div>
    </ThemeProvider>
  )
}

export default AdminLayout
