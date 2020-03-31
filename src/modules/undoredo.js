export class Work {
  constructor(htmlSrc, afterHtmlSrc) {
    this.htmlSrc = htmlSrc
    this.afterHtmlSrc = afterHtmlSrc
  }
  undoFunc(editor1) {
    editor1.setValue(this.htmlSrc.split('<style>')[0] + '</body>')
  }
  redoFunc() {}
}
