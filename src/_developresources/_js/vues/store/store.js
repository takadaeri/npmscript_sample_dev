import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    check: 'check1',
    list: {
      check1: {
        id: '001',
        array: [
          {text: 'アンバーのお財布', data: '1-1', flag: false, price: 1000},
          {text: 'アンバーのプール', data: '1-2', flag: false, price: 2000},
          {text: 'アンバーのコート', data: '1-3', flag: false, price: 1000}
        ]
      },
      check2: {
        id: '002',
        array: [
          {text: 'ブルーのお財布', data: '2-1', flag: false, price: 1000},
          {text: 'ブルーのプール', data: '2-2', flag: false, price: 2000},
          {text: 'ブルーのコート', data: '2-3', flag: false, price: 1000}
        ]
      },
      check3: {
        id: '003',
        array: [
          {text: 'オレンジのお財布', data: '3-1', flag: false, price: 1000},
          {text: 'オレンジのプール', data: '3-2', flag: false, price: 2000},
          {text: 'オレンジのコート', data: '3-3', flag: false, price: 1000}
        ]
      },
      check4: {
        id: '004',
        array: [
          {text: 'ネイビーのお財布', data: '4-1', flag: false, price: 1000},
          {text: 'ネイビーのプール', data: '4-2', flag: false, price: 2000},
          {text: 'ネイビーのコート', data: '4-3', flag: false, price: 1000}
        ]
      },
    }
  },
  getters: {
    getCheck: (state) => {
      return state.check;
    },
    getList: (state) => {
      return state.list;
    }
  },
  mutations: {
    setEmotion(state, check) {
      state.check = check;
    },
    setFlag(state, id) {
      state.list['check' + id.split('-')[0]].array[id.split('-')[1] - 1].flag = true;
    },
  },
  actions: {
    // 非同期のものはactionsに記載するコト
  }
});