<template>
  <p v-if="isErr">Error</p>
  <v-card v-else>
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
      v-model="selected"
      :headers="tableHeaders"
      :items="clients"
      :search="search"
      :single-select="false"
      item-key="id"
      show-select
      class="elevation-1"
      :loading="isLoad"
    >
      <!-- <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ openedItem.fio }}</span>
              </v-card-title>
            </v-card>
          </v-dialog>
        </template> -->

      <template v-slot:item.organization> - </template>

      <template v-slot:item.email="{ item }">
        <a :href="`mailto:${item.email}`">{{ item.email }}</a>
      </template>
      <template v-slot:item.mobile="{ item }">
        <a :href="`tel:+${item.mobile}`">{{ item.mobile }}</a>
      </template>
      <template v-slot:item.registerDate="{ item }">
        {{ getCurrentDate(item.registerDate) }}
      </template>
      <!-- <template v-slot:item.clientCard="{ item }">
          <v-btn icon @click="openClientInfo(item)">
            <v-icon> mdi-account-details </v-icon>
          </v-btn>
        </template> -->
      <template v-slot:item.clientEdit="{ item }">
        <v-btn icon :to="`/client-detail/${item.id}`">
          <v-icon> mdi-account-edit </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <div class="text-center pt-2">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            Добавить клиента
          </v-btn>
        </div>
      </template>
      <CreateClientForm @create-client="updateTable" @close="dialog = false" />
    </v-dialog>
  </v-card>
</template>

<script>
import Axios from "axios";
import { GET_CLIENTS } from "@/api";

import CreateClientForm from "./CreateClientForm";

export default {
  name: "ClientsTable",

  components: { CreateClientForm },

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      clients: [],
      dialog: false,
      // openedItem: {},
      // openedIndex: -1,
      selected: [],
      tableHeaders: [
        {
          text: "Код клиента",
          value: "id",
          width: 200,
        },
        {
          text: "Профиль",
          value: "profile.name",
        },
        {
          text: "Организация",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Наценка, %",
          value: "profile.surCharge",
        },
        {
          text: "Сальдо, руб",
          value: "saldo.value",
        },
        {
          text: "ФИО",
          value: "fio",
        },
        {
          text: "Город",
          value: "city",
        },
        {
          text: "Контакты",
          value: "mobile",
        },
        {
          text: "Регистрация",
          value: "registerDate",
        },
        {
          text: "Ред.",
          value: "clientEdit",
          align: "center",
          sortable: false,
          width: 40,
        },
      ],
    };
  },

  methods: {
    // openClientInfo(client) {
    //   this.openedIndex = this.clients.indexOf(client);
    //   this.openedItem = Object.assign({}, client);
    //   this.dialog = true;
    // },
    // closeClientInfo() {
    //   this.dialog = false;
    //   this.$nextTick(() => {
    //     this.openedItem = {};
    //     this.openedIndex = -1;
    //   });
    // },
    getCurrentDate(date) {
      return new Date(date).toLocaleString("ru", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
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
    },
    updateTable() {
      this.getClients();
    },
  },

  created() {
    this.getClients();
  },

  watch: {
    dialog(val) {
      val || this.closeClientInfo();
    },
  },
};
</script>