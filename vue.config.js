module.exports = {
    publicPath: "/vue_shop2/",
    //关闭eslint
    lintOnSave: false,
    //跨域代理
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                //pathRewrite: {'^/api': ''},
            },
        },
    },
}