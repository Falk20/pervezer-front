<template>
  <div>
    <p v-if="isLoad">Load...</p>
    <p v-else-if="isErr">Error</p>
    <template v-else>
      <v-row>
        <v-container>
          <p>Профили</p>
          <v-radio-group
            v-model="radios"
            mandatory
            
          >
            <v-radio
              :items="profiles"
              item-text="name"
            >
            </v-radio>
        </v-radio-group>
      </v-container>
        <v-data-table
            v-model="selected"
            :headers="tableHeaders"
            :items="profiles.discounts"
            :single-select="false"
            item-key="id"
            show-select
            class="elevation-1">
        </v-data-table>
      </v-row>
    </template>
  </div>
</template>

<script>
import Axios from "axios";
import { GET_PROFILES } from "@/api";

export default {
  name: "DiscountsTable",

  data() {
    return {
      isLoad: true,
      isErr: false,
      profiles: null,
      selected: [],
      tableHeaders: [
        {
          text: "Сумма заказа",
          value:"discountFrom"
        },
        {
          text: "Скидка",
          value: "discountPersent"
        },
        {
          text: ""
        }
      ]
    };
  },

  methods: {
    async getProfiles() {
      try {
        const { data: profiles } = await Axios.get(GET_PROFILES);

        this.profiles = profiles;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    }
  },

  created() {
    this.getProfiles();
  }
};
</script>

<style scoped>
    .elevation-1{
        width:60%;
    }
</style>