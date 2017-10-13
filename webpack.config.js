/**
 * 全局依赖
 *
 */
const path = require('path');
const webpack = require('webpack');
/**
 * 插件依赖
 *
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/**
 * 绝对路径
 *
 */
const getPath = (src) => {
    return path.resolve(__dirname, src)
};
/**
 * 环境监测
 *
 */
const env = process.env.NODE_ENV === 'production';
/**
 * 插件设置
 *
 */
let plugins = [
    // 自动生成html页面
    new HtmlWebpackPlugin({
        title: 'ReactApp',
        template: getPath('./src/index.html'),
    }),
    // 抽取css文件
    new ExtractTextPlugin({
        filename: env ? 'css/[contenthash:7]-[name].css' : 'css/[name].css',
        // 从所有额外的chunk提取
        allChunks: true
    }),
    // 提取公共代码
    new webpack.optimize.CommonsChunkPlugin({
        // 指定公共代码命名为vendor,使用manifest防止vendor的hash值改变,优化缓存
        names: ['vendor', 'manifest'],
        // 打包的公共模块不少于3个
        minChunks:3
    })
];
/**
 * 环境划分
 *
 */
if (env) {
    plugins.push(
        // 清理打包目录
        new CleanWebpackPlugin(['dist/*']),
        // 指定环境
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // 压缩代码
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑输出
            beautify: false,
            // 删除注释
            comments: false,
            // 关闭警告
            compress: {
                warnings: false
            }
        })
    )
}
/**
 * 虚拟服务器
 *
 */
const dev = {
    // 任意404响应返回主页面
    historyApiFallback: true,
    // 启用gzip压缩
    compress: true,
    // 主机号
    host: '127.0.0.1',
    // 端口号
    port: 8080,
    //// 反向代理
    // proxy: {
    //     "/api": {
    //         target: "http://restapi.amap.com/v3",
    //         pathRewrite: {"^/api" : ""}
    //     }
    // }
};
/**
 * 配置信息
 *
 */
module.exports = {

    // 虚拟服务器
    devServer: env ? {} : dev,

    // 入口设置
    entry: {
        // 入口文件
        index: [
            'babel-polyfill',
            'react-hot-loader/patch',
            getPath('./src/index.js')
        ],
        // 第三方包
        vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            'redux',
            'react-redux',
            'axios'
        ]
    },

    // 输出设置
    output: {
        // 输出目录
        path: getPath('./dist'),
        // 入口文件输出时命名规则
        filename: env ? 'js/[chunkhash:7]-[name].js' : 'js/[name].js',
        // 第三方文件输出时命名规则
        chunkFilename: env ? 'js/[chunkhash:7]-[name].js' : 'js/[name].js',
        // 服务器存储文件时引用的路径
        publicPath: '/'
    },

    // 解析设置
    module: {
        rules: [
            // 编译js文件
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // 缓存loader的执行结果，避免重新编译
                            cacheDirectory: true
                        }
                    }
                ],
                // 只对src目录下的文件进行编译
                include: getPath("./src"),
            },
            // 编译css文件
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: env ? {
                                // 对css文件进行压缩
                                minimize: true
                            } : {}
                        },
                        {
                            loader: 'postcss-loader',
                            // css自动补齐前缀
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-cssnext')(),
                                ]
                            }
                        }
                    ]
                })
            },
            // 编译图片文件
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 文件小于指定大小采用行内嵌入
                            name: 'images/[hash:7]-[name].[ext]',
                            limit: 8192
                        }
                    }
                ]
            },
            // 编译字体文件
            {
                test: /\.(woff|woff2|svg|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // 提取文件
                            name: 'fonts/[hash:7]-[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    // 插件设置
    plugins: plugins

};
