const webpack=require('webpack')
const path = require('path');
module.exports = {
    mode: 'development',
    entry:{  
            app: './src/js/root.js',
            //vendors: './src/vendors.js'
        } ,
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
        {
            test: /\.css$/,
            use: ['style-loader','css-loader']
        },
        {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
            contentBase: './dist',
            port: 9000
        },

    resolve:{

        alias:{
            'vue$': 'vue/dist/vue.esm.js', 
            css: path.join(__dirname,"src/css"),
            vendors: path.join(__dirname,"vendors"),
        }
    },
  
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
          }),
        new webpack.ProvidePlugin({
            Vue: ['vue', 'default']
        }),
        new webpack.ProvidePlugin({
            VueRouter: ['vue-router', 'default']
        }),
        new webpack.ProvidePlugin({
            AV: 'leancloud-storage/dist/av.js'
        }),
        ]

}

