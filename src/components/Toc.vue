<template>
  <ul class="sidebar-headings">
    <li
      class="sidebar-heading"
      :class="{'has-children': hasChildren(heading.index), visible: isVisible(heading.level, heading.parent)}"
      v-for="heading in headings"
      :data-level="heading.level">
      <router-link
        exact
        class="sidebar-heading-anchor"
        :class="{active: active === `${heading.slug}-${heading.index}`}"
        :to="{query: {id: heading.slug + '-' + heading.index}}">
        {{ heading.text }}
      </router-link>
    </li>
  </ul>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    props: {
      headings: {
        type: Array,
        required: true
      },
      active: {
        required: true
      }
    },
    computed: {
      ...mapState({
        id: state => state.route.query.id
      }),
      visibleBlockIndexes() {
        if (!this.active) return []
        const indexes = []

        const activeIndex = parseInt(this.active.match(/-([\d]+)$/)[1])
        indexes.push(activeIndex)

        const getParent = heading => {
          indexes.push(heading.parent)
          const parent = this.headings.filter(h => {
            return h.index === heading.parent
          })[0]
          if (parent) getParent(parent)
        }

        const parent = this.headings[activeIndex]
        if (parent) getParent(parent)

        return indexes.filter(i => i >= 0)
      }
    },
    methods: {
      hasChildren(index) {
        return this.headings.filter(heading => {
          return heading.parent === index
        }).length > 0
      },
      isVisible(level, index) {
        if (level <= 3) return true
        return this.visibleBlockIndexes.indexOf(index) !== -1
      }
    }
  }
</script>

<style>
  .sidebar-headings {
    list-style: none;
    padding-left: 0;
    margin: 0;
    .sidebar-heading {
      line-height: 1.4;
      margin-bottom: 3px;
      &:not(.visible) {
        display: none;
      }
      &[data-level="2"] {
        font-weight: bold;
        margin-bottom: 5px;
        &:not(:first-child) {
          margin-top: 5px;
          padding-top: 5px;
        }
        .sidebar-heading-anchor {
          color: #333;
        }
      }
      &[data-level="4"] {
        padding-left: 15px;
      }
      &[data-level="5"] {
        padding-left: 30px;
      }

      .sidebar-heading-anchor {
        color: #666;
        &.active {
          color: #42b983;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .sidebar-headings {
      border-top: 1px solid #e2e2e2;
      padding-top: 10px;
      margin-top: 10px;
    }
  }
</style>
