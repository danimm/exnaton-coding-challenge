import { MainState, MeasurementsModule, Record } from '@/typings';
import { Module } from 'vuex';

import data from '@/utils/response.json';
import moment from 'moment';
import fb from '@/plugins/firebase';

const measurementsModule: Module<MeasurementsModule, MainState> = {
  namespaced: true,
  state: {
    results: [] as Record[],
  },
  getters: {
    getResults: (state: MeasurementsModule) => state.results,
  },
  mutations: {
    setResults(state: MeasurementsModule, payload: Record[]) {
      state.results = payload;
    },
  },
  actions: {
    getData() {
      // todo
    },
    GetRecordsByMonths() {
      // todo
    },
    getRecordsByHours() {
      // todo
    },
  },
};

export { measurementsModule };
