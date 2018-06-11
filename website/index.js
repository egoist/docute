import Vue from 'vue'
import Docute from '../src'

Vue.component('ReverseText', {
  data() {
    return {
      text: 'hello world'
    }
  },
  template: `
    <div class="reverse-text">
    {{ text }} <button @click="reverse">Reverse</button>
    </div>
  `,
  methods: {
    reverse() {
      this.text = this.text.split('').reverse().join('')
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

const doc = new Docute({
  sourceRoot: '/docs/',
  title: 'Docute',
  routerMode: 'history',
  description: 'Effortlessly documentation done right.',
  nav: [
    {
      title: 'Guide',
      link: '/'
    },
    {
      title: 'API',
      link: '/api'
    },
    {
      title: 'GitHub',
      link: 'https://github.com/egoist/docute'
    }
  ],
  sidebar: [
    {
      title: 'Guide',
      children: [
        {
          title: 'Introduction',
          link: '/'
        },
        {
          title: 'Getting Started',
          link: '/getting-started'
        },
        {
          title: 'Writing',
          link: '/writing'
        },
        {
          title: 'Use Vue in Markdown',
          link: '/use-vue-in-markdown'
        }
      ]
    },
    {
      title: 'API',
      link: '/api'
    }
  ]
})

doc.start('#app')
