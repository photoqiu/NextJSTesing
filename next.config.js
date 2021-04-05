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
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        }
        return config
    }
}

module.exports = {
    future: {
        webpack5: true
    }
}

module.exports = {
    productionBrowserSourceMaps: true,
}

module.exports = {
    typescript: {
        ignoreBuildErrors: true
    }
}