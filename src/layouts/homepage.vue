<template>
  <div>
    <site-header />
    <div class="main">
      <div class="project">
        <div class="container">
          <div class="title">{{ source.title || site.title }}</div>
        <div class="subtitle">{{ source.subtitle || site.description }}</div>
        <div class="buttons">
          <router-link class="button has-animation" :to="source.getStarted || '/get-started'">Get Started <arrow-right-icon class="icon" /></router-link>
        </div>
        </div>
      </div>
      <div class="features" v-if="source.features">
        <div class="container">
          <div
            class="feature"
            v-for="(feature, index) in source.features"
            :key="index">
            <div class="title">{{ feature.title }}</div>
            <component :is="handleDescription(feature.description)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { ArrowRightIcon } from 'vue-feather-icons'
import SiteHeader from '@/components/Header/index.vue'
import createStoreMixin from '@/utils/createStoreMixin'

const storeMixin = createStoreMixin({
  state: {
    site: state => ({...state.config.site}),
  }
})

export default {
  props: {
    source: {
      type: Object,
      required: true
    }
  },

  mixins: [storeMixin],

  methods: {
    handleDescription(desc) {
      const content = Array.isArray(desc) ? desc.map(v => `<p>${v}</p>`).join('') : `<p>${desc}</p>`
      const template = `<div class="description">${content}</div>`
      return {
        name: 'FeatureDescription',
        ...Vue.compile(template)
      }
    }
  },

  components: {
    SiteHeader,
    ArrowRightIcon
  }
}
</script>

<style scoped>
@import "vars.css";

.main {
  padding: var(--header-height) 0;
}

.project {
  padding: 80px 0;
  text-align: center;
  background-color: var(--banner-bg);

  & .title {
    font-size: 3.3rem;
    font-weight: 700;
    color: var(--primary-color);
  }

  & .subtitle {
    font-size: 2rem;
    color: var(--banner-color);
    font-weight: 200;
    margin-top: 10px;
  }

  & .buttons {
    margin-top: 50px;
  }
}

.features {
  margin-top: 70px;

  & .container {
    display: flex;
  }

  & .feature {
    flex: 0 1 33%;
    padding-right: 40px;

    & .title {
      font-size: 1.3rem;
      color: #6d6d6d;
      font-weight: 300;
    }

    & .description {
      color: var(--black);
      font-size: 1.1rem;

      & >>> p {
        line-height: 1.7;
        margin: 30px 0 0 0;
        &:first-child {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
