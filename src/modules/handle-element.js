class HandleElement {
  removeElement(elem) {
    let i
    let nChild
    for (i = 0; i < elem.parentElement.children.length; i++) {
      if (elem.parentElement.children[i] === elem) {
        nChild = i
        break
      }
    }
    var remove = {
      work: 'remove',
      position: elem.parentNode,
      elem: elem,
      nth: nChild
    }
    elem.parentNode.removeChild(elem)
    // TODO undo, redo를 위한 stack을 store에 저장하여 사용
    // this.$emit('stack-push', remove)
  }
  duplicateElement(clickedElem, index) {
    let classValue = ''
    let i
    // console.log(clickedElem.classList.length)
    for (i = 0; i < clickedElem.classList.length; i++) {
      if (i === clickedElem.classList.length - 1) {
        classValue += '.' + clickedElem.classList[i]
      } else {
        classValue += '.' + clickedElem.classList[i] + ' '
      }
    }
    // console.log(classValue)
    let nChild
    for (i = 0; i < clickedElem.parentElement.children.length; i++) {
      if (clickedElem.parentElement.children[i] === clickedElem) {
        nChild = i
        break
      }
    }
    if (clickedElem.className === '') {
      console.log('없음')
      let copyElem = clickedElem.cloneNode(true)
      console.log(copyElem)
      let randomClass =
        clickedElem.parentElement.classList.value.replace(/ /gi, '') +
        clickedElem.classList.value.replace(/ /gi, '') +
        index
      copyElem.classList.add(randomClass)
      index++
      var copy = {
        work: 'copy',
        position: clickedElem.parentElement,
        elem: clickedElem,
        copyElem: copyElem,
        nth: nChild
      }
      // console.log(copy);
      $(clickedElem).after(copyElem)
      this.$emit('stack-push', copy)
    } else {
      console.log(clickedElem.classList.value)
      let elem = $('iframe')
        .get(0)
        .contentDocument.getElementsByClassName(clickedElem.classList.value)
      let i
      for (i = 0; i < elem.length; i++) {
        if (elem[i] === clickedElem) {
          console.log(i)
          break
        }
      }

      let copyElem = elem[i].cloneNode(true)

      let randomClass =
        elem[i].parentElement.classList.value.replace(/ /gi, '') +
        elem[i].classList.value.replace(/ /gi, '') +
        index
      copyElem.classList.add(randomClass)
      index++
      // console.log(clickedElem.parentElement.children);

      // var newparent = document.createElement("div");
      var copy = {
        work: 'copy',
        position: clickedElem.parentElement,
        elem: elem[i],
        copyElem: copyElem,
        nth: nChild
      }
      // console.log(copy);
      $(elem[i]).after(copyElem)
      this.$emit('stack-push', copy)
    }
    return index
  }
  moveElement(moveElem) {
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
          let move = {
            work: 'move',
            position: moveElem.parentElement,
            elem: moveElem,
            afterMovePosition: e.detail.target
          }
          // TODO stack push
          // this.$emit('stack-push', move)
          e.detail.target.parentElement.insertBefore(moveElem, e.detail.target)

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
