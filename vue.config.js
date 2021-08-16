module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views'
      }
    },
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://152.136.185.210:5000',
          pathRewrite: {
            '^/api': ''
          },
          changeOrigin: true
        }
      }
    }
  }
}
