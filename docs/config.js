var langs = [
  {title: 'English', path: '/'},
  {title: '简体中文', path: '/zh-Hans/'},
  {title: '繁體中文', path: '/zh-Hant/'},
  {title: '日本語', path: '/jp/'}
]

self.$config = {
  title: 'Docute',
  // home: 'https://raw.githubusercontent.com/egoist/docute/master/README.md',
  repo: 'egoist/docute',
  twitter: 'rem_rin_rin',
  url: 'https://docute.js.org',
  'edit-link': 'https://github.com/egoist/docute/blob/master/docs',
  nav: {
    default: [
      {
        title: 'Home', path: '/'
      },
      {
        title: 'Plugins', path: '/plugins'
      },
      {
        title: 'Command-Line Tool', path: '/cli'
      },
      {
        title: 'Languages', type: 'dropdown', items: langs
      }
    ],
    'zh-Hans': [
      {
        title: '首页', path: '/zh-Hans/'
      },
      {
        title: '插件', path: '/zh-Hans/plugins'
      },
      {
        title: '命令行工具', path: '/zh-Hans/cli'
      },
      {
        title: '选择语言', type: 'dropdown', items: langs
      }
    ],
    'zh-Hant': [
      {
        title: '首頁', path: '/zh-Hant/'
      },
      {
        title: '插件', path: '/zh-Hant/plugins'
      },
      {
        title: '命令行工具', path: '/zh-Hant/cli'
      },
      {
        title: '選擇語言', type: 'dropdown', items: langs
      }
    ]
  },
  icons: [
    {
      label: '关注我的微博',
      svgId: 'i-weibo',
      svgClass: 'weibo-icon',
      link: 'http://weibo.com/zengxinyu'
    }
  ],
  plugins: [
    docsearch({
      apiKey: '65360cf9a91d87cd455d2b286d0d89ee',
      indexName: 'docute',
      tags: ['english', 'zh-Hans', 'zh-Hant']
    })
  ]
}
