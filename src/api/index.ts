import { Record, RecordsByDaysPayload, RecordsByHoursPayload } from "@/typings";
import moment from "moment";
import { db, firebase } from "@/plugins/firebase";

export default {
  getRecordsByDays: async (
    payload: RecordsByDaysPayload
  ): Promise<Record[]> => {
    const docs: Record[] = [];
    const startDate = new Date(payload.start);
    const endDate = new Date(payload.end);

    return await new Promise((resolve, reject) => {
      db.collection("measurements")
        .doc(payload.userId)
        .collection("days")
        .where("date", ">=", startDate)
        .where("date", "<=", endDate)
        .orderBy("date")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc: firebase.firestore.DocumentData): void => {
            // formatting the response for understanding
            docs.push({
              ...doc.data(),
              total: parseInt(doc.data().total.toFixed(2)),
              date: moment(doc.data().date.toDate()).format("DD-MM"),
            });
          });
          // return the docs
          if (docs.length) resolve(docs);
        })
        .catch((err) => reject(err));
    });
  },
  getRecordsByHours: async (
    payload: RecordsByHoursPayload
  ): Promise<Record[]> => {
    const docs: Record[] = [];

    // by default time picker take the current date...
    // the day chosen by the user needs to be set.
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

    return new Promise((resolve, reject) => {
      db.collection("measurements")
        .doc(payload.userId)
        .collection("hours")
        .where("date", ">=", formattedStart)
        .where("date", "<=", formattedEnd)
        .orderBy("date")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc: firebase.firestore.DocumentData) => {
            // formatting the response for understanding
            docs.push({
              ...doc.data(),
              total: parseInt(doc.data().total.toFixed(2)),
              date: moment(doc.data().date.toDate()).format("HH:00"),
            });
          });
          // return the docs
          if (docs.length) resolve(docs);
        })
        .catch((e) => reject(e));
    });
  },
};
