<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isErr">Error</p>
    <v-card v-else width="400">
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
        :items="offices"
        item-key="id"
        :search="search"
        :loading="isLoad"
      >
        <template v-slot:no-data>Нет офисов</template>
        <template v-slot:no-results>Нет таких офисов</template>

        <template v-slot:item.id="{ item }">
          <v-btn color="red" dark @click="removeIp(item)">
            <v-icon dark> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <template>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center pt-2">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Добавить офис
              </v-btn>
            </div>
          </template>
          <CreateOfficeForm
            @create-office="addNewOffice"
            @close="dialog = false"
          />
        </v-dialog>
      </template>
    </v-card>
  </div>
</template>

<script>
import { GET_CLIENT_OFFICES, REMOVE_OFFICE } from "@/api";
import Axios from "axios";

import CreateOfficeForm from "./CreateOfficeForm";

export default {
  name: "client-details-offices",

  components: {
    CreateOfficeForm,
  },

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      dialog: false,
      offices: [],
      tableHeaders: [
        {
          text: "Офис",
          value: "office",
          width: "100%",
        },
        {
          text: "",
          value: "id",
          sortable: false,
        },
      ],
    };
  },

  methods: {
    async getOffices() {
      try {
        const { data: offices } = await Axios.get(GET_CLIENT_OFFICES, {
          params: {
            id: this.$route.params.clientID,
          },
        });

        this.offices = offices;
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

    openCreateIpDialog() {
      this.dialog = true;
    },

    async removeIp(item) {
      try {
        const { status } = await Axios.post(REMOVE_OFFICE, {
          officeId: item.id,
        });

        if (status === 200) {
          const itemIndex = this.offices.indexOf(item);

          this.offices.splice(itemIndex, 1);
        } else {
          throw new Error();
        }
      } catch {
        alert("Не удалось удалить ip");
      }
    },

    addNewOffice() {
      this.getOffices();
    },
  },

  created() {
    this.getOffices();
  },
};
</script>
