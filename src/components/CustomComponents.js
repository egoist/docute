import componentManager from 'utils/component-manager'

export default {
  props: {
    place: {
      validator(value) {
        return [
          'content:start',
          'content:end',
          'sidebar:start',
          'sidebar:end',
          'nav:start',
          'nav:end',
          'icons:start',
          'icons:end'
        ].indexOf(value) > -1
      }
    }
  },
  data() {
    return {
      components: componentManager.components[this.place],
      className: `custom-components-${this.place.replace(':', '-')}`
    }
  },
  render(h) {
    if (!this.components || this.components.length === 0) {
      return
    }

    return (
      <div class={`custom-components ${this.className}`}>
        {this.components.map(Component => <Component />)}
      </div>
    )
  }
}
