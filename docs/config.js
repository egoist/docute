var langs = [
  {title: 'English', path: '/'},
  {title: '简体中文', path: '/languages/zh-Hans'},
  {title: 'Japanese', path: '/languages/jp'}
]

self.$config = {
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
    ]
  }
}
