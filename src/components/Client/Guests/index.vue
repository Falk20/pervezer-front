<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isErr">Error</p>
    <v-card v-else width="1024">
      <v-card-title>
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
          clearable
        />
      </v-card-title>
      <v-data-table
        :headers="tableHeaders"
        :items="guests"
        :search="search"
        item-key="id"
        :loading="isLoad"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { GET_GUESTS } from "@/api";
import Axios from "axios";

export default {
  name: "guests",

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      guests: [],
      tableHeaders: [
        {
          text: "ID",
          value: "id",
        },
        {
          text: "Наценка",
          value: "profile.surCharge",
        },
        {
          text: "IP",
          value: "ip",
        },
      ],
    };
  },

  methods: {
    async getGuests() {
      try {
        const { data: guests } = await Axios.get(GET_GUESTS);

        this.guests = guests;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },
  },

  created() {
    this.getGuests();
  },
};
</script>