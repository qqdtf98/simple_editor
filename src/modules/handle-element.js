import { Work } from './undoredo'
import { store } from '../store'

class HandleElement {
  removeElement(elem) {
    let htmlSrc = $('iframe').get(0).contentWindow.document.documentElement
      .innerHTML

    elem.parentNode.removeChild(elem)

    let afterHtmlSrc = $('iframe').get(0).contentWindow.document.documentElement
      .innerHTML

    let newWork = new Work(htmlSrc, afterHtmlSrc)
    store.dispatch('workStackPush', newWork)
  }
  duplicateElement(clickedElem, index) {
    let htmlSrc = $('iframe').get(0).contentWindow.document.documentElement
      .innerHTML

    let copyElem = clickedElem.cloneNode(true)
    let randomClass =
      clickedElem.parentElement.classList.value.replace(/ /gi, '') +
      clickedElem.classList.value.replace(/ /gi, '') +
      index
    copyElem.classList.add(randomClass)
    index++
    $(clickedElem).after(copyElem)

    let afterHtmlSrc = $('iframe').get(0).contentWindow.document.documentElement
      .innerHTML

    let newWork = new Work(htmlSrc, afterHtmlSrc)
    store.dispatch('workStackPush', newWork)

    return index
  }
  moveElement(moveElem) {
    let htmlSrc = $('iframe').get(0).contentWindow.document.documentElement
      .innerHTML

    moveElem.style.filter = 'blur(0.8px)'
    let iframeMouseUp
    let windowMouseUp
    $('iframe')
      .get(0)
      .contentDocument.addEventListener(
        'mouseup',
        (iframeMouseUp = e => {
          window.dispatchEvent(
            new CustomEvent('mouseup', {
              detail: e
            })
          )
        })
      )
    window.addEventListener(
      'mouseup',
      (windowMouseUp = e => {
        moveElem.style.filter = 'blur(0)'
        if (moveElem !== e.detail.target) {
          e.detail.target.parentElement.insertBefore(moveElem, e.detail.target)

          let afterHtmlSrc = $('iframe').get(0).contentWindow.document
            .documentElement.innerHTML

          let newWork = new Work(htmlSrc, afterHtmlSrc)
          store.dispatch('workStackPush', newWork)

          $('iframe')
            .get(0)
            .contentDocument.removeEventListener('mouseup', iframeMouseUp)
          window.removeEventListener('mouseup', windowMouseUp)
        }
      })
    )
  }
}

export default new HandleElement()
