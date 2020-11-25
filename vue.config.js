// 代理配置，只适用于开发环境
module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      //代理以/public开头的接口地址
      '/public': {
        target: 'http://127.0.0.1/heimamm', //后台接口域名 http://127.0.0.1/heimamm/public
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {}
      },
      '/fuck': {
        target: 'http://www.heimamm.com/',
        secure: false, //如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '/fuck':''//重写，不需要做拼接
        }
      }
    }
  }
}
