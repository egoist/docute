class ComponentManager {
  constructor() {
    this.components = {
      leftBar: [],
      rightBar: []
    }
  }

  append(position, component, props) {
    this.components[position].push({
      component,
      props
    })
    return this
  }

  prepend(position, component, props) {
    this.components[position].unshift({
      component,
      props
    })
    return this
  }

  count(position) {
    return this.components[position].length
  }
}

export default new ComponentManager()
