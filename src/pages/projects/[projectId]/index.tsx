import { Project, ProjectSection } from '@/misc/types'
import instance from '@/service/axios/axiosConfig'
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { ChevronLeft, Delete, Edit, FolderOpen, Launch, Unarchive } from '@material-ui/icons'
import { AxiosResponse } from 'axios'
import { FunctionComponent, useEffect, useReducer } from 'react'
import router from 'next/router'
import UploadSection from '@/components/page-components/projects/SectionUpload'
import TagModal from '@/components/page-components/projects/ModalTag'
import ConfirmDialog from '@/components/ui-components/Dialogs/ConfirmDialog'

interface State {
  sectionEdit?: number
  sections?: ProjectSection[]
  sectionUpload?: boolean
  selectedProject?: Project
  audio?: File
  sectionLoading?: boolean
  tagModalOpen?: boolean
  tagSection?: ProjectSection,
  deleteSectionId?: string,
  deleteConfirmModal?: boolean,
  fetchData?: boolean
}

const ProjectInfo: FunctionComponent = () => {
  const [state, setState] = useReducer(
    (state: State, newState: State) => ({ ...state, ...newState }),
    {
      sectionLoading: false,
      tagModalOpen: false,
      fetchData: true
    }
  )

  useEffect(() => {
    fetchSections().catch(e => console.error(e))
  }, [state.fetchData])

  const fetchSections = async (): Promise<void> => {
    if (router.query.projectId !== undefined) {
      const id = router.query.projectId
      setState({ sectionLoading: true })
      await instance.get(`/projects?projectId=${id}`).then((res: AxiosResponse) => {
        setState({ sections: res.data.data, sectionLoading: false, fetchData: false })
      })
    }
  }

  const handleUploadAudio = async (e: any, i: number): Promise<void> => {

    if (e.target.files !== undefined && state.sections !== undefined) {
      const audio: File = e.target.files[0]
      const sectionId = state.sections[i]._id
      const url = `/sections/upload?sectionId=${sectionId}`
      const bodyFormData = new FormData();
      bodyFormData.append('test', audio)
      await instance.post(url, bodyFormData, {
        headers: {
          'Content-type': 'multipart/form-data', "Accept": "application/json",
          "type": "formData"
        }
      })
    }
  }

  const handleDelete = () => {
    instance.delete(`/sections/?id=${state.deleteSectionId}`)
  }

  return (
    <div>
      {state.sectionLoading !== false ? (
        <div className='flex w-full min-h-20 items-center justify-center'>
          <CircularProgress size={100} />
        </div>
      ) : (
        <>
          <Paper className='mb-4 justify-between flex'>
            <Button variant='text' onClick={async () => await router.push('/projects')} className='hover:underline hover:text-blue-500'><ChevronLeft />Буцах</Button>
            <Button onClick={() => setState({ sectionUpload: true })}>Add Section</Button>
          </Paper>
          {state.sections !== undefined && state.sections.length !== 0 ? (
            <Paper>
              <TableContainer className='my-4'>
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
                        <TableCell>{section.audioPath !== null && section.audioPath !== undefined && <audio controls src={`http://3.144.152.209:3002/${section.audioPath.split('/')[1]}`} />}</TableCell>
                        <TableCell classes={{ root: 'w-1/2' }}>{section.desc}</TableCell>
                        <TableCell>
                          <div className='flex gap-4'>
                            <Edit className='cursor-pointer ' onClick={() => setState({ sectionEdit: i })} />
                            <div>
                              <label htmlFor='audio'><Unarchive className='cursor-pointer' /></label>
                              <input type='file' name='images' id='audio' className='w-96' hidden onChange={(e) => handleUploadAudio(e, i)} />
                            </div>
                            <Launch className='cursor-pointer' onClick={() => setState({ tagModalOpen: true, tagSection: section })} />
                            <Delete className='cursor-pointer' onClick={() => setState({ deleteSectionId: section._id, deleteConfirmModal: true })} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ) : (
            <Paper className='mt-4 flex items-center justify-center flex-col'>
              <FolderOpen className='h-96 w-96 opacity-20' />
              <span className='mb-8 text-2xl opacity-20 font-semibold'>Хоосон байна</span>
            </Paper>
          )}
        </>
      )}
      {state.sections !== undefined && <UploadSection isOpen={state.sectionEdit !== undefined} onClose={() => setState({ sectionEdit: undefined })} fetchNeeded={() => setState({ fetchData: true })} sectionInfo={state.sections[state.sectionEdit]} />}
      <UploadSection isOpen={state.sectionUpload} onClose={() => setState({ sectionUpload: false })} fetchNeeded={() => setState({ fetchData: true })} />
      <TagModal isOpen={state.tagModalOpen} onClose={() => setState({ tagModalOpen: false, sectionEdit: undefined })} data={state.tagSection} fetchData={setState} />
      <ConfirmDialog open={state.deleteConfirmModal} title='Үргэлжлүүлэх дарсанаар устгагдах болно.' onClose={() => setState({ deleteSectionId: undefined, deleteConfirmModal: false })} onConfirm={handleDelete} />
    </div>
  )
}

export default ProjectInfo
