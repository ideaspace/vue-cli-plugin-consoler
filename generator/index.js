const fs = require('fs')
const path = require('path')
const globby = require('globby')
const rimraf = require('rimraf')
module.exports = (api, options, rootOptions) => {
  const helper = require('./../helper')(api)
  api.extendPackage({
    dependencies: {
      "axios": "^0.18.0",
      "date-fns": "^1.30.1",
      "element-ui": "^2.5.4",
      "js-cookie": "^2.2.0",
      "lodash": "^4.17.11",
      "vue-router": "^3.0.1",
      "vuex": "^3.0.1"
    },
    devDependencies: {
      "@types/js-cookie": "^2.2.1",
      "@types/lodash": "^4.14.121",
      "cookie-parser": "^1.4.4",
      "hygen": "^4.0.2",
      "jsonwebtoken": "^8.5.0",
      "node-sass": "^4.9.0",
      "sass-loader": "^7.1.0",
      "svg-sprite-loader": "^4.1.3"
    }
  })

  if (!helper.isUsedTs()) {
    api.extendPackage({
      dependencies: {
        "vue-class-component": "^6.0.0",
        "vue-property-decorator": "^7.0.0",
        "vuex-class": "^0.3.1"
      },
      devDependencies: {
        "@vue/cli-plugin-typescript": "^3.0.0",
        "typescript": "^3.0.0"
      }
    })
  }

  api.extendPackage({
    scripts: {
      "new:view": "hygen new view --name",
      "new:viewr": "hygen new viewr --name",
      "new:module": "hygen new module --name",
      "new:dialog": "hygen new dialog --name",
      "new:comp": "hygen new comp --name",
      "new:api": "hygen new api --name",
      "new:router": "hygen new router --name"
    }
  })

  // 选择主题
  if (options.choiceTheme) {
    //  TODO: add several theme
  }

  // 帮助文档链接
  if (options.helpLink) {
    api.render({
      './src/components/layout/Header.vue': './skeleton/default/src/components/layout/Header.vue'
    })
  }

  // 选择组件
  if (options.choiceComp && options.choiceComp.length) {
    options.choiceComp.forEach(comp => {
      const _files = globby.sync(['**/*'], {
        cwd: path.join(__dirname, `./skeleton/comps/${comp}`)
      });
      if (_files.length) {
        for (const rowPath of _files) {
          api.render({
            [`./src/components/${comp}/${rowPath}`]: `./skeleton/comps/${comp}/${rowPath}`
          })
        }
      }
    })
    options.table = options.choiceComp.includes('tableTree')
  }

  // 选择可视化图表
  if (options.choiceChart) {
    options.choiceChart === 'g2' ? api.extendPackage({
      dependencies: {
        "@antv/g2": "^3.4.8"
      }
    }) : api.extendPackage({
      dependencies: {
        "echarts": "^4.1.0"
      }
    })
  }

  api.render('./skeleton/default', {
    ...options
  })

  api.render('./tmpl', {
    ...options
  })

  api.render('./mock', {
    ...options
  })

  api.render({
    './src/app.config.ts': './config/app.ts',
    './vue.config.js': './config/vue.ts',
    './tsconfig.json': './config/tsconfig.json',
    './tslint.json': './config/tslint.json'
  })

  api.onCreateComplete(() => {
    // update .gitignore
    const gitignorePath = api.resolve('.gitignore')

    let content

    if (fs.existsSync(gitignorePath)) {
      content = fs.readFileSync(gitignorePath, { encoding: 'utf8' })
    } else {
      content = ''
    }

    if (content.indexOf('_templates/') === -1) {
      content += '\n_templates/\n'

      fs.writeFileSync(gitignorePath, content, { encoding: 'utf8' })
    }

    // remove the vue-cli default files
    const srcPath = api.resolve('src')
    const compPath = api.resolve('src/components')
    const viewPath = api.resolve('src/views')
    fs.readdirSync(srcPath).forEach(file => {
      if (/\.js$/.test(file)) {
        fs.unlinkSync(`${srcPath}/${file}`)
      }
    })
    fs.readdirSync(viewPath).forEach(file => {
      if (/\.vue$/.test(file)) {
        fs.unlinkSync(`${viewPath}/${file}`)
      }
    })
    fs.readdirSync(compPath).forEach(file => {
      if (/\.vue$/.test(file)) {
        fs.unlinkSync(`${compPath}/${file}`)
      }
    })

    // remove preset comps
    helper.presetComps().forEach(dir => {
      if (!options.choiceComp) {
        rimraf(`${compPath}/${dir}`, (r) => {})
      } else if (!options.choiceComp.includes(dir)) {
        rimraf(`${compPath}/${dir}`, (r) => {})
      }
    })

    // disable eslint and use tslint
    if (api.hasPlugin('eslint')) {
      const eslintPath = api.resolve('.eslintignore')
      fs.writeFileSync(eslintPath, '/src', { encoding: 'utf8' })
    }
  })
}
