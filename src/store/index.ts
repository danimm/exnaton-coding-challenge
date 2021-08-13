import { createStore } from "vuex";
import { MainState } from "@/typings";
import { measurementsModule } from "./measurements";

export default createStore<MainState>({
  state: {
    loading: false,
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
