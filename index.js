module.exports = (api) => {
  api.configureWebpack(webpackConfig => {
    configureWebpack: {
      name: require(api.resolve('./src/app.config.ts')).title
    }
  })
}
