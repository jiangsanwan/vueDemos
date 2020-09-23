import Vuex from 'vuex'
export default Vuex.createStore({
    state: {
        a: 2,
        test: {
            aa: 3
        }
    },
    mutations: {
        setA (state, value) {
            state.a = value
        },
        setTestA (state, value) {
            state.test.aa = value
        }
    },
    actions: {},
    modules: {}
})