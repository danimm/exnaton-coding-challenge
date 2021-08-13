import { MainState, MeasurementsModule, Record } from "@/typings";
import { Module } from "vuex";

import data from "@/utils/response.json";
import moment from "moment";
import fb from "@/plugins/firebase";

export const measurementsModule: Module<MeasurementsModule, MainState> = {
  namespaced: true,
  state: {
    results: [] as Record[],
    userId: "7eb6cb7a-bd74-4fb3-9503-0867b737c2f6",
  },
  getters: {
    getResults: (state: MeasurementsModule) => state.results,
  },
  mutations: {
    setResults(state: MeasurementsModule, payload: Record[]) {
      state.results = payload;
    },
    clearResults(state: MeasurementsModule) {
      state.results = [];
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
      const startDate = new Date(payload.start);
      const endDate = new Date(payload.end);
      const docs: Record[] = [];

      commit("loadingData", true, { root: true });

      try {
        const collection = await fb.firestore
          .collection("measurements")
          .doc(state.userId)
          .collection("days")
          .where("date", ">=", startDate)
          .where("date", "<=", endDate)
          .orderBy("date")
          .get();

        collection.forEach((snapshot: any) => {
          docs.push({
            ...snapshot.data(),
            total: snapshot.data().total.toFixed(2),
            date: moment(snapshot.data().date.toDate()).format("DD-MM"),
          });
        });

        console.log(docs);
        commit("setResults", docs);
      } catch (e) {
        console.error(e.message);
      } finally {
        commit("loadingData", false, { root: true });
      }
    },
    getRecordsByHours() {
      // todo
    },
  },
};
