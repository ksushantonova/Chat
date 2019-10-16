const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

 module.exports = {
  entry: {
      app: './public/chat/app.js',
    },
    devtool: 'inline-source-map',
     devServer: {
    contentBase: './'
   },
    module: {
    rules: [
     {
       exclude: /node_modules/,
       test: /\.vue$/,
       loader: 'vue-loader'
     }
   ]
 },  
 plugins: [
  new VueLoaderPlugin()
],
  output: {
      filename: 'app.bundle.js',
      path: path.resolve(__dirname, 'public/chat')

    }
};