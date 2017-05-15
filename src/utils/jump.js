import headTo from 'head-to'
import { isMobile } from './dom'

export default function (id, callback) {
  headTo(`#${id}`, {
    duration: 300,
    a11y: true,
    offset: -20,
    callback,
    container: '.content-wrap'
  })
}
