import { ProjectSection } from '@/misc/types'
import instance from '@/service/axios/axiosConfig'
import { Button, Dialog, TextField } from '@material-ui/core'
import { FunctionComponent, useReducer } from 'react'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  className?: string
  sectionInfo?: ProjectSection
}

interface State {
  newSectionName?: string
  newSectionDescription?: string
}

const EditSection: FunctionComponent<Props> = ({ isOpen, onClose, className, sectionInfo }) => {
  const [state, setState] = useReducer((state: State, newState: State) => ({ ...state, ...newState }), {})

  const uploadTask = (): void => {
    const body = {
      name: state.newSectionName,
      desc: state.newSectionDescription,
      projectId: sectionInfo?._id
    }
    instance.post('/sections/upload', body).catch(err => console.log(err))
  }

  return (
    <Dialog open={isOpen ?? false} onClose={onClose} classes={{ paper: 'bg-white p-8 md:w-96' }} className={className}>
      <form>
        <div className='flex flex-col justify-center w-full gap-4'>
          <span className='text-lg font-semibold'>Edit Section</span>
          <TextField label='Нэр' onChange={(e) => setState({ newSectionName: e.target.value })} value={state.newSectionName ?? sectionInfo?.name} />
          <TextField label='Тайлбар' onChange={(e) => setState({ newSectionDescription: e.target.value })} multiline value={state.newSectionDescription ?? sectionInfo?.desc} rows={4} />
          <Button onClick={() => uploadTask()}>
            Upload
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default EditSection
