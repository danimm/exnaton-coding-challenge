import { createStore } from "vuex";
import { MainState } from "@/typings";
import { measurementsModule } from "./measurements";
import { auth } from "@/plugins/firebase";

export default createStore<MainState>({
  state: {
    user: null,
    loginError: false,
    loading: false,
  },
  getters: {
    loading: (state: MainState) => state.loading,
    loginError: (state: MainState) => state.loginError,
  },
  mutations: {
    loadingData(state: MainState, payload: boolean) {
      state.loading = payload;
    },
    setUser(state: MainState, payload) {
      state.user = payload;
    },
    setLoginError(state: MainState, payload) {
      state.loginError = payload;
    },
  },
  actions: {
    async userLogin({ commit }, payload: { email: string; password: string }) {
      commit("setLoginError", false);
      try {
        await auth.signInWithEmailAndPassword(payload.email, payload.password);
      } catch (e) {
        commit("setLoginError", true);
        console.error(e.message);
      }
    },
    async userLogOut({ commit }) {
      commit("setLoginError", false);
      try {
        await auth.signOut();
      } catch (e) {
        commit("setLoginError", true);
        console.error(e.message);
      }
    },
    getUser({ commit }) {
      return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
          commit("setUser", user);
          resolve(user);
        });
      });
    },
  },
  modules: {
    measurements: measurementsModule,
  },
});
