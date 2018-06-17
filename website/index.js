import Vue from 'vue'
import Docute from '../src'
import './css/style.css'

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
      this.text = this.text
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

const doc = new Docute({
  sourceRoot: '/docs/',
  title: 'Docute',
  routerMode: 'history',
  description: 'Effortlessly documentation done right.',
  nav: [
    {
      text: 'Guide',
      link: '/'
    },
    {
      text: 'API',
      link: '/api'
    }
  ],
  sidebar: [
    {
      text: 'Guide',
      children: [
        {
          text: 'Introduction',
          link: '/'
        },
        {
          text: 'Getting Started',
          link: '/guide/getting-started'
        },
        {
          text: 'Writing',
          link: '/guide/writing'
        },
        {
          text: 'Use Vue in Markdown',
          link: '/guide/use-vue-in-markdown'
        },
        {
          text: 'Deploying',
          link: '/guide/deploying'
        }
      ]
    },
    {
      text: 'API',
      link: '/api'
    }
  ],
  locales: {
    '/': {
      language: 'English',
      selectText: 'Languages'
    },
    '/zh/': {
      language: '中文',
      selectText: '选择语言',
      nav: [
        {
          text: '指南',
          link: '/zh/'
        },
        {
          text: 'API',
          link: '/zh/api'
        }
      ],
      sidebar: [
        {
          text: '指南',
          children: [
            {
              text: '概览',
              link: '/zh/'
            },
            {
              text: '快速上手',
              link: '/zh/guide/getting-started'
            },
            {
              text: '撰写',
              link: '/zh/guide/writing'
            },
            {
              text: '在 Markdown 中使用 Vue',
              link: '/zh/guide/use-vue-in-markdown'
            },
            {
              text: '部署',
              link: '/zh/guide/deploying'
            }
          ]
        },
        {
          text: 'API',
          link: '/zh/api'
        }
      ]
    }
  }
})

doc.start('#app')
