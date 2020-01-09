<template lang="pug">
  div
    .v-main(v-bind:data-check="check")
      compList
</template>

<script>
import compList from '@/vues/components/list.vue';
import store from '@/vues/store/store.js';

export default {
  components: {
    compList,
  },
  computed: {
    check: ()=> {
      return store.getters.getCheck;
    },
  },
}

</script>

<style lang="scss" scoped>
.v-main {
  display: block;
  background-color: #f4f6f8;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 25px;
  background-image: linear-gradient(
    -45deg,
    rgba(255,255,255,0) 0%, rgba(255,255,255,0.0) 25%,
    rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%,
    rgba(255,255,255,0) 50%, rgba(255,255,255,0.0) 75%,
    rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1) 100%
  );
  background-size: 20px 20px;
  background-repeat: repeat;
  &[data-check="check1"] {
    background-color: #ffa000;
  }
  &[data-check="check2"] {
    background-color: #45b1e5;
  }
  &[data-check="check3"] {
    background-color: #ed6b00;
  }
  &[data-check="check4"] {
    background-color: #40526c;
  }
}
</style>