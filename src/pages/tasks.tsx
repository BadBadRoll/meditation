import { TextField } from '@material-ui/core'
import { FunctionComponent } from 'react'

const TaskMaker: FunctionComponent = () => {
  return (
    <div className='flex justify-center items-center flex-1'>
      <div>
        <form>
          <h1><strong>File upload</strong></h1>
          <div className='form-group'>
            <label htmlFor='title'>Title </label>
            <TextField type='text' name='title' id='title' className='form-controll' />
          </div>
          <div className='form-group'>
            <label htmlFor='caption'>Caption</label>
            <TextField type='text' name='caption' id='caption' className='form-controll' />
          </div>

          <div className='form-group file-area'>
            <label htmlFor='images'>Images</label>
            <input type='file' name='images' id='images' className='w-96' />
          </div>
          <div className='form-group'>
            <button type='submit'>Upload images</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskMaker
