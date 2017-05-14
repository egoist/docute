import './style.css'
import defined from 'defined'

export default () => {
  return ({ registerComponent }) => {
    registerComponent('content:start', {
      name: 'announcement',
      render() {
        const { config, page: { attributes } } = this.$store.state

        let announcement = defined(attributes.announcement, config.announcement)
        if (!announcement) return

        announcement = typeof announcement === 'function'
          ? announcement(this.$route)
          : announcement
        let type
        let html
        if (typeof announcement === 'string') {
          html = announcement
        } else {
          type = announcement.type
          html = announcement.html
        }

        const classNames = ['inner-2x', 'announcement']
        if (type) {
          classNames.push(`announcement-${type}`)
        }

        return <div class={classNames} domPropsInnerHTML={html} />
      }
    })
  }
}
