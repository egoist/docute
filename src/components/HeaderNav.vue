<template>
  <div class="HeaderNav">
    <div class="NavItems">
      <div class="NavItemWrap" v-for="(item, index) in nav" :key="index">
        <div
          class="NavItem is-drodown"
          v-if="item.children">
          <div class="NavDropdownText">
            {{ getText(item) }}
          </div>
          <div class="NavDropdownItems">
            <div
              class="NavDropdownItem"
              v-for="(child, index) in item.children"
              :key="index">
              <a
                target="_blank"
                class="NavDropdownLink"
                v-if="isExternalLink(child.link)"
                :href="child.link">
                {{ getText(child) }}
              </a>
              <router-link
                class="NavDropdownLink"
                v-else-if="child.text"
                :to="child.link">
                {{ getText(child) }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="NavItem" v-else-if="item.link">
          <a
            target="_blank"
            class="NavLink"
            v-if="isExternalLink(item.link)"
            :href="item.link">
            {{ getText(item) }} <ExternalLinkIcon />
          </a>
          <router-link
            v-else
            class="NavLink"
            :to="item.link">
            {{ getText(item) }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isExternalLink} from '../utils'

export default {
  computed: {
    nav() {
      const {languageOverrides, currentLocalePath, config} = this.$store.getters
      const languages = Object.keys(languageOverrides).map(path => ({
        link: path,
        text: languageOverrides[path].language
      }))
      return this.$store.getters.config.nav.map(item => {
        if (item.type === 'languages') {
          const res = {
            text(item) {
              if (config.chooseLanguageText) {
                return config.chooseLanguageText
              }
              const matched = item.children.filter(
                child => child.link === currentLocalePath
              )[0]
              return matched && matched.text
            },
            children: languages
          }
          return res
        }
        return item
      })
    }
  },

  methods: {
    isExternalLink,

    getText(item) {
      return typeof item.text === 'function'
        ? item.text.call(this, item)
        : item.text
    }
  }
}
</script>

<style scoped>
@import 'vars.css';

.HeaderNav {
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  line-height: var(--header-height);

  & a {
    text-decoration: none;
    color: var(--text-color);
  }
}

.NavItems {
  display: flex;
}

.NavItemWrap {
  margin-left: 20px;
}

.NavItem {
  color: var(--text-color);
  text-decoration: none;
  position: relative;

  &:hover {
    & .NavDropdownItems {
      display: block;
    }
  }
}

.NavLink {
  display: block;
  height: 100%;
  border-bottom: 1px solid transparent;

  &:hover {
    color: var(--accent-color);
  }

  &.router-link-exact-active {
    color: var(--accent-color);
    border-color: var(--accent-color);
  }
}

.NavDropdownText {
  &:hover {
    color: var(--accent-color);
    cursor: default;
  }
}

.NavDropdownItems {
  display: none;
  border: 1px solid var(--border-color);
  position: absolute;
  top: 100%;
  white-space: nowrap;
  right: 0;
  font-size: 14px;
}

.NavDropdownItem {
  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
}

.NavDropdownLink {
  padding: 0 20px;
  display: block;
  line-height: 40px;
  position: relative;

  &:hover {
    background: #f9f9f9;
    color: var(--accent-color);
  }

  &.router-link-exact-active {
    color: var(--accent-color);

    &:after {
      content: '';
      width: 0;
      height: 0;
      border-left: 5px solid var(--accent-color);
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      position: absolute;
      top: calc(50% - 2px);
      left: 9px;
    }
  }
}
</style>
