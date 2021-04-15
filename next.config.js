/*
 * @Author: ext.qiubo
 * @Date: 2021-04-06 08:31:28
 * @LastEditTime: 2021-04-15 14:08:44
 * @LastEditors: ext.qiubo
 * @FilePath: \NextJSTesing\next.config.js
 * @version: 
 */
const withLess = require('@zeit/next-less')

module.exports = withLess({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]"
    }
})

module.exports = {
    webpack: config => {
        config.node = {
            fs: 'empty'
        }
        return config
    },
    // future: {
    //     webpack5: true
    // },
    productionBrowserSourceMaps: true,
    typescript: {
        ignoreBuildErrors: true
    }
}