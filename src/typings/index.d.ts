import firebase from "firebase/app";

export interface Record {
  consumption: number;
  produced: number;
  total: number;
  date: firebase.firestore.Timestamp;
}

export interface MainState {
  user: null | firebase.auth.UserCredential;
  loginError: boolean;
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

export interface RecordsByDaysPayload {
  userId: string;
  start: string;
  end: string;
}
export interface RecordsByHoursPayload {
  userId: string;
  day: string;
  start: string;
  end: string;
  allHours: boolean;
}
