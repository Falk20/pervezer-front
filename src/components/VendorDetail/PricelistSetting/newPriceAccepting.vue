<template>
  <v-card width="100%" v-if="pricelist.length">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Бренд</th>
            <th class="text-left">Артикул</th>
            <th class="text-left">Наименование</th>
            <th class="text-left">Цена</th>
            <th class="text-left">Количество</th>
            <th class="text-left">Кратность</th>
            <th class="text-left">Код</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pricelist" :key="item.name">
            <td>{{ item.brand }}</td>
            <td>{{ item.article }}</td>
            <td>{{ item.model }}</td>
            <td>{{ item.vendorPrice }}</td>
            <td>{{ item.count }}</td>
            <td>{{ item.multiple }}</td>
            <td>{{ item.code }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-container>
      <v-row>
        <v-col>
          <v-btn
            width="100%"
            type="button"
            color="primary"
            @click="updPricelist(true)"
          >
            Принять
          </v-btn>
        </v-col>
        <v-col>
          <v-btn width="100%" type="button" @click="updPricelist(false)"
            >Отклонить</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { GET_NEW_PRICELIST, UPD_NEW_PRICELIST } from "@/api";
import Axios from "axios";

export default {
  name: "new-pricelist-accepting",

  data() {
    return {
      pricelist: [],
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
    async updPricelist(isAccepted) {
      try {
        let { status } = await Axios.post(UPD_NEW_PRICELIST, {
          vendorId: this.vendorID,
          isAccepted: isAccepted,
        });

        if (status === 200) {
          this.getPricelist();
        }
      } catch {
        alert("Не удалось отклонить/принять новый прайслист");
      }
    },
  },

  created() {
    this.getPricelist();
  },
};
</script>