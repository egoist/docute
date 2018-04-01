import { mapState, mapGetters, mapActions } from 'vuex'

export default ({ state, getters, actions }) => {
  return {
    computed: {
      ...(state && mapState(state)),
      ...(getters && mapGetters(getters))
    },
    methods: {
      ...(actions && mapActions(actions))
    }
  }
}
