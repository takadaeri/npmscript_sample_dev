<template lang="pug">
  div
    button.c-btn-s(@click="onclick" v-bind:dataid="dataid" v-bind:class="{ 'is-added': dataflag }") push
</template>

<script>
import store from '@/vues/store/store.js';

export default {
  props: {
    dataid: String,
    dataflag: Boolean
  },
  methods: {
    onclick() {
      alert(this.dataid + 'を買い物カゴに入れました');
      store.commit('setFlag', this.dataid);
    }
  }
}
</script>

<style lang="scss" scoped>
.is-added {
  background: #dde2e5;
  box-shadow: none;
  pointer-events: none;
  &:focus {
    outline: none;
  }
}
</style>