// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    //assetsPublicPath: 'E:/depot/pro1/dev/front/admin/lxb-admin/dist/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 80,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/apis': {
            //  target: 'http://161o459r59.iok.la',
            // target: 'http://192.168.2.226:8085',
            // target: 'http://192.168.1.31:8001',
            target: 'http://192.168.2.171:8085',
            // target: 'http://192.168.2.157:8085',
            // target: 'http://192.168.1.38:8093',
            // target: 'http://192.168.2.127:8085',  // 接口域名
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/apis': ''   //需要rewrite重写的,
            }              
        },
        '/mock': {
            target: 'http://192.168.1.11:20000/mockjsdata/65',
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/mock': ''   //需要rewrite重写的,
            }              
        },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  test: {
    env: require('./test.env'),
    port: 8080,
    autoOpenBrowser: false
  }
}
