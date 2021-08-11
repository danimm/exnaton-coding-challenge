import fb from "@/plugins/firebase";
import { createStore } from "vuex";
import data from "@/utils/response.json";
import moment from "moment";

export default createStore({
  state: {
    results: [],
  },
  mutations: {
    setResults(state, payload) {
      state.results = payload;
    },
  },
  actions: {
    getData({ commit, dispatch }) {
      // const startDate = new Date("2021-05-01");
      // const endDate = new Date("2021-05-31");
      // fb.firestore
      //   .collection("measurements")
      //   .doc("7eb6cb7a-bd74-4fb3-9503-0867b737c2f6")
      //   .collection("2021")
      //   .orderBy("timestamp")
      //   .startAt(startDate)
      //   .endAt(endDate)
      //   .get()
      //   .then((snapshot) => {
      //     const results: any = [];
      //     snapshot.forEach((doc) => {
      //       const data = {
      //         ...doc.data(),
      //         timestamp: doc.data().timestamp.toDate(),
      //       };
      //       results.push(data);
      //     });

      //     commit("setResults", results);
      //   })
      //   .finally(() => {
      //     dispatch("formatResults");
      //   });

      // commit("setResults", data);
      dispatch("formatResults");
    },
    formatResults({ state, commit }) {
      const results = [];
      for (let index = 1; index < 32; index++) {
        const day =
          index.toString().length == 1 ? `0${index}` : index.toString();

        const dataDay = {
          y: 0,
          produced: 0,
          total: 0,
          x: moment(`2021-05-${day}`).format("DD-MM"),
        };

        const dayRecords = data.filter((record: any) =>
          moment(record.timestamp, "YYYY-MM-DD HH:mm").isSame(
            `2021-05-${day}`,
            "day"
          )
        );

        const total = dayRecords.reduce(
          (acc: any, curr: any) => acc + curr["0100010700FF"],
          0
        );

        dataDay.y = Math.round(total) / 1000;
        // dataDay.date = moment(dataDay.date, "YYYY-MM-DD HH:mm")
        results.push(dataDay);
      }

      commit("setResults", results);

      // console.log((Math.round(total) / 1000).toFixed(2));

      // for (let index = 0; index < 24; index++) {
      //   const day =
      //     index.toString().length == 1 ? `0${index}` : index.toString();

      //     state.results.filter(() => )
      // }
    },
  },
  modules: {},
});
