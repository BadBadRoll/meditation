import dayjs from 'dayjs'
export enum VALIDATION_RESULT {
  VALID,
  INVALID,
  EMPTY,
  UNACCEPTED
}

export interface IValidationProps {
  allowEmpty?: boolean
  notEmpty?: boolean
  maxLength?: number
  minLength?: number
  length?: number
  regex?: RegExp
  number?: boolean
  numeric?: boolean
  phoneInternational?: boolean
  money?: boolean
  minValue?: number
  maxValue?: number
  before?: Date
  after?: Date
  future?: boolean
  past?: boolean
  /** not sure if it works */
  date?: boolean
  equalTo?: any
  notEqualTo?: any
  /** not implemented */
  inValue?: any
  email?: boolean
  phone?: boolean
  url?: boolean
}

export const validate = (props: IValidationProps, value: any): VALIDATION_RESULT => {
  let ret = VALIDATION_RESULT.VALID
  if (props.allowEmpty) {
    if (value === null || value === undefined || value === '') {
      return VALIDATION_RESULT.EMPTY
    }
  }
  if (props.notEmpty) {
    if (value === null || value === undefined) {
      ret = VALIDATION_RESULT.INVALID
    } else if (typeof value === 'string' || Array.isArray(value)) {
      if (value.length === 0) ret = VALIDATION_RESULT.INVALID
    }
  }
  if (props.maxLength > 0) {
    if (value === null || value === undefined) {
      ret = VALIDATION_RESULT.INVALID
    } else if (typeof value === 'string' || Array.isArray(value)) {
      if (value.length > props.maxLength) return VALIDATION_RESULT.UNACCEPTED
    } else { throw new Error('maxLength not supported') }
  }
  if (props.minLength > 0) {
    if (value === null || value === undefined) {
      ret = VALIDATION_RESULT.INVALID
    } else if (typeof value === 'string' || Array.isArray(value)) {
      if (value.length < props.minLength) ret = VALIDATION_RESULT.INVALID
    } else { throw new Error('minLength not supported') }
  }
  if (props.length > 0) {
    if (value === null || value === undefined) {
      ret = VALIDATION_RESULT.INVALID
    } else if (typeof value === 'string' || Array.isArray(value)) {
      if (value.length > props.length) return VALIDATION_RESULT.UNACCEPTED
      if (value.length < props.length) ret = VALIDATION_RESULT.INVALID
    } else { throw new Error('length not supported') }
  }
  if (props.regex !== undefined) {
    if (value === null || value === undefined) {
      ret = VALIDATION_RESULT.INVALID
    } else if (typeof value === 'string') {
      if (!props.regex.test(value)) {
        ret = VALIDATION_RESULT.INVALID
      }
    } else { throw new Error('regex not supported') }
  }
  if (props.number) {
    if (value === null || value === undefined || value === '') {
      ret = VALIDATION_RESULT.INVALID
    } else if (!/^(0|[1-9][0-9]*)$/.test(value)) {
      return VALIDATION_RESULT.UNACCEPTED
    }
  }
  if (props.numeric) {
    if (value === null || value === undefined || value === '') {
      ret = VALIDATION_RESULT.INVALID
    } else if (!/^\d*$/.test(value)) {
      return VALIDATION_RESULT.UNACCEPTED
    }
  }
  if (props.phoneInternational) {
    if (value === null || value === undefined || value === '') {
      ret = VALIDATION_RESULT.INVALID
    } else if (!/^\+?\d{0,15}$/.test(value)) {
      return VALIDATION_RESULT.UNACCEPTED
    } else if (!/^\+?\d{3,15}$/.test(value)) {
      return VALIDATION_RESULT.INVALID
    }
  }
  if (props.money) {
    if (value === null || value === undefined || value === '') {
      ret = VALIDATION_RESULT.INVALID
    } else if (!/^-?(0|[1-9][0-9]*)(\.([0-9]{1,2}))?$/.test(value)) {
      if (/^-?((0|[1-9][0-9]*)(\.)?)?$/.test(value)) {
        ret = VALIDATION_RESULT.INVALID
      } else {
        return VALIDATION_RESULT.UNACCEPTED
      }
    }
  }
  if (props.minValue !== null && props.minValue !== undefined) {
    if (value === null || value === undefined) {
      ret = VALIDATION_RESULT.INVALID
    } else {
      const intValue = parseInt(value, 10)
      if (intValue < props.minValue) {
        ret = VALIDATION_RESULT.INVALID
      }
    }
  }
  if (props.maxValue !== null && props.maxValue !== undefined) {
    if (value === null || value === undefined) {
      ret = VALIDATION_RESULT.INVALID
    } else {
      const intValue = parseInt(value, 10)
      if (intValue > props.maxValue) {
        return VALIDATION_RESULT.UNACCEPTED
      }
    }
  }
  if (props.before !== undefined) {
    if (value === null || value === undefined || !dayjs.isDayjs(value)) {
      ret = VALIDATION_RESULT.INVALID
    } else if (value.isAfter(dayjs(props.before))) {
      ret = VALIDATION_RESULT.INVALID
    }
  }
  if (props.after !== undefined) {
    if (value === null || value === undefined || !dayjs.isDayjs(value)) {
      ret = VALIDATION_RESULT.INVALID
    } else if (value.isBefore(dayjs(props.after))) {
      ret = VALIDATION_RESULT.INVALID
    }
  }
  if (props.future) {
    if (value === null || value === undefined || !dayjs.isDayjs(value)) {
      ret = VALIDATION_RESULT.INVALID
    } else if (value.isBefore(dayjs().startOf('day'))) {
      ret = VALIDATION_RESULT.INVALID
    }
  }
  if (props.past) {
    if (value === null || value === undefined || !dayjs.isDayjs(value)) {
      ret = VALIDATION_RESULT.INVALID
    } else if (value.isAfter(dayjs())) {
      ret = VALIDATION_RESULT.INVALID
    }
  }
  if (props.date) {
    if (value !== null && value !== undefined) {
      if (!dayjs.isDayjs(value)) {
        ret = VALIDATION_RESULT.INVALID
      }
    }
  }
  if (props.equalTo !== undefined) {
    if (value !== props.equalTo) {
      ret = VALIDATION_RESULT.INVALID
    }
  }
  if (props.notEqualTo !== undefined) {
    if (value === props.notEqualTo) {
      ret = VALIDATION_RESULT.INVALID
    }
  }
  if (props.inValue !== undefined) {}
  if (props.email) {
    if (value === null || value === undefined || value === '') {
      ret = VALIDATION_RESULT.INVALID
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
      return VALIDATION_RESULT.INVALID
    }
  }
  if (props.phone) {
    if (value === null || value === undefined || value === '') {
      ret = VALIDATION_RESULT.INVALID
    } else if (!/^[789]\d{0,7}$/.test(value)) {
      return VALIDATION_RESULT.UNACCEPTED
    } else if (!/^[789]\d{7}$/.test(value)) {
      return VALIDATION_RESULT.INVALID
    }
  }
  if (props.url) {
    if (value === null || value === undefined || value === '') {
      ret = VALIDATION_RESULT.INVALID
      // TODO improve regex for url
    } else if (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(value)) {
      return VALIDATION_RESULT.INVALID
    }
  }
  return ret
}