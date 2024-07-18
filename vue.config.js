// 代理配置，只适用于开发环境
module.exports = {
  publicPath: './',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/user': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/aweme': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/comment': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/group': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/followerList': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/getImageList': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/delImageList': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/followingList': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/auth': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/browserConf': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/groupUser': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/download': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/resource': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/dataStatic': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/downloadList': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/downloadDel': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/uploads': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/addTask': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/getTask': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/zipData': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/downExcel': {
        target: 'http://localhost:3056/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      }
    }
  }
}
