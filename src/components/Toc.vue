<template>
  <ul class="sidebar-headings">
    <li
      class="sidebar-heading"
      :class="{'has-children': hasChildren(heading.index), visible: isVisible(heading.level, heading.parent)}"
      v-for="heading in headings"
      :data-level="heading.level">
      <router-link
        exact
        @click.native="navigate(heading.slug)"
        class="sidebar-heading-anchor"
        :class="{active: activeId === heading.slug}"
        :to="{query: getQuery(heading)}"
        v-html="heading.text.replace(/<(?:.|\n)*?>/gm, '')">
      </router-link>
    </li>
  </ul>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    props: {
      headings: {
        type: Array,
        required: true
      }
    },
    computed: {
      ...mapState(['activeId', 'config']),
      visibleBlockIndexes() {
        if (!this.activeId) {
          return []
        }
        const indexes = []

        const active = this.headings.filter(heading => {
          return this.activeId === heading.slug
        })[0]
        if (!active) {
          return []
        }
        indexes.push(active.index)

        const getParent = heading => {
          indexes.push(heading.parent)
          const parent = this.headings.filter(h => {
            return h.index === heading.parent
          })[0]
          if (parent) {
            getParent(parent)
          }
        }

        const parent = this.headings[active.index]
        if (parent) {
          getParent(parent)
        }

        return indexes.filter(i => i >= 0)
      }
    },
    methods: {
      ...mapActions(['jumpToId']),
      getQuery(heading) {
        return { ...this.$route.query, id: heading.slug }
      },
      hasChildren(index) {
        return this.headings.filter(heading => {
          return heading.parent === index
        }).length > 0
      },
      isVisible(level, index) {
        if (level <= (this.config.tocVisibleDepth || 4)) {
          return true
        }
        return this.visibleBlockIndexes.indexOf(index) !== -1
      },
      navigate(slug) {
        this.jumpToId(slug)
      }
    }
  }
</script>

<style>
  .sidebar-headings {
    list-style: none;
    margin: 0;
    margin-top: 10px;
    padding-left: 0;
    .sidebar-heading {
      line-height: 1.4;
      &:not(.visible) {
        display: none;
      }
      &[data-level="2"] {
        font-weight: bold;
        .sidebar-heading-anchor {
          color: #333;
        }
      }
      &[data-level="4"] {
        font-size: 13px;
        .sidebar-heading-anchor {
          padding-left: 35px;
        }
      }
      &[data-level="5"] {
        font-size: 13px;
        .sidebar-heading-anchor {
          padding-left: 50px;
        }
      }
      &[data-level="6"] {
        font-size: 12px;
        .sidebar-heading-anchor {
          padding-left: 66px;
        }
      }

      .sidebar-heading-anchor {
        color: #666;
        padding: 7px 20px;
        display: block;
        &.active, &:hover {
          color: #42b983;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .sidebar-headings {
      border-top: 1px solid #e2e2e2;
      padding-top: 10px;
    }
    .sidebar-heading-anchor {
      padding: 7px 10px !important;
    }
  }
</style>
