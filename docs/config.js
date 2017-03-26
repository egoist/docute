var langs = [
  {title: 'English', path: '/home', matchPath: /^\/(home|plugin|cli|changelog)/},
  {title: '简体中文', path: '/zh-Hans/', matchPath: /^\/zh-Hans/},
  {title: '繁體中文', path: '/zh-Hant/', matchPath: /^\/zh-Hant/},
  {title: '日本語', path: '/ja/', matchPath: /^\/ja/}
]

docute.init({
  // landing: 'landing.html',
  debug: false,
  // home: 'https://raw.githubusercontent.com/egoist/docute/master/README.md',
  // repo: 'egoist/docute',
  // twitter: 'rem_rin_rin',
  // 'edit-link': 'https://github.com/egoist/docute/blob/master/docs',
  nav: {
    default: [
      {
        title: '首页', path: '/home'
      },
      {
        title: '常用代码', path: '/常用代码'
      },
      // {
      //   title: 'Command-Line Tool', path: '/cli'
      // },
      // {
      //   title: 'Changelog', path: '/changelog', source: 'https://raw.githubusercontent.com/egoist/docute/master/CHANGELOG.md'
      // },
      // {
      //   title: 'Languages', type: 'dropdown', items: langs
      // }
    ],
    // 'zh-Hans': [
    //   {
    //     title: '首页', path: '/zh-Hans/'
    //   },
    //   {
    //     title: '插件', path: '/zh-Hans/plugins'
    //   },
    //   {
    //     title: '命令行工具', path: '/zh-Hans/cli'
    //   },
    //   {
    //     title: '选择语言', type: 'dropdown', items: langs
    //   }
    // ],
    // 'zh-Hant': [
    //   {
    //     title: '首頁', path: '/zh-Hant/'
    //   },
    //   {
    //     title: '插件', path: '/zh-Hant/plugins'
    //   },
    //   {
    //     title: '命令行工具', path: '/zh-Hant/cli'
    //   },
    //   {
    //     title: '選擇語言', type: 'dropdown', items: langs
    //   }
    // ],
    // 'ja': [
    //   {
    //     title: 'はじめに', path: '/ja/'
    //   },
    //   {
    //     title: 'プラグイン', path: '/ja/plugins'
    //   },
    //   {
    //     title: 'コマンドラインツール', path: '/ja/cli'
    //   },
    //   {
    //     title: '言語', type: 'dropdown', items: langs
    //   }
    // ]
  },
  plugins: [
  ]
})
