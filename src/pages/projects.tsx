import { Category, Project, ProjectSection } from '@/misc/types'
import instance from '@/service/axios/axiosConfig'
import { Button, Chip, CircularProgress, Divider, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import { ChevronRight, Edit } from '@material-ui/icons'
import { AxiosResponse } from 'axios'
import { FunctionComponent, useEffect, useReducer } from 'react'

interface IState {
  loading?: boolean
  list?: Project[]
  sectionName?: string
  sectionEdit?: number
  sections?: ProjectSection[]
  editSection?: boolean
  audio?: File
  newSectionName?: string
  selectedSectionId?: string
  selectedIdx?: number
  selectedProject?: Project
  category?: Category[]
}

const TaskMaker: FunctionComponent = () => {
  const [state, setState] = useReducer(
    (state: IState, newState: IState) => ({ ...state, ...newState }),
    {
      loading: false,
      list: [],
      editSection: false
    }
  )

  useEffect(() => { fetchData().catch(e => console.error(e)) }, [])

  const fetchData = async (): Promise<void> => {
    setState({ loading: true })
    await instance.get('/category/list').then((res: AxiosResponse) => {
      setState({ category: res.data.data })
    })
    await instance.get('/projects/list').then((res: AxiosResponse) => {
      setState({ list: res.data.data, loading: false })
    })
  }

  const fetchSections = async (id: string): Promise<void> => {
    await instance.get(`/projects?projectId=${id}`).then((res: AxiosResponse) => {
      setState({ sections: res.data.data })
    })
  }

  const handleSelect = (i: number): void => {
    if (state.list !== undefined && i !== undefined) {
      fetchSections(state.list[i]._id).catch(e => console.error(e))
      setState({ selectedIdx: i, selectedProject: state.list[i] })
    }
  }

  const uploadTask = async (): Promise<void> => {
    const body = {
      audioPath: state.audio,
      name: state.newSectionName,
      projectId: state.selectedSectionId
    }
    await instance.post('/sections/upload', body)
  }

  const handleUploadAudio = async (audio: File): Promise<void> => {
    console.log(audio)
    if (state.sectionEdit !== undefined && state.sections !== undefined && audio !== null) {
      const sectionId = state.sections[state.sectionEdit]._id
      setState({ audio: audio })
      await instance.post(`/sections/upload?${sectionId}`, audio, { headers: { 'Content-type': 'audio/mpeg' } })
    }
  }

  return (
    <div className='flex items-center flex-1 p-6'>
      <div>
        {state.category !== undefined ? (
          <div className='flex gap-4'>
            <Paper classes={{ root: 'bg-gray-100/25 border-none shadow-xl p-4 w-max h-full' }}>
              {state.category.map((item, idx) => (
                <div key={item._id}>
                  <div
                    className='text-white text-lg hover:bg-white hover:text-black hover:bg-opacity-30 flex justify-between items-center cursor-pointer'
                  >
                    <span>{item.name}</span>
                    <ChevronRight className='mx-2 text-3xl' />
                  </div>
                  <Divider className='bg-white' />
                </div>
              ))}
            </Paper>
            {state.list !== undefined && (
              <Paper classes={{ root: 'bg-gray-100/25 border-none shadow-xl p-4 w-auto h-full' }}>
                <TableContainer className='my-4'>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell className='text-white'>Категори</TableCell>
                        <TableCell className='text-white'>Нэр</TableCell>
                        <TableCell className='text-white'>Тайлбар</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.list.map((item, idx) => (
                        <TableRow onClick={() => handleSelect(idx)} key={item._id} className='cursor-pointer'>
                          <TableCell className='text-white'>{state.category?.find((e) => e._id === item.catId)?.name}</TableCell>
                          <TableCell className='text-white'>{item.name}</TableCell>
                          <TableCell className='text-white'>{item.desc}</TableCell>
                          <TableCell className='text-white'><Chip label={item.sections !== undefined ? item.sections.length : 0} className='bg-indigo-400 text-white h-auto' /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )}
            {state.sections !== undefined && (
              <Paper classes={{ root: 'bg-gray-100/25 border-none shadow-xl p-4 w-max h-full max-h-96 overflow-y-auto' }}>
                {state.sections.length !== 0 ? (
                  <TableContainer className='my-4'>
                    <div className='flex justify-between items-center text-white mb-4'>
                      <span className='mx-2 text-base underline'>{state.selectedProject?.name}</span>
                      <Button className='bg-opacity-20 bg-primary text-white shadow-md hover:bg-primary' onClick={() => setState({ editSection: true })}>Add Section</Button>
                    </div>
                    <span className='mx-2 text-base text-white'>{state.selectedProject?.desc ?? ''}</span>
                    <Table size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell className='text-white'>Нэр</TableCell>
                          <TableCell className='text-white'>Аудио</TableCell>
                          <TableCell className='text-white' />
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {state.sections.map((section, i) => (
                          <TableRow key={section._id}>
                            <TableCell className='text-white'>{section.name}</TableCell>
                            {section.audioPath !== null && <TableCell className='text-white'><audio controls src={`http://3.144.152.209:3002/${section.audioPath.split('/')[1]}`} /></TableCell>}
                            <TableCell><Edit className='cursor-pointer text-white' onClick={() => setState({ sectionEdit: i })} /></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <div className='w-36 justify-center items-center flex h-full'>
                    <Button className='bg-opacity-20 bg-primary text-white shadow-md hover:bg-primary' onClick={() => setState({ editSection: true, sections: undefined })}>Add Section</Button>
                  </div>
                )}
              </Paper>
            )}

          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
      <Dialog open={state.editSection ?? false} onClose={() => setState({ editSection: false })} classes={{ paper: 'bg-opacity-40 bg-white p-8' }}>
        <form className='text-white'>
          <div className='flex justify-center w-full'>
            <span className='text-lg font-semibold'>Add Section</span>
            <span>{state.sectionEdit}</span>
          </div>
          <div className='my-4'>
            <TextField name='caption' id='caption' label='Нэр' InputLabelProps={{ classes: { root: 'text-white' } }} InputProps={{ classes: { root: 'text-white' } }} onChange={(e) => setState({ newSectionName: e.target.value })} />
          </div>
          <div className='my-4'>
            <label htmlFor='audio' className='w-36 px-4 py-2 rounded-lg cursor-pointer bg-primary'>Upload Audio</label>
            <input type='file' name='images' id='audio' className='w-96' hidden onChange={async (e) => e.target.files !== null && (await handleUploadAudio(e.target.files[0]))} />
          </div>
          {state.audio !== undefined && (
            <audio id='audio' controls>
              <source src={URL.createObjectURL(state.audio)} type='audio/mpeg' />
            </audio>
          )}
          <Button onClick={async () => await uploadTask()}>
            Upload
          </Button>
        </form>
      </Dialog>
    </div>
  )
}

export default TaskMaker
