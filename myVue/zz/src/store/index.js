import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:null,
    usersusheid:null,
    adminname:null
  },
  getters: {
  },
  mutations: {
    updateUsername(state,name){
      state.username = name;
    },
    updateUsersusheid(state,susheid){
      state.usersusheid = susheid
    },
    updateAdminname(state,name){
      state.adminname = name;
    },
  },
  actions: {
  },
  modules: {
  }
})
