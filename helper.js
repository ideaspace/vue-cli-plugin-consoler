const fs = require('fs')
module.exports = (api) => {
  return {
    isUsedTs() {
      const tsPath = api.resolve('src/main.ts')
      return fs.existsSync(tsPath)
    },
    presetComps() {
      return ['tableTree', 'count']
    }
  }
}
