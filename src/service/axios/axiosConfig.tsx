import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://3.144.152.209:3002/rest'
}
)

export default instance
