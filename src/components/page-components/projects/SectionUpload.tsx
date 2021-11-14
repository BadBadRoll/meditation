import { ProjectSection } from '@/misc/types'
import instance from '@/service/axios/axiosConfig'
import { Button, Dialog, TextField } from '@material-ui/core'
import { FunctionComponent, useReducer } from 'react'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  className?: string
  id?: string
  fetchNeeded?: () => void
  sectionInfo?: ProjectSection
}

interface State {
  newSectionName?: string
  newSectionDescription?: string
}

const UploadSection: FunctionComponent<Props> = ({ isOpen, onClose, className, fetchNeeded, sectionInfo }) => {
  const [state, setState] = useReducer(
    (state: State, newState: State) => ({ ...state, ...newState }),
    {
      newSectionName: sectionInfo?.name,
      newSectionDescription: sectionInfo?.desc
    }
  )

  const uploadTask = (): void => {
    const body = {
      name: state.newSectionName,
      desc: state.newSectionDescription
    }

    if (sectionInfo !== undefined && sectionInfo !== null) {
      instance.put(`/sections?=${sectionInfo._id}`, body).then(() => {
        fetchNeeded()
        setState({ newSectionName: undefined, newSectionDescription: undefined })
        onClose()
      }
      ).catch(err => console.log(err))
    } else {
      instance.post('/sections', body).then(() => {
        fetchNeeded()
        setState({ newSectionName: undefined, newSectionDescription: undefined })
        onClose()
      }
      ).catch(err => console.log(err))
    }
  }
  return (
    <Dialog open={isOpen ?? false} onClose={onClose} classes={{ paper: 'bg-white p-8 md:w-96' }} className={className}>
      <form>
        <div className='flex flex-col justify-center w-full gap-4'>
          <span className='text-lg font-semibold'>Add Section</span>
          <TextField label='Нэр' onChange={(e) => setState({ newSectionName: e.target.value })} value={state.newSectionName} />
          <TextField label='Тайлбар' onChange={(e) => setState({ newSectionDescription: e.target.value })} value={state.newSectionDescription} multiline rows={4} />
          <Button onClick={() => uploadTask()}>
            Upload
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default UploadSection
