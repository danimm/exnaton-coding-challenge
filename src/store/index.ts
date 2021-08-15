import { createStore } from "vuex";
import { MainState } from "@/typings";
import { measurementsModule } from "./measurements";
import { db, auth } from "@/plugins/firebase";

export default createStore<MainState>({
  state: {
    user: null,
    loginError: false,
    loading: false,
  },
  getters: {
    loading: (state) => state.loading,
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
      try {
        await auth.signInWithEmailAndPassword(payload.email, payload.password);
      } catch (e) {
        commit("setLoginError", true);
        console.error(e.message);
      }
    },
    async userLogOut({ commit }) {
      try {
        await auth.signOut();
      } catch (e) {
        commit("setLoginError", true);
        console.error(e.message);
      }
    },
    checkAuth({ commit }) {
      auth.onAuthStateChanged((user) => commit("setUser", user));
    },
  },
  modules: {
    measurements: measurementsModule,
  },
});
