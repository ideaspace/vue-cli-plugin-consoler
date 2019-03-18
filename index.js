const COMMAND_OPTIONS = {
  '--mock': 'enables mocks',
  '--enable-engine': 'enables Apollo Engine',
  '--delay': 'delays run by a small duration',
  '-h, --host': 'specify server host',
  '-p, --port': 'specify server port',
  '--run [command]': 'run another command in parallel',
}

module.exports = (api, projectOptions) => {
  api.chainWebpack(config => {
    config.resolve
      .extensions
      .prepend('.ts')
  })
  api.registerCommand('apollo:watch', {
    description: 'Run the Apollo server and watch the sources to restart automatically',
    usage: 'vue-cli-service apollo:watch [options]',
    options: COMMAND_OPTIONS,
    details: 'For more info, see https://github.com/Akryum/vue-cli-plugin-apollo',
  }, args => {})
}
