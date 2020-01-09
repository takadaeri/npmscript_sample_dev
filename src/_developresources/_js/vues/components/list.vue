<template lang="pug">
  ul.v-list
    li(v-for="item in showlist")
      .v-list_txt
        p {{ item.data }} {{ item.text }}
      .v-list_price
        p ¥{{ item.price }}
      .v-list_btn
        compBtn(:dataid="item.data", :dataflag="item.flag")
</template>

<script>
import compBtn from '@/vues/components/btn.vue';
import store from '@/vues/store/store.js';

export default {
  components: {
    compBtn,
  },
  data: ()=> {
    return {
      showlist: [],
    }
  },
  computed: {
    check: ()=> {
      return store.getters.getCheck;
    },
    list: ()=> {
      return store.getters.getList;
    },
  },
  created: function() {
    this.showlist = this.list[this.check].array
  },
  watch: {
    check() {
      this.$nextTick(() => {
        this.showlist = this.list[this.check].array
      })
    }    
  }
}
</script>

<style lang="scss" scoped>
.v-list {
  padding: 20px;
  background: #f4f6f8;
  border-radius: 3px;
  & > :first-child {
    border-top: none;
  }
  li {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-top: 1px solid #c1cbd2;
  }
}
.v-list_txt {
  flex: 1;
}
.v-list_price {
  font-weight: bold;
  padding: 0 10px;
}
.v-list_btn {
  padding-left: 10px;
}
</style>