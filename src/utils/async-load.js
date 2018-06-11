import load from 'loadjs'

export default deps =>
  new Promise((resolve, reject) => {
    load(deps, {
      success: resolve,
      error: reject
    })
  })
