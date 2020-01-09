<template lang="pug">
  nav.c-grid
    ul.c-row.v-nav-check
      li.c-col.c-col-s-3
        input(type="radio" id="check1" value="check1" v-model="check" v-on:change="onchange")
        label(for="check1") アンバー
      li.c-col.c-col-s-3
        input(type="radio" id="check2" value="check2" v-model="check" v-on:change="onchange")
        label(for="check2") ブルー
      li.c-col.c-col-s-3
        input(type="radio" id="check3" value="check3" v-model="check" v-on:change="onchange")
        label(for="check3") オレンジ
      li.c-col.c-col-s-3
        input(type="radio" id="check4" value="check4" v-model="check" v-on:change="onchange")
        label(for="check4") ネイビー
</template>

<script>
import store from '@/vues/store/store.js';

export default {
  data: ()=> {
    return {
      check: '',
    }
  },
  computed: {
    firstcheck: ()=> {
      return store.getters.getCheck;
    },
  },
  created: function() {
    this.check = this.firstcheck
  },
  methods: {
    onchange() {
      store.commit('setEmotion', this.check)
    }
  }
}

</script>

<style lang="scss" scoped>
.v-nav-check li {
  display: block;
  position: relative;
  > input {
    position: absolute;
    opacity: 0;
    &:checked + label {
      color: #ffffff;
    }
    &:checked#check1 + label {
      background-color: #ffa000
    }
    &:checked#check2 + label {
      background-color: #45b1e5
    }
    &:checked#check3 + label {
      background-color: #ed6b00
    }
    &:checked#check4 + label {
      background-color: #40526c
    }
  }
  > label {
    position: relative;
    display: block;
    padding: 15px 15px 15px 40px;
    background-color: #dde2e5;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 100%;
    line-height: 1.3;
    &:focus {
      background-color: #c1cbd2;
    }
    &:hover {
      background-color: #c1cbd2;
    }
    &:before {
      position: absolute;
      top: 50%;
      left: 10px;
      margin-top: -10px;
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      background: #ffffff;
      border-radius: 50%;
    }
    &:after {
      position: absolute;
      top: 50%;
      left: 12px;
      margin-top: -8px;
      content: "";
      display: block;
      width: 16px;
      height: 16px;
      background: #ffffff;
      border-radius: 50%;
    }
  }
}
</style>