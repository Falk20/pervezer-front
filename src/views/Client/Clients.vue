<template>

    <div class="base-demo" style="width: 600px">
      ghgfhffdfsd
    <vue-table-dynamic :props="props"></vue-table-dynamic>
  </div>
</template>

// <script>
import VueTableDynamic from 'vue-table-dynamic'
import Vue from "vue";
Vue.use(VueTableDynamic)

export default {
    name:"Clients",
    data() {
    return {
      params: {
        data: [
          ['Index', 'Data1', 'Data2', 'Data3'],
          [1, 'b3ba90', '7c95f7', '9a3853'],
          [2, 'ec0b78', 'ba045d', 'ecf03c'],
          [3, '63788d', 'a8c325', 'aab418'],
          [4, 'hf7y8c', '4rghjk', 'cgnhik']
        ],
        header: 'row',
        border: true,
        stripe: true,
        highlight: { column: [-2] },
        highlightedColor: 'rgb(243, 235, 200)'
      }
    }
  },
    components: 
    { 
        VueTableDynamic 
    }
}
</script>