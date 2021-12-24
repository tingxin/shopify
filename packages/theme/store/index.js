import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: {
    form: {}
  },
  mutations: {
    ADDForm(state, tags) {
      state.form = tags;
    }
  },
  actions: {
    addForm({ commit }, tag) {
      commit('ADDForm', tag);
    }
  }
});

export default store;
