const path = require('path')
const globby = require('globby')
module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      "axios": "^0.18.0",
      "date-fns": "^1.30.1",
      "element-ui": "^2.5.4",
      "js-cookie": "^2.2.0",
      "lodash": "^4.17.11",
      "vuex-class": "^0.3.1"
    },
    devDependencies: {
      "@types/js-cookie": "^2.2.1",
      "@types/lodash": "^4.14.121",
      "cookie-parser": "^1.4.4",
      "hygen": "^4.0.2",
      "jsonwebtoken": "^8.5.0",
      "svg-sprite-loader": "^4.1.3",
      "typescript": "^3.0.0",
    }
  })

  api.render('./skeleton/default', {
    ...options
  })

  api.render('./tmpl')

  api.render('./mock', {
    ...options
  })


  // 选择主题
  if (options.choiceTheme) {}

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

  api.render({
    './src/app.config.ts': './skeleton/config/app.ts'
  })

  api.onCreateComplete(() => {
    api.exitLog('hello world')
  })
}
