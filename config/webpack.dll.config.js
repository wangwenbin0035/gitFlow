const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const vendor = ['react', 'react-dom']; // 可扩展
const { npm_config_argv } = process.env;
const isDevelopment = npm_config_argv.includes('start'); //是否生产环境
const filename = isDevelopment ? 'development' : 'production';
if (isDevelopment) {
  vendor.push('antd');
}
module.exports = {
  entry: {
    vendor: vendor
  },
  output: {
    path: path.join(__dirname, '../public/lib'),
    filename: `react.${filename}.min.js,react-dom.${filename}.min.[name].dll.js`,
    library: '[name]_library'
  },
  context: paths.appSrc,
  resolve: {
    alias: {
      '@': path.join(__dirname, '.', 'src'),
    }
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../public', `[name]-manifest.${filename}.json`),
      name: '[name]_library'
    })
  ]
};