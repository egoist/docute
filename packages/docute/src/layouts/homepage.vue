<template>
  <div>
    <site-header />
    <div class="main">
      <div class="project">
        <div class="container">
          <div class="title">{{ source.title }}</div>
        <div class="subtitle">{{ source.subtitle }}</div>
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
            <div class="description" v-html="feature.description"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowRightIcon } from 'vue-feather-icons'
import SiteHeader from '@/components/Header'

export default {
  props: {
    source: {
      type: Object,
      required: true
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

.container {
  max-width: 980px;
  margin: 0 auto;
}

.project {
  padding: 30px 0;
  text-align: center;

  & .title {
    font-size: 3rem;
    color: var(--primary-color);
  }

  & .subtitle {
    font-size: 2rem;
  }

  & .buttons {
    margin-top: 50px;
  }
}

.features {
  margin-top: 40px;

  & .container {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  & .feature {
    width: 33%;
    padding: 0 10px;

    & .title {
      font-size: 1.4rem;
      color: var(--primary-color);
    }

    & .description {
      margin-top: 10px;
      color: #7f8c8d
    }
  }
}
</style>
