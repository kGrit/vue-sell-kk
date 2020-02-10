// const path = require('path')
module.exports = {
  configureWebpack: {
    devServer: {
      port: 8080,
      open: true
      // host: '192.168.1.3'
    },
    resolve: {
      alias: {
        'com': '@/components'
        // 'components': path.resolve(__dirname, '../../src/components')
      }
    }
  }
}
