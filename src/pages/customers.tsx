import React, { useReducer, useContext, FunctionComponent, useEffect } from 'react'
import AppProvider from 'misc/providers'
import Router from 'next/router'
import Head from 'next/head'

import { ICustomer, IGetBapiList, ICustomerStatus } from 'misc/types'
import { useCustomerApi } from 'services/admin-api/customers'

import { VALIDATION_RESULT } from 'misc/validator'
import update from 'immutability-helper'

import styles from 'assets/css/pages/customers.module.css'
import { useStyles } from 'assets/jss/pages/globals'

import SearchIcon from '@material-ui/icons/Search'

import {
  Button,
  MenuItem,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Card,
  Paper,
  TextField,
  Select,
  CircularProgress
} from '@material-ui/core'

const DEFAULT_FILTER = 'nofilter'

interface IState {
  loading?: boolean
  cleared?: number
  data?: IGetBapiList<ICustomer>
  search?: string
  page?: number
  pageSize?: number
  status?: string
  validated?: Set<String>
  validationErr?: Set<String>
}
const Customers: FunctionComponent = () => {
  const classes = useStyles()
  const context = useContext(AppProvider)
  const { getCustomers } = useCustomerApi()

  const [state, setState] = useReducer(
    (state: IState, newState: IState) => ({ ...state, ...newState }),
    {
      loading: true,
      search: '',
      page: 0,
      pageSize: 10,
      status: DEFAULT_FILTER,
      validated: new Set<String>(),
      validationErr: new Set<String>()
    }
  )
  useEffect(() => { fetchCustomers().catch(e => context.showNotification('fetch customers failed', 'error')) }, [state.page])
  useEffect(() => { fetchCustomers().catch(e => context.showNotification('fetch customers failed', 'error')) }, [state.pageSize])
  useEffect(() => { fetchCustomers().catch(e => context.showNotification('fetch customers failed', 'error')) }, [state.cleared])

  const fetchCustomers = async (): Promise<void> => {
    setState({ loading: true })
    try {
      const variables = {
        filter: {
          search: state.search,
          status: state.status !== DEFAULT_FILTER ? state.status : undefined
        },
        page: state.page,
        pageSize: state.pageSize
      }
      const data = await getCustomers(variables)
      setState({ data: data, loading: false })
    } catch (err) {
      setState({ loading: false })
      console.error('fetch customers failed', err.message)
      context.showNotification('fetch customers failed', 'error')
    }
  }

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement>, pageIdx: number): void => {
    if (!state.loading) {
      setState({ page: pageIdx })
    }
  }
  const customers: ICustomer[] = state.data?.data ?? []
  const rowCount: number = state.data?.total ?? 0

  const handleClear = (): void => {
    setState({
      cleared: state.cleared + 1,
      search: '',
      status: DEFAULT_FILTER
    })
  }
  const handleOpen = (idx: number): void => {
    Router.push({
      pathname: `/customers/${customers[idx]._id}`
    }).catch((e: string) => console.error(e))
  }
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ pageSize: parseInt(e.target.value) })
  }

  return (
    <div>
      <Head>
        <title>Meditation | Хэрэглэгчид</title>
      </Head>
      <Card>
        <div className={styles.filter}>
          <div className={styles.filterParams}>
            <div className={styles.filterLeading}>
              <SearchIcon style={{ color: '#3f51b5' }} />
            </div>
            <TextField
              label='Хайх...'
              fullWidth
              name='search'
              value={state.search ?? ''}
              onChange={(e) => setState({search: e.target.value})}
              InputProps={{
                onKeyPress: (e) => {
                  if (e.key === 'Enter' && !state.loading) {
                    fetchCustomers().catch(e => context.showNotification('fetch customers failed', 'error'))
                  }
                }
              }}
            />
            <Select
              name='status'
              fullWidth
              label={<p>Төлөв</p>}
              value={state.status}
               onChange={(e) => setState({status: e.target.value})}
            >
              <MenuItem value={DEFAULT_FILTER}>Бүгд</MenuItem>
              <MenuItem value={ICustomerStatus.active}>Идэвхтэй</MenuItem>
              <MenuItem value={ICustomerStatus.suspended}>Идэвхгүй</MenuItem>
            </Select>
          </div>
          <div>
            <Button color='secondary' variant='outlined' className={classes.action} onClick={handleClear}>
              Цэвэрлэх
            </Button>
            <Button color='primary' variant='outlined' className={classes.action} onClick={fetchCustomers}>
              Хайх
            </Button>
          </div>
        </div>
      </Card>
      {
        state.loading === true
          ? <CircularProgress />
          : customers.length > 0
            ? (
              <Paper style={{ marginTop: '1rem' }}>
                <TableContainer>
                  <Table size='small' stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Овог</b></TableCell>
                        <TableCell><b>Нэр</b></TableCell>
                        <TableCell><b>И-Мэйл</b></TableCell>
                        <TableCell><b>Утас</b></TableCell>
                        <TableCell><b>Төлөв</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        customers.map((row: ICustomer, idx: number) => (
                          <TableRow key={row._id} hover onClick={() => handleOpen(idx)}>
                            <TableCell>{row.profile.lastName ?? '-'}</TableCell>
                            <TableCell>{row.profile.firstName ?? '-'}</TableCell>
                            <TableCell style={{ maxWidth: '200px', overflow: 'hidden' }}>{row.profile.email ?? '-'}</TableCell>
                            <TableCell>{row.profile.phone ?? '-'}</TableCell>
                            <TableCell>
                              <div className={styles.row}>
                                <span className={row.status === 'active' ? styles.active : styles.inactive} />
                                {row.status === 'active' ? 'Идэвхтэй' : 'Идэвхгүй'}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          count={rowCount}
                          onChangePage={handlePageChange}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          page={state.page} rowsPerPage={state.pageSize}
                          rowsPerPageOptions={[5, 10, 20, 50]}
                          labelRowsPerPage='Мөрийн тоо:'
                          classes={{ selectRoot: 'w-24' }}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Paper>
            ) : <div />
      }
    </div>
  )
}

export default Customers