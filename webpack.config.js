const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
module.exports={
    entry:[
        'babel-polyfill',
        './src/index.js',
        //config.entry.unshift("webpack-dev-server/client?http://localhost:2500/")
    ],
    mode:'development',
    devServer:{
        //contentBase: path.join(__dirname, "index.html"),
        port:2600,
        inline:true,
        watchContentBase: true
        
        
    },
    watch:true,
    module:{
        
        rules:[{
            test:/\.js$/,
            
            //include:path.resolve(__dirname+'/src'),
            exclude:/node_modules/,
            loader:'babel-loader',
            query: {
                 presets: ['@babel/preset-env']
                //presets: ['env']
            }
        },

        
    
        {
            test: /\.(scss)$/,
            use: [{
              loader: 'style-loader', // inject CSS to page
            }, {
              loader: 'css-loader', // translates CSS into CommonJS modules
            }, {
              loader: 'postcss-loader', // Run postcss actions
              options: {
                plugins: function () { // postcss plugins, can be exported to postcss.config.js
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }, {
              loader: 'sass-loader' // compiles Sass to CSS
            }]
        },

        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        
        

    ]},
    output:{
        filename:'index-bundle.js',
        path:__dirname+'/public'
    }
    // plugins:[
    //     new HtmlWebpackPlugin({
    //         template: path.resolve(__dirname, './src/index.html')
    //       })
    // ]
    // plugins:[HTMLWebpackPluginConfig]
};

// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
//     template:__dirname+'/src/index.html',
//     filename:'index.html'
// })

