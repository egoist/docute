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
        }
      ]
    }
  ]
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
      return this.text.split('').reverse().join('')
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
