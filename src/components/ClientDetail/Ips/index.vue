<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isErr">Error</p>
    <v-card v-else width="1024">
      <v-data-table
        :headers="tableHeaders"
        :items="ips"
        item-key="id"
        :loading="isLoad"
      >
        <template v-slot:no-data>Нет IP</template>

        <template v-slot:item.addingDate="{ item }">
          {{ formatDate(item.addingDate) }}
        </template>
        <template v-slot:item.isAutomatedAdded="{ item }">
          {{ item.isAutomatedAdded ? "Да" : "Нет" }}
        </template>
        <template v-slot:item.id="{ item }">
          <v-btn color="red" dark @click="removeIp(item)">
            <v-icon dark> mdi-delete </v-icon>
            Удалить
          </v-btn>
        </template>
      </v-data-table>

      <template>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center pt-2">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Добавить IP
              </v-btn>
            </div>
          </template>
          <CreateIpForm @create-ip="addNewIp" @close="dialog = false" />
        </v-dialog>
      </template>
    </v-card>
  </div>
</template>

<script>
import { GET_CLIENT_IPS, REMOVE_IP } from "@/api";
import Axios from "axios";

import CreateIpForm from "./CreateIpForm";

export default {
  name: "client-details-ips",

  components: {
    CreateIpForm,
  },

  data() {
    return {
      isLoad: true,
      isErr: false,
      dialog: false,
      ips: [],
      tableHeaders: [
        {
          text: "IP",
          value: "ip",
        },
        {
          text: "Дата добавления",
          value: "addingDate",
        },
        {
          text: "Дабавлено автоматически",
          value: "isAutomatedAdded",
        },
        {
          text: "Число сообщений",
          value: "messageCount",
        },
        {
          text: "",
          value: "id",
          sortable: false,
          width: 1,
        },
      ],
    };
  },

  methods: {
    async getIps() {
      try {
        const { data: ips } = await Axios.get(GET_CLIENT_IPS, {
          params: {
            id: this.$route.params.clientID,
          },
        });

        this.ips = ips;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    },

    async removeIp(item) {
      try {
        const { status } = await Axios.post(REMOVE_IP, {
          id: item.id,
        });

        if (status === 200) {
          const itemIndex = this.ips.indexOf(item);

          this.ips.splice(itemIndex, 1);
        } else {
          throw new Error();
        }
      } catch {
        alert("Не удалось удалить ip");
      }
    },

    addNewIp() {
      this.getIps();
    },
  },

  created() {
    this.getIps();
  },
};
</script>