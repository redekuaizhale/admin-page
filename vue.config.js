const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: 'admin-page',
  lintOnSave: process.env.NODE_ENV !== 'production',
  transpileDependencies: ['view-design'],
  chainWebpack: config => {
    config.plugins
      .delete('prefetch')
      .delete('preload')
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
    config.resolve
      .symlinks(true)
    if (process.env.VUE_APP_ANALYSIS) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  productionSourceMap: false,
  devServer: {
    port: 9527
  }
}
