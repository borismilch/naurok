const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimezeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isDev= process.env.NODE_ENV === 'development';
console.log(isDev)
const filename = ext=> isDev? `[name].${ext}` : `[name].[hash].${ext}`;
const optimization = ()=>{
    const config = {
        splitChunks:{
            chunks:'all'
        }
    }
    if(!isDev){
        config.minimizer = [
            new OptimezeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode:'development',
    entry : {
        main:['@babel/polyfill','./index.js'],
        analytics : './auth'
    },
    output : {
       filename: filename('js'),
        path: path.resolve(__dirname, 'public')
    },
    resolve:{
     extensions : ['.js', '.json', '.jpg', '.png'],
     alias:{
         '@assets' : path.resolve(__dirname, 'src/assets')
     }
    },
    optimization : optimization(),

    devServer: {
        publicPath: "/",
        contentBase: "./public",
        hot: isDev
    },
    
    plugins:[
        new HTMLWebpackPlugin({
            title: 'webApp',
            filename: 'main.html',
            template: './main.html',
            minify:{
                collapseWhitespace: !isDev
            }
        }),
        new HTMLWebpackPlugin({
            title: 'webpp',
            filename:   'index.html',
            template: './auth.html'
        }),
        new HTMLWebpackPlugin({
            title: 'reg',
            filename:'register.html',
            template: './register.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
            {from : path.resolve(__dirname, 'src/favicon.ico'), to : path.resolve(__dirname, 'public')},
        ]}),
        new MiniCssExtractPlugin({
            filename : filename('css'),
        }),
        new VueLoaderPlugin()
          
    ],
    module:{
        rules:[
          {
            test :/\.css$/,
             use:[MiniCssExtractPlugin.loader,'css-loader']
          },
          {
            test: /\.(sass|scss)$/i,
            use:[{
            loader : MiniCssExtractPlugin.loader,
           
        },
        'css-loader',
        'sass-loader'
            ]},
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
              {
                loader: 'file-loader',
                options : {
                    hmr:isDev,
                }
          },
        ],
    },{
    test: /\.(ttf|woff|woff2|eot)$/i,
    use: [
      {
        loader: 'file-loader', }]
    },
    {
    test: /\.xml$/i,
    use: ['xml-loader']
    },
    {
    test: /\.csv$/i,
    use: ['csv-loader']
    },
    {
    test: /\.m?js$/,
     exclude: /node_modules/,
     use: {
        loader: 'babel-loader',
      options: {
      presets: ['@babel/preset-env'],
      plugins:['@babel/plugin-proposal-class-properties',]},
     }},
     {
    test: /\.ts$/,
     exclude: /node_modules/,
     use: {
      loader: "babel-loader",
      options: {
      presets: ['@babel/preset-env','@babel/preset-typescript'],
      plugins:['@babel/plugin-proposal-class-properties',]},
         }},
      {
       test: /\.vue$/,
       loader: 'vue-loader'
       
      },
       
    ]}
    }