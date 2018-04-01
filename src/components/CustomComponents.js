import componentManager from '@/utils/componentManager'

export default {
  name: 'CustomComponents',
  functional: true,
  props: {
    position: {
      type: String,
      required: true
    }
  },
  render(h, { props, data }) {
    const components = componentManager.components[props.position]
    const className = `custom-components-${props.position.replace(':', '-')}`

    if (!components || components.length === 0) {
      return
    }

    return h('div', {
      ...data,
      class: `custom-components ${className}`
    }, components.map(Component => h(Component)))
  }
}
