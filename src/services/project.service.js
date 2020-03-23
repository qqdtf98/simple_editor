import axios from 'axios'
import apiUrl from '../modules/api-url'
import { store } from '../store'

class ProjectService {
  async getProjectList() {
    return await axios(apiUrl.project.list.url, {
      params: {
        user_id: store.getters.userId
      }
    })
  }
  async getProjectData(seq) {
    return await axios(apiUrl.project.get.url, {
      params: {
        project_seq: seq
      }
    })
  }
  async createNewProject(name) {
    return await axios.post(apiUrl.project.create.url, {
      projects: [
        {
          user_seq: store.getters.userSeq,
          project_name: name
        }
      ]
    })
  }
}

export default new ProjectService()
