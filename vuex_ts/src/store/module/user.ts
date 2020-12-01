import { ActionContext } from './../interface'
import { GetterTree } from 'vuex'
export interface State {
    username: string
    password: string
}
let state: State = {
        username: 'fremember',
        password: ''
    },
    getters: GetterTree<State, any> = {
        username: (state: State) => state.username,
        password: (state: State) => state.password
    },
    mutations = {
        setUsername (state: State, username: string) {
            state.username = username
        },
        setPassword (state: State, password: string) {
            state.password = password
        }
    },
    actions = {
        async setUsername(context: ActionContext, username: string) {
            let { commit } = context
            commit('setUsername', username)
        },
        async setPassword(context: ActionContext, password: string) {
            let { commit } = context
            commit('setPassword', password)
        }
    },
    user = {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
    };
export default user