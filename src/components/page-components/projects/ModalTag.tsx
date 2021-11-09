import { ProjectSection } from '@/misc/types'
import instance from '@/service/axios/axiosConfig'
import { Dialog, DialogContent, DialogTitle, DialogContentText, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, CircularProgress, Button, DialogActions, TextField } from '@material-ui/core'
import { Close, LabelOff } from '@material-ui/icons'
import { AxiosResponse } from 'axios'
import { FunctionComponent, useReducer } from 'react'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  data?: ProjectSection
  fetchData: (e: any) => void
}

interface State {
  timeStamp?: string
  text?: string
  addTagModal?: boolean
  loading?: boolean
}

const TagModal: FunctionComponent<Props> = ({ onClose, isOpen, data, fetchData }) => {
  const [state, setState] = useReducer((state: State, newState: State) => ({ ...state, ...newState }), {
    addTagModal: false,
    loading: false
  })

  const handleAddTag = async (): Promise<void> => {
    setState({ loading: true })
    const body = {
      timeStamp: state.timeStamp,
      text: state.text,
      sectionId: data._id
    }
    instance.post('/sections/addTag', body).then((res: AxiosResponse) => (
      fetchData({ tagSection: res.data.data })
    )).catch(err => console.log(err))
    setState({ loading: false, addTagModal: false })
  }

  return (
    <Dialog open={isOpen} onClose={onClose} classes={{ paper: 'pb-6 min-w-50' }}>
      {data !== undefined ? (
        <div className='mx-6 relative'>
          <DialogTitle>{data.name}</DialogTitle>
          <Close className='absolute right-0 cursor-pointer top-4' onClick={onClose} />
          <div className='flex justify-end my-4'>
            <Button variant='outlined' onClick={() => setState({ addTagModal: true })}>Add Tags</Button>
          </div>
          <DialogContent>
            <DialogContentText>
              {data.desc}
            </DialogContentText>
            {data.tags !== undefined ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Хугацаа</TableCell>
                      <TableCell>Текст</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.tags.map((tag, i) => (
                      <TableRow key={tag._id}>
                        <TableCell>{tag.timeStamp}</TableCell>
                        <TableCell>{tag.text}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div className='flex flex-col items-center justify-center p-8'>
                <LabelOff className='text-9xl text-gray-300' />
                <span>Collection Empty</span>
              </div>
            )}
          </DialogContent>
        </div>
      ) : (
        <CircularProgress size={80} />
      )}
      <Dialog open={state.addTagModal} onClose={() => setState({ addTagModal: false })} classes={{ paper: 'p-8 min-w-40' }}>
        <DialogContent className='gap-4 flex flex-col w-full py-4'>
          <TextField label='Time Stamp' onChange={(e) => setState({ timeStamp: e.target.value })} placeholder='00:00' />
          <TextField label='Text' onChange={(e) => setState({ text: e.target.value })} multiline rows={4} />
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={() => setState({ addTagModal: false, timeStamp: undefined, text: undefined })}>Цуцлах</Button>
          <Button disabled={state.loading} onClick={async () => await handleAddTag()}>Хадгалах</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}

export default TagModal
