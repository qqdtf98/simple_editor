const host = 'http://192.168.0.86:8581/editor'

export default {
  project: {
    list: {
      method: 'get',
      url: `${host}/project/selectProject`
    },
    get: {
      method: 'get',
      url: `${host}/project/selectProjectAll`
    },
    create: {
      method: 'post',
      url: `${host}/project/createProject`
    }
  },
  file: {
    pair: {
      method: 'get',
      url: `${host}/file/selectHtmlCssPair`
    },
    update: {
      method: 'post',
      url: `${host}/file/updateFile`
    },
    delete: {
      method: 'post',
      url: `${host}/file/deleteFile`
    },
    checkName: {
      method: 'get',
      url: `${host}/file/checkFileName`
    },
    create: {
      method: 'post',
      url: `${host}/file/createFile`
    }
  }
}
