import { AlertCircleIcon, CheckCircleIcon } from 'vue-feather-icons'

const Icons = {
  check: CheckCircleIcon,
  alert: AlertCircleIcon
}

export default {
  name: 'AlertIcon',
  functional: true,
  props: {
    name: {
      type: String,
      required: true
    }
  },
  render(h, { props: { name } }) {
    return h(Icons[name], {
      class: 'alert-icon'
    })
  }
}
