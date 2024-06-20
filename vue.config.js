// 代理配置，只适用于开发环境
module.exports = {
    publicPath: './',
    lintOnSave: false,
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
  