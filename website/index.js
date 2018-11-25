import googleAnalytics from '@leptosia/docute-google-analytics'
import Docute from '../src'
import prismLanguages from '../src/utils/prismLanguages'

new Docute({
  target: 'app',
  title: 'Docute',
  highlight: ['typescript', 'bash'],
  plugins: [
    process.env.NODE_ENV === 'production' && googleAnalytics('UA-54857209-11')
  ].filter(Boolean),
  editLinkBase: 'https://github.com/leptosia/docute/tree/master/website/docs',
  editLinkText: 'Edit this page on GitHub',
  componentMixins: [
    {
      data() {
        return {
          builtinLanguages: prismLanguages.builtin,
          deps: __DEPS__
        }
      }
    }
  ],
  versions: {
    'v4 (Latest)': {
      link: '/'
    },
    v3: {
      link: 'https://v3.docute.org'
    }
  },
  nav: [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'GitHub',
      link: 'https://github.com/leptosia/docute'
    }
  ],
  sidebar: [
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
          title: 'Customization',
          link: '/guide/customization'
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
      title: 'Advanced',
      links: [
        {
          title: 'Use With Bundlers',
          link: '/guide/use-with-bundlers'
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
    },
    {
      title: 'Misc',
      links: [
        {
          title: 'Credits',
          link: '/credits'
        }
      ]
    }
  ],
  overrides: {
    '/': {
      language: 'English'
    },
    '/zh/': {
      language: 'Chinese',
      editLinkText: '在 GitHub 上编辑此页',
      nav: [
        {
          title: '首页',
          link: '/zh/'
        },
        {
          title: 'GitHub',
          link: 'https://github.com/leptosia/docute'
        }
      ],
      sidebar: [
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
              title: '国际化',
              link: '/zh/guide/internationalization'
            },
            {
              title: '自定义',
              link: '/zh/guide/customization'
            },
            {
              title: '插件',
              link: '/zh/guide/plugin'
            },
            {
              title: '部署',
              link: '/zh/guide/deployment'
            }
          ]
        },
        {
          title: '进阶',
          links: [
            {
              title: '使用打包工具',
              link: '/zh/guide/use-with-bundlers'
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
            },
            {
              title: '插件 API',
              link: '/zh/plugin-api'
            }
          ]
        },
        {
          title: '其它',
          links: [
            {
              title: '致谢',
              link: '/zh/credits'
            }
          ]
        }
      ]
    }
  },
  pageData: () => fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => {
      return posts.reduce((result, post) => {
        result['/post/' + post.id] = {
          title: post.title,
          content: post.body
        }
        return result
      }, {})
    })
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
      <v-style>
      .reverse-text {
        border: 1px solid var(--border-color);
        padding: 20px;
        font-weight: bold;
        border-radius: 4px;
      }
      </v-style>
    </div>
  `,
  computed: {
    reversedText() {
      return this.text
        .split('')
        .reverse()
        .join('')
    }
  }
})
