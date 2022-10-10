import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        user: {
            username: null,
            email: null,
            accessToken: null,
            isLogged: false
        }
    },
    getters: {
    },
    mutations: {
        updateUserInfo(state, user) {
            state.user = user
        }
    },
    actions: {
        login({ commit }, data) {
            let user = {
                username: data.user.username,
                email: data.user.email,
                accessToken: data.token,
                isLogged: true
            }
            commit('updateUserInfo', user)
        },
        logout({ commit }) {
            let user = {
                username: null,
                email: null,
                accessToken: null,
                isLogged: false
            }
            commit('updateUserInfo', user)
        }
    },
    modules: {
    }
})

export default store