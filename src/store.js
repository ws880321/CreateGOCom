import Vue from 'vue'
import Vuex from 'vuex'
import { store } from './assets/js/go-coms.es5'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    GoCom: store
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
