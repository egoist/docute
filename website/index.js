import googleAnalytics from '@leptosia/docute-google-analytics'
import Docute from '../src'

new Docute({
  target: 'app',
  text: 'Docute',
  highlight: ['typescript'],
  plugins: [
    process.env.NODE_ENV === 'production' && googleAnalytics('UA-54857209-11')
  ].filter(Boolean),
  editLinkBase: 'https://github.com/leptosia/docute/tree/master/website/docs',
  editLinkText: 'Edit this page on GitHub',
  // versions: {
  //   v4: {
  //     link: '/'
  //   },
  //   v3: {
  //     link: 'https://v3.docute.org'
  //   }
  // },
  nav: [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'GitHub',
      link: 'https://github.com/leptosia/docute'
    },
    {
      type: 'languages'
    }
  ],
  sidebar: [
    {
      text: 'Guide',
      links: [
        {
          text: 'Writing',
          link: '/guide/writing'
        },
        {
          text: 'Use Vue in Markdown',
          link: '/guide/use-vue-in-markdown'
        },
        {
          text: 'Internationalization',
          link: '/guide/internationalization'
        },
        {
          text: 'Customization',
          link: '/guide/customization'
        },
        {
          text: 'Plugin',
          link: '/guide/plugin'
        },
        {
          text: 'Deployment',
          link: '/guide/deployment'
        }
      ]
    },
    {
      text: 'References',
      links: [
        {
          text: 'Options',
          link: '/options'
        },
        {
          text: 'Built-in Components',
          link: '/builtin-components'
        },
        {
          text: 'Plugin API',
          link: '/plugin-api'
        }
      ]
    }
  ],
  overrides: {
    '/': {
      language: 'English',
      chooseLanguageText: 'Languages'
    },
    '/zh/': {
      language: 'Chinese',
      chooseLanguageText: '切换语言',
      editLinkText: '在 GitHub 上编辑此页',
      sidebar: [
        {
          text: '指南',
          links: [
            {
              text: '撰写',
              link: '/zh/guide/writing'
            },
            {
              text: '在 Vue 中使用 Markdown',
              link: '/zh/guide/use-vue-in-markdown'
            },
            {
              text: '国际化',
              link: '/zh/guide/internationalization'
            },
            {
              text: '自定义',
              link: '/zh/guide/customization'
            },
            {
              text: '插件',
              link: '/zh/guide/plugin'
            },
            {
              text: '部署',
              link: '/zh/guide/deployment'
            }
          ]
        },
        {
          text: '参考',
          links: [
            {
              text: '配置项',
              link: '/zh/options'
            },
            {
              text: '内置组件',
              link: '/zh/builtin-components'
            },
            {
              text: '插件 API',
              link: '/zh/plugin-api'
            }
          ]
        }
      ],
      nav: [
        {
          text: '首页',
          link: '/zh/'
        },
        {
          text: 'GitHub',
          link: 'https://github.com/leptosia/docute'
        },
        {
          type: 'languages'
        }
      ],
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
