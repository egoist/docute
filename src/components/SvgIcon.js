import { makeComponent } from 'vue-inline'

export default makeComponent({
  github: require('!raw-loader!svg/github.svg'),
  twitter: require('!raw-loader!svg/twitter.svg'),
  edit: require('!raw-loader!svg/edit.svg'),
  menu: require('!raw-loader!svg/menu.svg'),
  link: require('!raw-loader!svg/link.svg'),
  search: require('!raw-loader!svg/search.svg'),
  close: require('!raw-loader!svg/close.svg')
})
