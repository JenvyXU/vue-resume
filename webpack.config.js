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
        }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
            contentBase: './dist'
        },

    resolve:{

        alias:{
            'vue$': 'vue/dist/vue.esm.js', 
            css: path.join(__dirname,"src/css")
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
       // new webpack.ProvidePlugin({
           // VueRouter: 'vue-router'
       // })
        
        ]

}

