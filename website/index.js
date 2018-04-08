import Docute from 'docute'

const doc = new Docute({
  routerMode: 'history',
  site: {
    title: 'Docute',
    description: 'Effortlessly documentation done right'
  },
  docs: [
    {
      title: 'Essentials',
      children: [
        {
          title: 'Installation',
          path: '/docs/essentials/installation'
        },
        {
          title: 'The Docute Instance',
          path: '/docs/essentials/the-docute-instance'
        },
        {
          title: 'Add Docs',
          path: '/docs/essentials/add-docs'
        },
        {
          title: 'Add Homepage',
          path: '/docs/essentials/add-homepage'
        },
        {
          title: 'Front-Matter',
          path: '/docs/essentials/front-matter'
        }
      ]
    },
    {
      title: 'Advanced',
      children: [
        {
          title: 'Layouts',
          path: '/docs/advanced/layouts'
        },
        {
          title: 'Using Vue Component',
          path: '/docs/advanced/using-vue-component'
        },
        {
          title: 'Markdown Features',
          path: '/docs/advanced/markdown-features'
        }
      ]
    }
  ],
  nav: [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'Docs',
      path: '/docs/essentials/installation'
    }
  ],
  source: {
    '/not-exists': {
      title: 'hahha',
      content: 'this is great'
    }
  }
})

doc.start('#app')
