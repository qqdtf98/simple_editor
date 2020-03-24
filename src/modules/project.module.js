import { store } from '../store'

class ProjectModule {
  setProjectData(res) {
    let htmlTitles = store.getters.htmlTitles
    let cssTitles = store.getters.cssTitles
    let jsTitles = store.getters.jsTitles
    let titles = store.getters.titles
    let stylePair = store.getters.stylePair
    let jsPair = store.getters.jsPair
    let folderSeq = store.getters.folderSeq
    let i
    let folder
    let j
    let k
    let title
    let pair
    for (i = 0; i < res.data.data.folders.length; i++) {
      folder = {
        type: res.data.data.folders[i].folder_name,
        seq: res.data.data.folders[i].folder_seq
      }
      folderSeq.push(folder)
      for (j = 0; j < res.data.data.folders[i].files.length; j++) {
        let css_list = []
        let js_list = []
        title = res.data.data.folders[i].files[j]
        title.isEdited = false
        title.text =
          res.data.data.folders[i].files[j].file_name +
          '.' +
          res.data.data.folders[i].files[j].file_type
        if (res.data.data.folders[i].folder_name === 'html') {
          if (res.data.data.folders[i].files[j].html_css_pair.length > 0) {
            for (
              k = 0;
              k < res.data.data.folders[i].files[j].html_css_pair.length;
              k++
            ) {
              css_list.push(
                res.data.data.folders[i].files[j].html_css_pair[k].css_file_seq
              )
            }
            pair = {
              html: res.data.data.folders[i].files[j].file_seq,
              css: css_list
            }
            stylePair.push(pair)
          }
          if (res.data.data.folders[i].files[j].html_js_pair.length > 0) {
            for (
              k = 0;
              k < res.data.data.folders[i].files[j].html_js_pair.length;
              k++
            ) {
              js_list.push(
                res.data.data.folders[i].files[j].html_js_pair[k].js_file_seq
              )
            }
            pair = {
              html: res.data.data.folders[i].files[j].file_seq,
              js: js_list
            }
            jsPair.push(pair)
          }
          titles.push(title)
          htmlTitles.push(title)
        } else if (res.data.data.folders[i].folder_name === 'css') {
          cssTitles.push(title)
        } else if (res.data.data.folders[i].folder_name === 'js') {
          jsTitles.push(title)
        }
      }
    }
    store.commit('setJsPair', jsPair)
    store.commit('setStylePair', stylePair)
    store.commit('setFolderSeq', folderSeq)
    store.commit('setHtmlTitles', htmlTitles)
    store.commit('setCssTitles', cssTitles)
    store.commit('setJsTitles', jsTitles)
    store.commit('setTitles', titles)
  }
}

export default new ProjectModule()
