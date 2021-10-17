import { TextField } from '@material-ui/core'
import { FunctionComponent } from 'react'

const TaskMaker: FunctionComponent = () => {
  return (
    <div>
      <div>
        <input type='file' hidden id='input-button' />
        <label htmlFor='input-button'>
          <div className='bg-primary w-max text-white p-2 rounded-lg cursor-pointer'>
            Upload Image
          </div>
        </label>
        <form>
          <h1><strong>File upload</strong></h1>
          <div className='form-group'>
            <label htmlFor='title'>Title <span>Use title case to get a better result</span></label>
            <TextField type='text' name='title' id='title' className='form-controll' />
          </div>
          <div className='form-group'>
            <label htmlFor='caption'>Caption <span>This caption should be descriptiv</span></label>
            <TextField type='text' name='caption' id='caption' className='form-controll' />
          </div>

          <div className='form-group file-area'>
            <label htmlFor='images'>Images <span>Your images should be at least 400x300 wide</span></label>
            <input type='file' name='images' id='images' />
            <div className='file-dummy'>
              <div className='default'>Please select some files</div>
            </div>
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
