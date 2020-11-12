<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isLoad">Load...</p>
    <p v-else-if="isErr">Error</p>
    <v-card v-else width="768">
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
        :items="requisites"
        item-key="id"
        :search="search"
      >
        <template v-slot:no-data>Нет реквизитов</template>
        <template v-slot:no-results>Нет таких реквизитов</template>

        <template v-slot:item.id="{ item }">
          <v-btn color="red" dark @click="removeRequisite(item)">
            <v-icon dark> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <template>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center pt-2">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Добавить реквизит
              </v-btn>
            </div>
          </template>
          <CreateRequisiteForm
            @create-requisite="addNewRequisite"
            @close="dialog = false"
          />
        </v-dialog>
      </template>
    </v-card>
  </div>
</template>

<script>
import { GET_CLIENT_REQUISITES, REMOVE_REQUISITE } from "@/api";
import Axios from "axios";

import CreateRequisiteForm from "./CreateRequisiteForm";

export default {
  name: "client-details-requisites",

  components: {
    CreateRequisiteForm,
  },

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      dialog: false,
      requisites: null,
      tableHeaders: [
        {
          text: "Клиентский счет",
          value: "kaccount",
        },
        {
          text: "Расчетный счет",
          value: "raccount",
        },
        {
          text: "Название банка",
          value: "bankName",
        },
        {
          text: "БИК банка",
          value: "bankBIC",
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
    async getRequisites() {
      try {
        const { data: requisites } = await Axios.get(GET_CLIENT_REQUISITES, {
          params: {
            id: this.$route.params.clientID,
          },
        });

        this.requisites = requisites;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },

    async removeRequisite(item) {
      try {
        const { status } = await Axios.post(REMOVE_REQUISITE, {
          requisiteId: item.id,
        });

        if (status === 200) {
          const itemIndex = this.requisites.indexOf(item);

          this.requisites.splice(itemIndex, 1);
        } else {
          throw new Error();
        }
      } catch {
        alert("Не удалось удалить ip");
      }
    },

    addNewRequisite() {
      this.getRequisites();
    },
  },

  created() {
    this.getRequisites();
  },
};
</script>
