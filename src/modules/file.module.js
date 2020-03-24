import FileService from '../services/file.service'
import { store } from '../store'

class FileModule {
  copyFile() {
    let htmlTitles = store.getters.htmlTitles
    let cssTitles = store.getters.cssTitles
    let jsTitles = store.getters.jsTitles
    let titles = store.getters.titles
    let selectedFile = store.getters.selectedFile
    let stylePair = store.getters.stylePair
    if (selectedFile.textContent.trim().split('.')[1] === 'html') {
      let i
      for (i = 0; i < htmlTitles.length; i++) {
        if (htmlTitles[i].text === selectedFile.textContent.trim()) {
          break
        }
      }
      let copyFileTitle =
        selectedFile.textContent.trim().split('.')[0] + '_copy'
      FileService.checkFileName(
        htmlTitles[i].folder_seq,
        htmlTitles[i].file_type,
        copyFileTitle
      ).then(res => {
        if (res.data.responseCode === 'SUCCESS') {
          let data = {
            folder_seq: htmlTitles[i].folder_seq,
            file_name: copyFileTitle,
            file_path:
              htmlTitles[i].file_path.split(htmlTitles[i].file_name)[0] +
              copyFileTitle +
              '.' +
              htmlTitles[i].file_type,
            file_type: htmlTitles[i].file_type,
            contents: htmlTitles[i].contents
          }
          FileService.createFile(data).then(res => {
            let copiedFile = res.data.data[0]
            if (res.data.responseCode === 'SUCCESS') {
              // htmltitles에 있는 pair정보 가지고 pair생성
              let title
              if (htmlTitles[i].html_css_pair.length > 0) {
                let data = []
                let j
                for (j = 0; j < htmlTitles[i].html_css_pair.length; j++) {
                  data.push({
                    html_file_seq: copiedFile.file_seq,
                    css_file_seq: htmlTitles[i].html_css_pair[j].css_file_seq
                  })
                }
                PairService.createCSSPair(data).then(res => {
                  if (res.data.responseCode === 'SUCCESS') {
                    title = copiedFile
                    title.html_css_pair = res.data.data
                    title.isEdited = false
                    title.text =
                      copiedFile.file_name + '.' + copiedFile.file_type
                  }
                })
              } else {
                title = copiedFile
                title.isEdited = false
                title.text = copiedFile.file_name + '.' + copiedFile.file_type
              }
              stylePair.push(res.data.data)
              titles.push(title)
              htmlTitles.push(title)
              store.commit('setStylePair', stylePair)
              store.commit('setTitles', titles)
              store.commit('setHtmlTitles', htmlTitles)
              store.commit('setCssTitles', cssTitles)
              store.commit('setJsTitles', jsTitles)
              // $refs.filecontent.setStylePair(stylePair)
              // $refs.filecontent.setFiles(htmlTitles, cssTitles, jsTitles)
              // $refs.sitemap.loadSitemap(titles)
            }
          })
        }
      })
    } else if (selectedFile.textContent.trim().split('.')[1] === 'css') {
      console.log('cssss')
      let i
      for (i = 0; i < cssTitles.length; i++) {
        if (cssTitles[i].text === selectedFile.textContent.trim()) {
          break
        }
      }
      let copyFileTitle =
        selectedFile.textContent.trim().split('.')[0] + '_copy'
      FileService.checkFileName(
        cssTitles[i].folder_seq,
        cssTitles[i].file_type,
        copyFileTitle
      ).then(res => {
        if (res.data.responseCode === 'SUCCESS') {
          let data = {
            folder_seq: cssTitles[i].folder_seq,
            file_name: copyFileTitle,
            file_path:
              cssTitles[i].file_path.split(cssTitles[i].file_name)[0] +
              copyFileTitle +
              '.' +
              cssTitles[i].file_type,
            file_type: cssTitles[i].file_type,
            contents: cssTitles[i].contents
          }
          FileService.createFile(data).then(res => {
            if (res.data.responseCode === 'SUCCESS') {
              let copiedFile = res.data.data[0]
              copiedFile.isEdited = false
              copiedFile.text =
                res.data.data[0].file_name + '.' + res.data.data[0].file_type
              cssTitles.push(copiedFile)
              process.nextTick(() => {
                store.commit('setHtmlTitles', htmlTitles)
                store.commit('setCssTitles', cssTitles)
                store.commit('setJsTitles', jsTitles)
                // $refs.filecontent.setFiles(htmlTitles, cssTitles, jsTitles)
              })
            }
          })
        }
      })
    }
  }
  deleteFile() {
    let deleteFileNum
    let selectedFile = store.getters.selectedFile
    let htmlTitles = store.getters.htmlTitles
    let cssTitles = store.getters.cssTitles
    // let jsTitles =store.getters.jsTitles
    let titles = store.getters.titles
    let i
    if (selectedFile.textContent.split('.')[1].trim() === 'html') {
      for (i = 0; i < htmlTitles.length; i++) {
        if (htmlTitles[i].text === selectedFile.textContent.trim()) {
          deleteFileNum = i
          FileService.deleteFile(htmlTitles[i].file_seq).then(res => {
            if (res.data.responseCode === 'SUCCESS') {
              process.nextTick(() => {
                htmlTitles.splice(deleteFileNum, 1)
                titles.splice(deleteFileNum, 1)
                process.nextTick(() => {
                  // this.$refs.filecontent.setFiles(htmlTitles, cssTitles, jsTitles)
                  // this.$refs.sitemap.loadSitemap(titles)
                  store.commit('setHtmlTitles', htmlTitles)
                })
              })
            }
          })
        }
      }
    } else if (selectedFile.textContent.split('.')[1].trim() === 'css') {
      for (i = 0; i < cssTitles.length; i++) {
        if (cssTitles[i].text === selectedFile.textContent.trim()) {
          deleteFileNum = i
          FileService.deleteFile(cssTitles[i].file_seq).then(res => {
            if (res.data.responseCode === 'SUCCESS') {
              process.nextTick(() => {
                cssTitles.splice(deleteFileNum, 1)
                process.nextTick(() => {
                  // this.$refs.filecontent.setFiles(htmlTitles, cssTitles, jsTitles)
                  store.commit('setCssTitles', cssTitles)
                })
              })
            }
          })
        }
      }
    }
  }
  focusInput(target) {
    const sel = window.getSelection()
    sel.removeAllRanges()
    const range = new Range()
    range.setStart(target, 0)
    range.setEnd(target, 0)
    sel.addRange(range)
    this.placeCaretAtEnd(target)
  }
  placeCaretAtEnd(el) {
    el.focus()
    if (
      typeof window.getSelection !== 'undefined' &&
      typeof document.createRange !== 'undefined'
    ) {
      const range = document.createRange()
      range.selectNodeContents(el)
      range.collapse(false)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    } else if (typeof document.body.createTextRange !== 'undefined') {
      const textRange = document.body.createTextRange()
      textRange.moveToElementText(el)
      textRange.collapse(false)
      textRange.select()
    }
  }
  setNewFileTitle(e, type, project) {
    // 새로운 파일 추가일때
    let folderSeq = store.getters.folderSeq
    let htmlTitles = store.getters.htmlTitles
    let cssTitles = store.getters.cssTitles
    let jsTitles = store.getters.jsTitles
    let data
    let i
    for (i = 0; i < folderSeq.length; i++) {
      if (folderSeq[i].type === type) {
        break
      }
    }
    data = {
      folder_seq: folderSeq[i].seq,
      file_name: e.target.textContent.split('.')[0].trim(),
      file_path:
        project +
        '/' +
        type +
        '/' +
        e.target.textContent.split('.')[0].trim() +
        '.' +
        type,
      file_type: type,
      contents: ''
    }
    FileService.createFile(data).then(res => {
      if (res.data.responseCode === 'SUCCESS') {
        console.log('succeseee')
        if (res.data.data[0].file_type === 'html') {
          htmlTitles[htmlTitles.length - 1] = res.data.data[0]
          htmlTitles[htmlTitles.length - 1].text =
            e.target.textContent.split('.')[0].trim() + '.html'
          htmlTitles[htmlTitles.length - 1].isEdited = false
          store.commit('setHtmlTitles', htmlTitles)
        } else if (res.data.data[0].file_type === 'css') {
          cssTitles[cssTitles.length - 1] = res.data.data[0]
          cssTitles[cssTitles.length - 1].text =
            e.target.textContent.split('.')[0] + '.css'
          cssTitles[cssTitles.length - 1].isEdited = false
          store.commit('setCssTitles', cssTitles)
        } else if (res.data.data[0].file_type === 'js') {
          jsTitles[jsTitles.length - 1] = res.data.data[0]
          jsTitles[jsTitles.length - 1].text =
            e.target.textContent.split('.')[0] + '.js'
          jsTitles[jsTitles.length - 1].isEdited = false
          store.commit('setJsTitles', jsTitles)
        }

        // $emit('reset-titles', htmlTitles, cssTitles, jsTitles)
        e.target.textContent = e.target.textContent.split('.')[0] + '.' + type
      } else {
        if (res.data.data[0].file_type === 'html') {
          htmlTitles.splice(htmlTitles.length - 1, 1)
          store.commit('setHtmlTitles', htmlTitles)
        } else if (res.data.data[0].file_type === 'css') {
          cssTitles.splice(cssTitles.length - 1, 1)
          store.commit('setCssTitles', cssTitles)
        } else if (res.data.data[0].file_type === 'js') {
          jsTitles.splice(jsTitles.length - 1, 1)
          store.commit('setJsTitles', jsTitles)
        }
        // $emit('reset-titles', htmlTitles, cssTitles, jsTitles)
      }
    })
  }
  setFileTitle(e, type, contextTarget) {
    let folderSeq = store.getters.folderSeq
    let htmlTitles = store.getters.htmlTitles
    let cssTitles = store.getters.cssTitles
    let jsTitles = store.getters.jsTitles

    // 기존 파일 수정일 때
    if (type === 'html') {
      let html = document.querySelector('.html')
      let i
      for (i = 0; i < html.children.length; i++) {
        if (html.children[i] === contextTarget) break
      }
      let j
      for (j = 0; j < folderSeq.length; j++) {
        if (folderSeq[j].type === type) {
          break
        }
      }
      FileService.updateFileName(
        folderSeq[j],
        htmlTitles[i],
        e.target.textContent.split('.')[0].trim(),
        type
      ).then(res => {
        if (res.data.responseCode === 'SUCCESS') {
          e.target.textContent = e.target.textContent.split('.')[0] + '.' + type
        } else {
          htmlTitles.splice(htmlTitles.length - 1, 1)
        }
      })
      htmlTitles[i].text = e.target.textContent.split('.')[0] + '.html'
      htmlTitles[i].file_path =
        htmlTitles[i].file_path.split(htmlTitles[i].text)[0] +
        e.target.textContent.split('.')[0] +
        '.' +
        type
    } else if (type === 'css') {
      let css = document.querySelector('.css')
      let i
      for (i = 0; i < css.children.length; i++) {
        if (css.children[i] === contextTarget) break
      }
      let j
      for (j = 0; j < folderSeq.length; j++) {
        if (folderSeq[j].type === type) {
          break
        }
      }
      FileService.updateFileName(
        folderSeq[j].seq,
        cssTitles[i],
        e.target.textContent.split('.')[0].trim(),
        type
      ).then(res => {
        if (res.data.responseCode === 'SUCCESS') {
          e.target.textContent = e.target.textContent.split('.')[0] + '.' + type
        } else {
          cssTitles.splice(cssTitles.length - 1, 1)
        }
      })
      cssTitles[i].text = e.target.textContent.split('.')[0] + '.css'
      cssTitles[i].file_path =
        cssTitles[i].file_path.split(cssTitles[i].text)[0] +
        e.target.textContent.split('.')[0] +
        '.' +
        type
    } else if (type === 'js') {
      let js = document.querySelector('.js')
      let i
      for (i = 0; i < js.children.length; i++) {
        if (js.children[i] === contextTarget) break
      }
      let j
      for (j = 0; j < folderSeq.length; j++) {
        if (folderSeq[j].type === type) {
          break
        }
      }
      FileService.updateFileName(
        folderSeq[j].seq,
        jsTitles[i],
        e.target.textContent.split('.')[0].trim(),
        type
      ).then(res => {
        if (res.data.responseCode === 'SUCCESS') {
          e.target.textContent = e.target.textContent.split('.')[0] + '.' + type
        } else {
          jsTitles.splice(jsTitles.length - 1, 1)
        }
      })
      jsTitles[i].text = e.target.textContent.split('.')[0] + '.js'
      jsTitles[i].file_path =
        jsTitles[i].file_path.split(jsTitles[i].text)[0] +
        e.target.textContent.split('.')[0] +
        '.' +
        type
    }
    store.commit('setHtmlTitles', htmlTitles)
    store.commit('setCssTitles', cssTitles)
    store.commit('setJsTitles', jsTitles)
    // $emit('reset-titles', htmlTitles, cssTitles, jsTitles)
  }
}

export default new FileModule()
