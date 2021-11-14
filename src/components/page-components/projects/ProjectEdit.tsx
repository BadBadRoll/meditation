import { Category, Project } from '@/misc/types'
import instance from '@/service/axios/axiosConfig'
import { Button, Dialog, DialogActions, DialogContent, MenuItem, TextField } from '@material-ui/core'
import { FunctionComponent, useReducer } from 'react'

interface Props {
  isOpen?: boolean
  onClose: () => void
  className?: string
  projectInfo?: Project
  category: Category[]
  onFetch?: () => void
}

interface State {
  projectName?: string
  projectCatId?: string
  projectDesc?: string
}

const EditProject: FunctionComponent<Props> = ({ isOpen, onClose, projectInfo, category, onFetch }) => {
  const [state, setState] = useReducer((state: State, newState: State) => ({ ...state, ...newState }), {
    projectName: projectInfo?.name,
    projectCatId: projectInfo?.catId,
    projectDesc: projectInfo?.desc
  })

  const handleSubmit = (): void => {
    const body = {
      name: state.projectName,
      catId: state.projectCatId,
      desc: state.projectDesc
    }

    if (projectInfo !== undefined && projectInfo !== null) {
      instance.put(`/projects/${projectInfo._id}`, body).catch((err) => console.log(err))
    } else {
      instance.post('/projects', body).catch((err) => console.error(err))
    }
    onFetch()
    handleClose()
  }

  const handleClose = (): void => {
    setState({ projectCatId: undefined, projectName: undefined, projectDesc: undefined })
    onClose()
  }
  return (
    <Dialog open={isOpen ?? false} onClose={onClose}>
      <>
        <span className='py-4 px-6 text-xl'>{projectInfo !== undefined ? 'Засах' : 'Нэмэх'}</span>
        <DialogContent className='gap-4 flex flex-col'>
          <div className='flex gap-4'>
            <TextField
              value={state.projectName}
              onChange={(e) => setState({ projectName: e.target.value })}
              label='Нэр'
            />
            <TextField
              select
              value={state.projectCatId}
              onChange={(e) => setState({ projectCatId: String(e.target.value) })}
              className='w-60'
              label='Категори'
            >
              {category.map((cat, i) => (
                <MenuItem value={cat._id} key={i}>{cat.name}</MenuItem>
              ))}
            </TextField>
          </div>
          <TextField
            onChange={(e) => setState({ projectDesc: e.target.value })}
            multiline
            value={state.projectDesc}
            rows={3}
            label='Тайлбар'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='text'>Буцах</Button>
          <Button onClick={() => handleSubmit()}>Хадгалах</Button>
        </DialogActions>
      </>
    </Dialog>
  )
}

export default EditProject
