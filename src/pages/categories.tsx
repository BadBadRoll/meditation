import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import { FunctionComponent, useEffect, useReducer } from 'react'

import instance from '@/service/axios/axiosConfig'
import { AxiosResponse } from 'axios'
import { Category } from '@/misc/types'
import { Add } from '@material-ui/icons'

interface State {
  loading?: boolean
  category?: Category[]
  open?: boolean
  fieldName?: string
  fieldDesc?: string
  addModal?: boolean
}

const Categories: FunctionComponent = () => {
  const [state, setState] = useReducer(
    (state: State, newState: State) => ({ ...state, ...newState }),
    {
      loading: false
    }
  )

  const fetchData = async (): Promise<void> => {
    setState({ loading: true })
    await instance.get('/category/list').then((res: AxiosResponse) => {
      setState({ category: res.data.data, loading: false })
    })
  }

  const handleClose = (): void => {
    setState({ open: false, fieldName: undefined, fieldDesc: undefined, addModal: false })
  }

  const handleSave = async (): Promise<void> => {
    setState({ loading: true })
    const body = {
      name: state.fieldName,
      desc: state.fieldDesc
    }
    await instance.post('/category/list', body).then((res: AxiosResponse) => {
      setState({ loading: false })
    })
  }

  useEffect(() => { fetchData().catch(e => console.error(e)) }, [])

  return (
    <div className='flex items-center w-full'>
      {!state.loading && state.category !== undefined ? (
        <div>
          <Paper className='p-4'>
            <TableContainer>
              <TableHead>
                <TableCell>Нэр</TableCell>
                <TableCell>Тайлбар</TableCell>
              </TableHead>
              <TableBody>
                {state.category.map(category => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell className='min-w-50'>{category.desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </Paper>
          <Fab onClick={() => setState({ open: true })} className='absolute bottom-10 right-10 rounded-full'><Add /></Fab>
          <Dialog open={state.open} onClose={handleClose}>
            <DialogTitle>Категори Нэмэх</DialogTitle>
            <DialogContent classes={{ root: 'gap-4 flex flex-col min-w-50' }}>
              <TextField
                label='Нэр'
                onChange={(e) => setState({ fieldName: e.target.value })}
              />
              <TextField
                label='Тайлбар'
                onChange={(e) => setState({ fieldDesc: e.target.value })}
                multiline
                rows={4}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={async () => await handleSave()} disabled={state.loading}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <CircularProgress className='absolute top-1/2 left-1/2 h-20 w-20' />
      )}
    </div>
  )
}

export default Categories
