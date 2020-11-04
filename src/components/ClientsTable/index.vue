<template>
  <div>
    <p v-if="isLoad">Load...</p>
    <p v-else-if="isErr">Error</p>
    <template v-else>
      <v-data-table
        v-model="selected"
        :headers="tableHeaders"
        :items="clients"
        :single-select="false"
        item-key="id"
        show-select
        class="elevation-1"
      >
        <template v-slot:item.email="{ item }">
          <a :href="`mailto:${item.email}`">{{ item.email }}</a>
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
import Axios from "axios";
import { GET_CLIENTS } from "@/api";

export default {
  name: "ClientsTable",

  data() {
    return {
      isLoad: true,
      isErr: false,
      clients: null,
      selected: [],
      tableHeaders: [
        {
          text: "Код клиента"
        },
        {
          text: "Профиль",
          value: "profile.name"
        },
        {
          text: "Организация"
        },
        {
          text: "Email",
          value: "email"
        },
        {
          text: "Наценка, %",
          value: "profile.surCharge"
        },
        {
          text: "Сальдо, руб",
          value: "saldo.value"
        },
        {
          text: "ФИО",
          value: "fio"
        },
        {
          text: "Город",
          value: "city"
        },
        {
          text: "Контакты",
          value: "mobile"
        },
        {
          text: "Регистрация",
          value: "BirthDate"
        },
        {
          text: "Комментарий менеджера"
        },
        {
          text: "Теги"
        },
        {
          text: "Карточка клиента"
        },
        {
          text: "Ред."
        },
        {
          text: "Цены"
        },
        {
          text: "Xls"
        },
        {
          text: "Вход"
        }
      ]
    };
  },

  methods: {
    async getClients() {
      try {
        const { data: clients } = await Axios.get(GET_CLIENTS);

        this.clients = clients;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    }
  },

  created() {
    this.getClients();
  }
};
</script>