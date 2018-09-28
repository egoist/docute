class Hooks {
  constructor() {
    this.hooks = {}
  }

  add(name, fn) {
    this.hooks[name] = this.hooks[name] || []
    this.hooks[name].push(fn)
    return this
  }

  invoke(name, ...args) {
    const hooks = this.hooks[name] || []
    for (const fn of hooks) {
      fn(...args)
    }
    return this
  }
}

export default new Hooks()
