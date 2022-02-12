import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries: [],
  },
  mutations: {
    setCountries(state, countries) {
      state.countries = countries;
    },
  },
  actions: {
    fetchCountriesFromAPI({ commit }) {
      return fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
          commit("setCountries", data);
        });
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
