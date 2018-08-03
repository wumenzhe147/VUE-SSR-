const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const isProd = process.env.NODE_ENV === 'production'
const CopyWebpackPlugin = require('copy-webpack-plugin');
let plugins = isProd
    ? [
        new VueLoaderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        
       
      ]
    : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin(),
        
      ]
plugins.push(new CopyWebpackPlugin([
        { from: 'src/assets', to: './assets' },
      ],
        { ignore: [ 'mock-data/**/*' ] }
      ))
plugins.push(new ExtractTextPlugin({
           filename: path.posix.join('css','base[name][contenthash].css'),
}))
module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: path.posix.join('js','[name].js?[hash]'),
    chunkFilename: path.posix.join('js','[id].[chunkhash].js')
  },
  resolve: {
    extensions: ['*','.js', '.jsx','.vue', '.json'], //后缀名自动补全

  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
       {
        test: /\.css$/,
        exclude: /^node_modules$/,
        use:ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{loader:"css-loader",
               options:{
                    minimize: true //css压缩
               }}]
        })
          //use:["style-loader","css-loader"]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /^node_modules$/,
        use:[{loader:'url-loader', query:{
            limit:1000,
            name:path.posix.join('images','[name]?[hash].[ext]')
        }}],
          //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
      },
      {
          test: /\.scss$/,
          exclude: /^node_modules$/,
          use:["vue-style-loader","css-loader","postcss-loader","sass-loader",{
          loader: 'sass-resources-loader',
          options: {
            resources:path.resolve(__dirname, '../src/scss/common.scss')
          },
        },
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: { minimize: true }
                },
                'stylus-loader'
              ],
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(swf|eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        exclude: /^node_modules$/,
        use: [{loader:'file-loader',query:{
            name:path.posix.join('./assets/font','[name].[ext]')
        }}]
                
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: plugins
}
