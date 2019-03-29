<script>
import {isExternalLink} from '../utils'

export default {
  functional: true,

  render(h, {data, children}) {
    const attrs = {...data.attrs}
    const {to} = attrs
    if (isExternalLink(to)) {
      delete attrs.to
      return h(
        'a',
        {
          ...data,
          class: [data.class, 'is-external-link'],
          attrs: {
            ...attrs,
            href: to,
            target: '_blank'
          }
        },
        [...children, h('external-link-icon', {class: 'external-link-icon'})]
      )
    }
    return h('router-link', data, children)
  }
}
</script>

<style>
.external-link-icon {
  margin-left: 3px;
}
</style>
