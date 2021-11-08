import instance from '@/service/axios/axiosConfig'
import { Button, Dialog, TextField } from '@material-ui/core'
import { FunctionComponent, useReducer } from 'react'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  className?: string
}

interface State {
  newSectionName?: string
  selectedSectionId?: string
  newSectionDescription?: string
}

const UploadSection: FunctionComponent<Props> = ({ isOpen, onClose, className }) => {
  const [state, setState] = useReducer(
    (state: State, newState: State) => ({ ...state, ...newState }),
    {}
  )

  const uploadTask = (): void => {
    const body = {
      name: state.newSectionName,
      description: state.newSectionDescription
    }
    instance.post('/sections/upload', body).catch(err => console.log(err))
  }
  return (
    <Dialog open={isOpen ?? false} onClose={onClose} classes={{ paper: 'bg-white p-8 md:w-96' }} className={className}>
      <form>
        <div className='flex flex-col justify-center w-full gap-4'>
          <span className='text-lg font-semibold'>Add Section</span>
          <TextField label='Нэр' onChange={(e) => setState({ newSectionName: e.target.value })} />
          <TextField label='Тайлбар' onChange={(e) => setState({ newSectionName: e.target.value })} multiline rows={4} />
          <Button onClick={() => uploadTask()}>
            Upload
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default UploadSection
