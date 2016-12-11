<template>
  <ul class="sidebar-headings">
    <li
      class="sidebar-heading"
      v-for="heading in headings"
      :data-level="heading.level">
      <router-link
        exact
        class="sidebar-heading-anchor"
        :class="{active: active === heading.slug}"
        :to="{query: {id: heading.slug}}">
        {{ heading.text }}
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      headings: {
        type: Array,
        required: true
      },
      active: {
        required: true
      }
    }
  }
</script>

<style>
  .sidebar-headings {
    list-style: none;
    padding-left: 0;
    margin: 0;
    line-height: 1.7;
    .sidebar-heading {
      &[data-level="3"] {
        padding-left: 15px;
      }
      &[data-level="4"] {
        padding-left: 30px;
      }
      &[data-level="5"] {
        padding-left: 45px;
      }

      .sidebar-heading-anchor {
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
