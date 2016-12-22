import componentManager from 'utils/component-manager'

export default {
  props: {
    place: {
      validator(value) {
        return ['content:start', 'content:end'].indexOf(value) > -1
      }
    }
  },
  data() {
    return {
      components: componentManager.components[this.place]
    }
  },
  render(h) {
    if (!this.components || this.components.length === 0) return

    return (
      <div class="custom-components">
        {this.components.map(Component => <Component />)}
      </div>
    )
  }
}
