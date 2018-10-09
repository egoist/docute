import loadjs from 'loadjs'

export default (deps, id) =>
  new Promise(resolve => {
    if (loadjs.isDefined(id)) return resolve()
    loadjs(deps, id, {
      success: resolve,
      error(err) {
        console.error('Deps not found:', err)
        resolve()
      }
    })
  })
