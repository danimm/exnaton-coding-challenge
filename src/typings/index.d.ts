import firebase from "firebase/app";

// measurements
export interface Record {
  consumption: number;
  produced: number;
  total: number;
  date: firebase.firestore.Timestamp;
}

export interface AverageRecord {
  date: firebase.firestore.Timestamp;
  total: number;
}

// api responses
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
  allHours?: boolean;
}

// state

export interface MainState {
  user: null | firebase.auth.UserCredential;
  loginError: boolean;
  loading: boolean;
}
export interface MeasurementsModule {
  results: Record[];
  averageResults: AverageRecord[];
  type: string;
  messages: {
    hour: string;
    day: string;
    [key: string]: string;
  };
  userId: string;
}
