import Docute from '../src'

new Docute({
  target: '#app',
  title: 'Docute',
  highlight: ['typescript'],
  editLinkBase: 'https://github.com/leptosia/docute/tree/master/website/docs',
  editLinkText: 'Edit this page on GitHub',
  nav: [
    {
      links: [
        {
          title: 'Home',
          link: '/',
          toc: false
        },
        {
          title: 'GitHub',
          link: 'https://github.com/leptosia/docute'
        }
      ]
    },
    {
      title: 'Guide',
      links: [
        {
          title: 'Writing',
          link: '/guide/writing'
        },
        {
          title: 'Use Vue in Markdown',
          link: '/guide/use-vue-in-markdown'
        },
        {
          title: 'Internationalization',
          link: '/guide/internationalization'
        },
        {
          title: 'Plugin',
          link: '/guide/plugin'
        },
        {
          title: 'Deployment',
          link: '/guide/deployment'
        }
      ]
    },
    {
      title: 'References',
      links: [
        {
          title: 'Options',
          link: '/options'
        },
        {
          title: 'Built-in Components',
          link: '/builtin-components'
        },
        {
          title: 'Plugin API',
          link: '/plugin-api'
        }
      ]
    }
  ],
  locales: {
    '/': {
      language: 'English'
    },
    '/zh/': {
      language: 'Chinese',
      editLinkText: '在 GitHub 上编辑此页',
      nav: [
        {
          links: [
            {
              title: '首页',
              link: '/zh/',
              toc: false
            },
            {
              title: 'GitHub',
              link: 'https://github.com/leptosia/docute'
            }
          ]
        },
        {
          title: '指南',
          links: [
            {
              title: '撰写',
              link: '/zh/guide/writing'
            },
            {
              title: '在 Vue 中使用 Markdown',
              link: '/zh/guide/use-vue-in-markdown'
            },
            {
              title: '部署',
              link: '/zh/guide/deployment'
            }
          ]
        },
        {
          title: '参考',
          links: [
            {
              title: '配置项',
              link: '/zh/options'
            },
            {
              title: '内置组件',
              link: '/zh/builtin-components'
            }
          ]
        }
      ]
    }
  }
})

Vue.component('ReverseText', {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  template: `
    <div class="reverse-text">
      {{ reversedText }}
    </div>
  `,
  computed: {
    reversedText() {
      return this.text
        .split('')
        .reverse()
        .join('')
    }
  },
  css: `
    .reverse-text {
      border: 1px solid var(--border-color);
      padding: 20px;
      font-weight: bold;
      border-radius: 4px;
    }
  `
})
