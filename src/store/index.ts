import fb from "@/plugins/firebase";
import { createStore } from "vuex";

export default createStore({
  state: {
    data: [],
  },
  mutations: {},
  actions: {
    getData() {
      fb.firestore
        .collection("measurements")
        .doc("7eb6cb7a-bd74-4fb3-9503-0867b737c2f6")
        .get()
        .then((doc) => {
          console.log(doc.data());
        });
    },
  },
  modules: {},
});
