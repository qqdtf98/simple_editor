import axios from 'axios'
import apiUrl from '../modules/api-url'
import { store } from '../store'

class PairService {
  async getCSSPair(seq) {
    return await axios(apiUrl.csspair.get, {
      params: {
        css_file_seq: seq
      }
    })
  }
  async getJSPair(seq) {
    return await axios(apiUrl.jspair.get, {
      params: {
        js_file_seq: seq
      }
    })
  }
  async createCSSPair(pair) {
    return await axios.post(apiUrl.csspair.create, {
      html_css_pairs: pair
    })
  }
}

export default new PairService()
