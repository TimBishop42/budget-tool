// const webpack = require('webpack');
//
// module.exports = {
//     // entry: './src/index.js',
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 use: ['babel-loader']
//             },
//             {
//                 test: /\.(gif|svg|jpg|png)$/,
//                 use: [
//                     {
//                         loader: "url-loader",
//                         options: {
//                             limit: 4096
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader']
//             },
//             {
//                 test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
//                 use: [
//                     {
//                         loader: 'file-loader',
//                         options: {
//                             name: '[name].[ext]',
//                             outputPath: 'fonts/'
//                         }
//                     }
//                     ]
//             }
//         ]
//     },
//     // resolve: {
//     //     extensions: ['*', '.js', '.jsx']
//     // },
//     // output: {
//     //     path: __dirname + 'public',
//     //     publicPath: '/public/',
//     //     filename: 'bundle.js'
//     // },
//     plugins: [
//       'react-hot-loader/babel',
//       'transform-decorators-legacy',
//       [
//         'transform-class-properties', { loose: true, },
//       ],
//     ],
//     // devServer: {
//     //     contentBase: './public',
//     //     historyApiFallback: true,
//     //     hot: true
//     // }
// };