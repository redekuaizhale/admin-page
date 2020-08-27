const path = require('path')
const { BASE_URL, TITLE } = require('./src/config/config')
const { HashedModuleIdsPlugin } = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const TerserPlugin = require('terser-webpack-plugin')

const resolve = dir => {
  return path.join(__dirname, dir)
}
const isProduction = process.env.NODE_ENV === 'production'
// cdn预加载使用
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'axios': 'axios',
  'view-design': 'iview',
  'iview': 'ViewUI'
}
const cdn = {
  dev: {
    css: [],
    js: [
      'https://cdn.jsdelivr.net/npm/default-passive-events@2.0.0/dist/index.min.js'
    ]
  },
  build: {
    css: [],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.5.10/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/view-design@4.3.2/dist/iview.min.js',
      'https://cdn.jsdelivr.net/npm/default-passive-events@2.0.0/dist/index.min.js'
    ]
  }
}
module.exports = {
  publicPath: BASE_URL.PATH,
  outputDir: BASE_URL.OUT_PATH,
  lintOnSave: !isProduction,
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
    config.plugin('html').tap(args => {
      if (isProduction) {
        args[0].cdn = cdn.build
      } else {
        args[0].cdn = cdn.dev
      }
      args[0].title = TITLE
      return args
    })
    if (process.env.VUE_APP_ANALYSIS) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  configureWebpack: config => {
    const plugins = []
    if (isProduction) {
      // 用于根据模块的相对路径生成 hash 作为模块 id
      plugins.push(
        new HashedModuleIdsPlugin()
      )
      // build 进度条
      plugins.push(
        new ProgressBarPlugin({
          format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
          clear: false
        })
      )
      // gzip压缩,服务端nginx需要开启
      plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.(js|css)$/, // 匹配文件名
          threshold: 10000, // 对超过10M的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8 // 压缩比
        })
      )
      plugins.push(
        new TerserPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      )
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 1000 * 60,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
      // 取消webpack警告的性能提示
      config.performance = {
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 1000 * 500,
        // 生成文件的最大体积
        maxAssetSize: 1000 * 1000,
        // 只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
          return assetFilename.endsWith('.js')
        }
      }
      // 打包时npm包转CDN
      config.externals = externals
    }
    return { plugins }
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
    host: '0.0.0.0',
    port: 9527
  }
}
