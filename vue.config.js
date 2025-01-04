module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? "" : "/",
    // devServer: { 
    //     host: 'localhost',
    //     port: 8082,
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api': ''
    //             }
    //         }
    //     }     
    // }
}