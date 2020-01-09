// vueApp

import Vue from 'vue';
import app from '@/vues/app.vue';

const vueApp = () => {

  let vueapp = document.getElementById('vue-app');
  if (vueapp) {
    new Vue(app).$mount(vueapp);
  }

};

export default vueApp;