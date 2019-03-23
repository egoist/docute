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

  process(name, arg) {
    const hooks = this.hooks[name] || []
    for (const fn of hooks) {
      arg = fn(arg) || arg
    }
    return arg
  }

  async processPromise(name, arg) {
    const hooks = this.hooks[name] || []
    for (const fn of hooks) {
      // eslint-disable-next-line no-await-in-loop
      arg = (await fn(arg)) || arg
    }
    return arg
  }
}

export default new Hooks()
