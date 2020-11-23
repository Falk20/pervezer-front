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
        :items="payments"
        :search="search"
        item-key="id"
        :loading="isLoad"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { GET_PAYMENTS } from "@/api";
import Axios from "axios";

export default {
  name: "finance-table",

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      payments: [],
      tableHeaders: [
        {
          text: "Код платежа",
          value: "id",
        },
        {
          text: "Дата платежа",
          value: "paymentDate",
        },
        {
          text: "Клиент",
          value: "client",
        },
        {
          text: "Код заказа",
          value: "orderId",
        },
        {
          text: "Сумма, руб",
          value: "amount",
        },
        {
          text: "Плательщик",
          value: "payer",
        },
        {
          text: "Комментарий",
          value: "comment",
        },
      ],
    };
  },

  methods: {
    async getPayments() {
      try {
        const { data: payments } = await Axios.get(GET_PAYMENTS);
        this.payments = payments;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },
  },

  created() {
    this.getPayments();
  },
};
</script>