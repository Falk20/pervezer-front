<template>
  <v-card width="100%" v-if="pricelist.length">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Колонка 0</th>
            <th class="text-left">Колонка 1</th>
            <th class="text-left">Колонка 2</th>
            <th class="text-left">Колонка 3</th>
            <th class="text-left">Колонка 4</th>
            <th class="text-left">Колонка 5</th>
            <th class="text-left">Колонка 6</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pricelist" :key="item.name">
            <td>{{ item.col1 }}</td>
            <td>{{ item.col2 }}</td>
            <td>{{ item.col3 }}</td>
            <td>{{ item.col4 }}</td>
            <td>{{ item.col5 }}</td>
            <td>{{ item.col6 }}</td>
            <td>{{ item.col7 }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import { GET_NEW_PRICELIST } from "@/api";
import Axios from "axios";

export default {
  name: "new-pricelist-accepting",

  data() {
    return {
      pricelist: [],
      head:[]
    };
  },

  computed: {
    vendorID() {
      return this.$route.params.vendorID;
    },
  },

  methods: {
    async getPricelist() {
      try {
        let { data: pricelist } = await Axios.get(GET_NEW_PRICELIST, {
          params: {
            id: this.vendorID,
          },
        });

        this.pricelist = pricelist;
      } catch {
        alert("Не удалось загрузить новый прайслист");
      }
    },
  },

  created() {
    this.getPricelist();
  },
};
</script>