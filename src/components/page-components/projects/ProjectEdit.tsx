import { Category, Project } from '@/misc/types'
import instance from '@/service/axios/axiosConfig'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, MenuItem, Select, TextField } from '@material-ui/core'
import { FunctionComponent, useReducer } from 'react'

interface Props {
  isOpen?: boolean
  onClose: () => void
  className?: string
  projectInfo: Project
  category: Category[]
}

interface State {
  editProjectName?: string
  editProjectCatId?: string
  editProjectDesc?: string
}

const EditProject: FunctionComponent<Props> = ({ isOpen, onClose, className, projectInfo, category }) => {
  const [state, setState] = useReducer((state: State, newState: State) => ({ ...state, ...newState }), {})

  const handleEdit = (): void => {
    const body = {
      name: state.editProjectName,
      catId: state.editProjectCatId,
      desc: state.editProjectDesc
    }
    instance.put(`/projects/${projectInfo._id}`, body).catch((err) => console.log(err))
  }

  const handleClose = (): void => {
    setState({ editProjectCatId: undefined, editProjectName: undefined, editProjectDesc: undefined })
    onClose()
  }
  return (
    <Dialog open={isOpen ?? false} onClose={onClose}>
      {projectInfo !== undefined ? (
        <>
          <DialogContent className='gap-4 flex flex-col'>
            <div className='flex gap-4'>
              <TextField
                value={projectInfo.name ?? ''}
                onChange={(e) => setState({ editProjectName: e.target.value })}
                label='Нэр'
              />
              <Select
                value={state.editProjectCatId ?? projectInfo.catId}
                onChange={(e) => setState({ editProjectCatId: String(e.target.value) })}
                className='w-60'
              >
                {category.map((cat, i) => (
                  <MenuItem value={cat._id} key={i}>{cat.name}</MenuItem>
                ))}
              </Select>
            </div>
            <TextField
              onChange={(e) => setState({ editProjectDesc: e.target.value })}
              multiline
              rows={3}
              label='Тайлбар'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='text'>Буцах</Button>
            <Button onClick={() => handleEdit()}>Хадгалах</Button>
          </DialogActions>
        </>
      ) : (
        <CircularProgress size={50} />
      )}
    </Dialog>
  )
}

export default EditProject
