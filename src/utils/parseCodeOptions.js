export default opts => {
  if (opts) {
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(`return ${opts}`)
      opts = fn()
    } catch (error) {
      console.error(
        `You're using invalid options for code fences, it must be JSON or JS object!\n${error.message}`
      )
    }
  }
  return opts || {}
}
