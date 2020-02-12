const monacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  plugins: [
    new monacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['javascript', 'css', 'html', 'typescript']
    })
  ]
}
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'node_modules/monaco-editor/min/vs',
        to: 'vs'
      }
    ])
  ]
}
