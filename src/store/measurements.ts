import {
  AverageRecord,
  MainState,
  MeasurementsModule,
  Record,
} from "@/typings";
import { Module } from "vuex";

// import data from "@/utils/response.json";
import api from "@/api/index";

export const measurementsModule: Module<MeasurementsModule, MainState> = {
  namespaced: true,
  state: {
    results: [] as Record[],
    averageResults: [] as AverageRecord[],
    type: "",
    messages: {
      hour: "Total in watts of the total hourly range: XX:00 - XX:59",
      day: "Total of comsuption in Kw/h",
    },
    userId: "7eb6cb7a-bd74-4fb3-9503-0867b737c2f6",
  },
  getters: {
    getResults: (state: MeasurementsModule): Record[] => state.results,
    getAverageResults: (state: MeasurementsModule) => state.averageResults,
    getTypeOfResults: (state: MeasurementsModule): string => state.type,
    getChartTitle: (state: MeasurementsModule): string => {
      return state.messages[state.type];
    },
    getAverage: (state: MeasurementsModule): number => {
      if (state.results.length) {
        const sum = state.results.reduce((acc, curr) => acc + curr.total, 0);
        const avg = parseInt((sum / state.results.length).toFixed(2));
        return avg;
      } else {
        return 0;
      }
    },
    getMax(state: MeasurementsModule): Record {
      if (state.results.length) {
        const max = state.results.reduce((prev, curr) => {
          return prev.total > curr.total ? prev : curr;
        });
        return max;
      } else {
        return {} as Record;
      }
    },
    getMin(state: MeasurementsModule): Record {
      if (state.results.length) {
        const min = state.results.reduce((prev, curr) => {
          return prev.total < curr.total ? prev : curr;
        });
        return min;
      } else {
        return {} as Record;
      }
    },
  },
  mutations: {
    setResults(state: MeasurementsModule, payload: Record[]) {
      state.results = payload;
    },
    setAverageResults(state: MeasurementsModule, payload: AverageRecord[]) {
      state.averageResults = payload;
    },
    clearResults(state: MeasurementsModule) {
      state.results = [];
    },
    setResultsType(state: MeasurementsModule, payload: string) {
      state.type = payload;
    },
  },
  actions: {
    async GetRecordsByDays(
      { state, commit, dispatch },
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

        commit("setResults", results);
        dispatch("getAverageResults");
        commit("setResultsType", "day");
      } catch (e) {
        console.log(e.message);
      } finally {
        commit("loadingData", false, { root: true });
      }
    },
    async getRecordsByHours(
      { state, commit, dispatch },
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
        dispatch("getAverageResults");
      } catch (e) {
        console.error(e.message);
      } finally {
        commit("loadingData", false, { root: true });
      }
    },
    getAverageResults({ state, commit, getters }) {
      const averageResults = [
        { date: state.results[0].date, total: getters["getAverage"] },
        {
          date: state.results[state.results.length - 1].date,
          total: getters["getAverage"],
        },
      ];

      commit("setAverageResults", averageResults);
    },
  },
};
