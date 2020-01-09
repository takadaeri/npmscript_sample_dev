<template lang="pug">
  #vue-app-main
    compNav
    compMain
    compSelect
</template>

<script>
  import compNav from '@/vues/components/nav.vue';
  import compMain from '@/vues/components/main.vue';
  import compSelect from '@/vues/components/select.vue';

  import store from '@/vues/store/store.js';

  export default {
    components: {
      compNav,
      compMain,
      compSelect,
    },
    data () {
      return {
        sharedState: store.state
      }
    }
  }

</script>