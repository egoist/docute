import jump from 'jump.js'
import { isMobile } from 'utils/dom'

export default function (id, callback) {
  jump(`#${id}`, {
    duration: 300,
    a11y: true,
    offset: isMobile ? -60 : -50,
    callback
  })
}
