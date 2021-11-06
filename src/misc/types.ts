import { SvgIconProps } from '@material-ui/core'

export interface MenuItem {
  icon: (props: SvgIconProps) => JSX.Element
  text: string
  route: string
  badge?: boolean
}

export interface ProjectList {
  catId: string
  desc: string
  sections: ProjectSection[]
  _id: string
  name: string
}

export interface ProjectSection {
  audioPath: string
  name: string
  projectId: string
  _id: string
  tags?: ProjectTagList[]
}

export interface ProjectTagList {
  _id: string
  sectionId: string
  timeStamp: string
  text: string
}

export interface Category {
  _id: string
  name: string
}
