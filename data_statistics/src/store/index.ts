import Vue from 'vue'
import Vuex from 'vuex'

import menu from './modules/menu'
import user from './modules/user'
import games from './modules/games'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        menu,
        user,
        games
    }
})