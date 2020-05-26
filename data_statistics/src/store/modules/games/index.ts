import sudo from './sudo'

export default {
    namespaced: true,
    state: {
        ...sudo.state
    },
    mutations: {
        ...sudo.mutations
    },
    actions: {
        ...sudo.actions
    }
}