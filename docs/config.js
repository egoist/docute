var langs = [
  {title: 'English', path: '/'},
  {title: '简体中文', path: '/languages/zh-Hans'},
  {title: '繁體中文', path: '/languages/zh-Hant'},
  {title: 'Japanese', path: '/languages/jp'}
]

self.$config = {
  title: 'Docute',
  repo: 'egoist/docute',
  twitter: 'rem_rin_rin',
  'edit-link': 'https://github.com/egoist/docute/blob/master/docs',
  nav: {
    default: [
      {
        title: 'Home', path: '/'
      },
      {
        title: 'Languages', type: 'dropdown', items: langs
      }
    ],
    'zh-Hans': [
      {
        title: '首页', path: '/languages/zh-Hans'
      },
      {
        title: '选择语言', type: 'dropdown', items: langs
      }
    ],
    'zh-Hant': [
      {
        title: '首頁', path: '/languages/zh-Hant'
      },
      {
        title: '選擇語言', type: 'dropdown', items: langs
      }
    ]
  }
}
