import { createStore } from "vuex";
import { MainState } from "@/typings";
import { measurementsModule } from "./measurements";

export default createStore<MainState>({
  state: {
    loading: false,
  },
  getters: {
    loading: (state) => state.loading,
  },
  mutations: {
    loadingData(state: MainState, payload: boolean) {
      state.loading = payload;
    },
  },
  modules: {
    measurements: measurementsModule,
  },
});
