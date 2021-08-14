import firebase from "firebase/app";

export interface Record {
  consumption: number;
  produced: number;
  total: number;
  date: firebase.firestore.Timestamp;
}

export interface MainState {
  loading: boolean;
}

export interface MeasurementsModule {
  results: Record[];
  type: string;
  messages: {
    hour: string;
    day: string;
    [key: string]: string;
  };
  userId: string;
}
