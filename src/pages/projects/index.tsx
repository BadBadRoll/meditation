import EditProject from '@/components/page-components/projects/ProjectEdit'
import { Category, Project, ProjectSection } from '@/misc/types'
import instance from '@/service/axios/axiosConfig'
import { Button, Chip, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { AxiosResponse } from 'axios'
import router from 'next/router'
import { FunctionComponent, useEffect, useReducer } from 'react'

interface IState {
  loading?: boolean
  list?: Project[]
  sectionEdit?: number
  sections?: ProjectSection[]
  selectedIdx?: number
  selectedProject?: Project
  category?: Category[]
  projectEditIdx?: number
  audio?: File
  openAddDialog?: boolean
  fetchNeeded?: boolean
}

const TaskMaker: FunctionComponent = () => {
  const [state, setState] = useReducer(
    (state: IState, newState: IState) => ({ ...state, ...newState }),
    {
      loading: false,
      list: [],
      fetchNeeded: true
    }
  )

  useEffect(() => { fetchData().catch(e => console.error(e)) }, [state.fetchNeeded])

  const fetchData = async (): Promise<void> => {
    setState({ loading: true })
    await instance.get('/category/list').then((res: AxiosResponse) => {
      setState({ category: res.data.data })
    })
    await instance.get('/projects/list').then((res: AxiosResponse) => {
      setState({ list: res.data.data })
    })
    setState({ loading: false })
  }

  const handleSelect = (i: number): void => {
    if (state.list !== undefined && i !== undefined) {
      router.push({
        pathname: `/projects/${state.list[i]._id}`
      }).catch((e) => console.log(e))
      setState({ selectedIdx: i, selectedProject: state.list[i] })
    }
  }

  return (
    <div className='flex items-center flex-col flex-1 p-6'>
      <Paper className='flex justify-end w-full p-4 border-none shadow-lg mb-4'>
        <Button onClick={() => setState({ openAddDialog: true })}>Прожект нэмэх</Button>
      </Paper>
      {state.category !== undefined ? (
        <div className='w-full'>
          {state.list !== undefined && (
            <Paper classes={{ root: 'shadow-xl w-auto' }} style={{ height: 'max-content' }}>
              <TableContainer className='my-4'>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Категори</TableCell>
                      <TableCell>Нэр</TableCell>
                      <TableCell>Тайлбар</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.list.map((item, idx) => (
                      <TableRow key={item._id} className='cursor-pointer'>
                        <TableCell onClick={() => handleSelect(idx)}>{state.category?.find((cat) => cat._id === item.catId)?.name}</TableCell>
                        <TableCell onClick={() => handleSelect(idx)}>{item.name}</TableCell>
                        <TableCell onClick={() => handleSelect(idx)}>{item.desc}</TableCell>
                        <TableCell>
                          <Chip label={item.sections !== undefined ? item.sections.length : 0} className='bg-indigo-400  h-auto' />
                          <Edit onClick={() => setState({ projectEditIdx: idx })} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
          {state.projectEditIdx !== undefined && state.list !== undefined && (
            <EditProject
              projectInfo={state.list[state.projectEditIdx]}
              isOpen={state.projectEditIdx !== undefined}
              onClose={() => setState({ projectEditIdx: undefined })}
              category={state.category}
              onFetch={() => setState({ fetchNeeded: !state.fetchNeeded })}
            />
          )}
          <EditProject
            isOpen={state.openAddDialog}
            onClose={() => setState({ openAddDialog: false })}
            category={state.category}
            onFetch={() => setState({ fetchNeeded: !state.fetchNeeded })}
          />
        </div>
      ) : (
        <CircularProgress className='absolute top-1/2 left-1/2 h-20 w-20' />
      )}
    </div>
  )
}

export default TaskMaker
