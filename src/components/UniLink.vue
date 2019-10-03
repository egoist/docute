<script>
import {isExternalLink} from '../utils'

export default {
  functional: true,

  props: ['openInNewTab', 'externalLinkIcon'],

  render(
    h,
    {
      data,
      children,
      props: {openInNewTab, externalLinkIcon}
    }
  ) {
    const attrs = {...data.attrs}
    const {to} = attrs

    if (isExternalLink(to)) {
      delete attrs.to
      delete attrs.prefetchFiles
      return h(
        'a',
        {
          ...data,
          class: [data.class, 'is-external-link'],
          attrs: {
            ...attrs,
            href: to,
            target: openInNewTab === false ? '_self' : '_blank'
          }
        },
        [
          ...children,
          openInNewTab === false || externalLinkIcon === false
            ? null
            : h('external-link-icon', {class: 'external-link-icon'})
        ]
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
