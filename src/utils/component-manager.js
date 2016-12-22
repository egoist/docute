class ComponentManager {
  constructor() {
    this.components = {}
  }
  add(place, component) {
    if (!this.components[place]) {
      this.components[place] = []
    }
    this.components[place].push(component)
  }
}

const componentManager = new ComponentManager()

export const registerComponent = (...args) => {
  componentManager.add(...args)
}

export default componentManager
