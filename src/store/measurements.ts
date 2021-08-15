import { MainState, MeasurementsModule, Record } from "@/typings";
import { Module } from "vuex";

import data from "@/utils/response.json";
import moment from "moment";
import { db } from "@/plugins/firebase";

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
      const startDate = new Date(payload.start);
      const endDate = new Date(payload.end);
      const docs: Record[] = [];

      commit("loadingData", true, { root: true });

      try {
        const collection = await db
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

        commit("setResultsType", "day");
        commit("setResults", docs);
      } catch (e) {
        console.error(e.message);
      } finally {
        commit("loadingData", false, { root: true });
      }
    },
    async getRecordsByHours(
      { state, commit },
      payload: { day: string; start: string; end: string; allHours: boolean }
    ) {
      const selectedDay = moment(payload.day).format("YYYY-MM-DD");

      const formattedStart = new Date(
        `${selectedDay}T${
          payload.allHours ? "00:00" : moment(payload.start).format("HH:00")
        }`
      );

      const formattedEnd = new Date(
        `${selectedDay}T${
          payload.allHours ? "23:00" : moment(payload.end).format("HH:00")
        }`
      );

      const docs: Record[] = [];
      commit("loadingData", true, { root: true });

      try {
        const collection = await db
          .collection("measurements")
          .doc(state.userId)
          .collection("hours")
          .where("date", ">=", formattedStart)
          .where("date", "<=", formattedEnd)
          .orderBy("date")
          .get();

        collection.forEach((snapshot: any) => {
          docs.push({
            ...snapshot.data(),
            total: snapshot.data().total.toFixed(2),
            date: moment(snapshot.data().date.toDate()).format("HH:00"),
          });
        });

        commit("setResultsType", "hour");
        commit("setResults", docs);
      } catch (e) {
        console.error(e.message);
      } finally {
        commit("loadingData", false, { root: true });
      }
    },
  },
};
