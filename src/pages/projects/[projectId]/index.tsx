import { Project, ProjectSection } from '@/misc/types'
import instance from '@/service/axios/axiosConfig'
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { Edit, LocalOffer, Unarchive } from '@material-ui/icons'
import { AxiosResponse } from 'axios'
import { FunctionComponent, useEffect, useReducer } from 'react'
import router from 'next/router'
import UploadSection from '@/components/page-components/projects/SectionUpload'
import EditSection from '@/components/page-components/projects/SectionEdit'
import TagModal from '@/components/page-components/projects/ModalTag'

interface State {
  sectionEdit?: number
  sections?: ProjectSection[]
  sectionUpload?: boolean
  selectedProject?: Project
  audio?: File
  sectionLoading?: boolean
  tagModalOpen?: boolean
}

const ProjectInfo: FunctionComponent = () => {
  const [state, setState] = useReducer(
    (state: State, newState: State) => ({ ...state, ...newState }),
    {
      sectionLoading: false,
      tagModalOpen: false
    }
  )

  useEffect(() => {
    fetchSections().catch(e => console.error(e))
  }, [router.query.projectId])

  const fetchSections = async (): Promise<void> => {
    if (router.query.projectId !== undefined) {
      const id = router.query.projectId
      setState({ sectionLoading: true })
      await instance.get(`/projects?projectId=${id}`).then((res: AxiosResponse) => {
        setState({ sections: res.data.data, sectionLoading: false })
      })
    }
  }

  const handleUploadAudio = async (audio: File): Promise<void> => {
    if (state.sectionEdit !== undefined && state.sections !== undefined && audio !== null) {
      const sectionId = state.sections[state.sectionEdit]._id
      setState({ audio: audio })
      await instance.post(`/sections/upload?${sectionId}`, audio, { headers: { 'Content-type': 'audio/mpeg' } })
    }
  }
  return (
    <Paper classes={{ root: 'bg-gray-100/25 border-none shadow-xl p-4 w-full h-full overflow-y-auto' }}>
      {state.sectionLoading !== false ? (
        <CircularProgress size={50} />
      ) : (
        state.sections !== undefined && state.sections.length !== 0 ? (
          <TableContainer className='my-4'>
            <div className='flex justify-end items-center  mb-4'>
              <Button className='bg-opacity-20 bg-primary  shadow-md hover:bg-primary' onClick={() => setState({ sectionUpload: true })}>Add Section</Button>
            </div>
            <span className='mx-2 text-base '>{state.selectedProject?.desc ?? ''}</span>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Нэр</TableCell>
                  <TableCell>Аудио</TableCell>
                  <TableCell>Тайлбар</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {state.sections.map((section, i) => (
                  <TableRow key={section._id}>
                    <TableCell>{section.name}</TableCell>
                    {section.audioPath !== null && section.audioPath !== undefined && <TableCell><audio controls src={`http://3.144.152.209:3002/${section.audioPath.split('/')[1]}`} /></TableCell>}
                    <TableCell classes={{ root: 'w-1/2' }}>{section.desc}</TableCell>
                    <TableCell>
                      <div className='flex gap-4'>
                        <Edit className='cursor-pointer ' onClick={() => setState({ sectionEdit: i })} />
                        <div>
                          <label htmlFor='audio'><Unarchive className='cursor-pointer' /></label>
                          <input type='file' name='images' id='audio' className='w-96' hidden onChange={async (e) => e.target.files !== null && (await handleUploadAudio(e.target.files[0]))} />
                        </div>
                        <LocalOffer className='cursor-pointer' onClick={() => setState({ tagModalOpen: true })} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className='w-36 justify-center items-center flex h-full'>
            <Button className='bg-opacity-20 bg-primary  shadow-md hover:bg-primary' onClick={() => setState({ sectionUpload: true })}>Add Section</Button>
          </div>
        )
      )}
      <UploadSection isOpen={state.sectionUpload} onClose={() => setState({ sectionUpload: false })} />
      {state.sectionEdit !== undefined && state.sections !== undefined && <EditSection isOpen={state.sectionEdit !== undefined} onClose={() => setState({ sectionEdit: undefined })} sectionInfo={state.sections[state.sectionEdit]} />}
      <TagModal isOpen={state.tagModalOpen} onClose={() => setState({ tagModalOpen: false, sectionEdit: undefined })} />
    </Paper>
  )
}

export default ProjectInfo
