const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'numberbaseball-setting',
    mode: 'development',    //실서비스에서는 production으로
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']     //이걸 쓰면 entry에 확장자 안 써도 알아서 확장자 찾아 줌.
    },

    //client랑 WordRelay를 합쳐서 app.js로 만들어 줌.
    entry: {
        app: ['./client']    //이때 client에서 이미 WordRelay를 불러오고 있으므로 굳이 안 넣어줘도 됨.
    },  //입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR'],
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ],
            },
        }],
    },

    plugins: [
        new RefreshWebpackPlugin(),
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
    },  //출력

    devServer: {
        publicPath: '/dist/',
        hot: true,
    },

};