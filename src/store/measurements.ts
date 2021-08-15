import { MainState, MeasurementsModule, Record } from "@/typings";
import { Module } from "vuex";

// import data from "@/utils/response.json";
import api from "@/api/index";

export const measurementsModule: Module<MeasurementsModule, MainState> = {
  namespaced: true,
  state: {
    results: [] as Record[],
    type: "",
    messages: {
      hour: "Total in watts of the total hourly range: XX:00 - XX:59",
      day: "Total of comsuption in Kw/h",
    },
    userId: "7eb6cb7a-bd74-4fb3-9503-0867b737c2f6",
  },
  getters: {
    getResults: (state: MeasurementsModule) => state.results,
    getTypeOfResults: (state: MeasurementsModule) => state.type,
    getChartTitle: (state: MeasurementsModule) => {
      return state.messages[state.type];
    },
  },
  mutations: {
    setResults(state: MeasurementsModule, payload: Record[]) {
      state.results = payload;
    },
    clearResults(state: MeasurementsModule) {
      state.results = [];
    },
    setResultsType(state: MeasurementsModule, payload: string) {
      state.type = payload;
    },
  },
  actions: {
    getData() {
      // todo
    },
    async GetRecordsByDays(
      { state, commit },
      payload: { start: string; end: string }
    ) {
      commit("loadingData", true, { root: true });
      try {
        // axios.get('https://exnaton.com/api/measurements', {
        //   params: {
        //     userId,
        //     start
        //     end,
        //   }
        // })
        const results = await api.getRecordsByDays({
          start: payload.start,
          end: payload.end,
          userId: state.userId,
        });
        commit("setResultsType", "day");
        commit("setResults", results);
      } catch (e) {
        console.log(e.message);
      } finally {
        commit("loadingData", false, { root: true });
      }
    },
    async getRecordsByHours(
      { state, commit },
      payload: { day: string; start: string; end: string; allHours?: boolean }
    ) {
      commit("loadingData", true, { root: true });

      try {
        // axios.get('https://exnaton.com/api/measurements', {
        //   params: {
        //     userId,
        //     day,
        //     start
        //     end,
        //     allHours?
        //   }
        // })
        const results = await api.getRecordsByHours({
          start: payload.start,
          end: payload.end,
          day: payload.day,
          allHours: payload.allHours || false,
          userId: state.userId,
        });
        commit("setResultsType", "hour");
        commit("setResults", results);
      } catch (e) {
        console.error(e.message);
      } finally {
        commit("loadingData", false, { root: true });
      }
    },
  },
};
