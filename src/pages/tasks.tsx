import { TextField } from '@material-ui/core'
import { FunctionComponent } from 'react'

const TaskMaker: FunctionComponent = () => {
  return (
    <div className='flex justify-center items-center flex-1'>
      <div>
        <form className='text-white'>
          <div className='flex justify-center w-full'>
          <h1 className='border p-4 w-max rounded-lg '><strong>File upload</strong></h1>
          </div>
          <div className='my-4'>
            <label htmlFor='title'>Title </label>
            <TextField type='text' name='title' id='title' className='form-controll' />
          </div>
          <div className='my-4'>
            <label htmlFor='caption'>Caption</label>
            <TextField type='text' name='caption' id='caption' className='form-controll' multiline />
          </div>
          <div className='my-4'>
            <label htmlFor='images' className='w-36 px-4 py-2 rounded-lg cursor-pointer bg-primary'>Images</label>
            <input type='file' name='images' id='images' className='w-96' hidden />
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskMaker
