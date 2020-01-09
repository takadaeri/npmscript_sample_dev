<template lang="pug">
  div.v-select
    p.v-select_ttl 買い物カゴ
    ul.v-select_list
      li(v-for="item in addlist")
        p {{ item.data }} {{ item.text }}
    p.v-select_sum ¥{{ sum }}
</template>

<script>
import store from '@/vues/store/store.js';

export default {
  data: ()=> {
    return {
      addlist: [],
      sum: 0,
    }
  },
  computed: {
    list: ()=> {
      return store.getters.getList;
    },
  },
  created: function() {
    this.getSelectedList();
  },
  watch: {
    list: {
      handler: function(val) {
        this.getSelectedList();
      },
      deep: true
    }
  },
  methods: {
    getSelectedList() {
      let addlist1 = this.list['check1'].array.filter(function(item, index){
        if (item.flag === true) return true;
      });
      let addlist2 = this.list['check2'].array.filter(function(item, index){
        if (item.flag === true) return true;
      });
      let addlist3 = this.list['check3'].array.filter(function(item, index){
        if (item.flag === true) return true;
      });
      let addlist4 = this.list['check4'].array.filter(function(item, index){
        if (item.flag === true) return true;
      });
      this.addlist = addlist1.concat(addlist2, addlist3, addlist4);

      let allprice = 0 
      for (var i = this.addlist.length - 1; i >= 0; i--) {
        allprice = allprice + this.addlist[i].price
      }
      this.sum = allprice;
    }
  }
}
</script>

<style lang="scss" scoped>
.v-select {
  margin-top: 10px;
  display: block;
  background-color: #f4f6f8;
  border-radius: 5px;
  border: 2px solid #2c384a;
  overflow: hidden;
  display: table;
  width: 100%;
}
.v-select_ttl {
  display: table-cell;
  vertical-align: middle;
  background-color: #2c384a;
  color: #ffffff;
  padding: 25px;
  width: 20%;
  line-height: 1.3;
  text-align: center;
}
.v-select_list {
  display: table-cell;
  vertical-align: middle;
  padding: 25px;
}
.v-select_sum {
  display: table-cell;
  vertical-align: middle;
  color: #ed6b00; 
  font-size: 2.0rem;
  font-weight: bold;
  text-align: right;
  padding: 25px;
}
</style>