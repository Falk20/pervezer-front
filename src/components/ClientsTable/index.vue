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
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ openedItem.fio }}</span>
              </v-card-title>
            </v-card>
          </v-dialog>
        </template>

        <template v-slot:item.organization>
          -
        </template>

        <template v-slot:item.email="{ item }">
          <a :href="`mailto:${item.email}`">{{ item.email }}</a>
        </template>
        <template v-slot:item.mobile="{ item }">
          <a :href="`tel:+${item.mobile}`">{{ item.mobile }}</a>
        </template>
        <template v-slot:item.birthDate="{ item }">
          {{ getCurrentDate(item.birthDate) }}
        </template>
        <template v-slot:item.clientCard="{ item }">
          <v-icon small class="mr-2" @click="openClientInfo(item)">
            mdi-account-details
          </v-icon>
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
      dialog: false,
      openedItem: {},
      openedIndex: -1,
      selected: [],
      tableHeaders: [
        {
          text: "Код клиента",
          value: "id"
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
          value: "birthDate"
        },
        {
          text: "Комментарий менеджера"
        },
        {
          text: "Теги"
        },
        {
          text: "Карточка клиента",
          value: "clientCard",
          align: "center"
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
    openClientInfo(client) {
      this.openedIndex = this.clients.indexOf(client);
      this.openedItem = Object.assign({}, client);
      this.dialog = true;
    },
    closeClientInfo() {
      this.dialog = false;
      this.$nextTick(() => {
        this.openedItem = {};
        this.openedIndex = -1;
      });
    },
    getCurrentDate(date) {
      return new Date(date).toLocaleString("ru", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      });
    },
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
  },

  watch: {
    dialog(val) {
      val || this.closeClientInfo();
    }
  }
};
</script>