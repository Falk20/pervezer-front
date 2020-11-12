<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isLoad">Load...</p>
    <p v-else-if="isErr">Error</p>
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
        :items="rekvizits"
        item-key="id"
        :search="search"
      >
        <template v-slot:no-data>Нет реквизитов</template>
        <template v-slot:no-results>Нет таких реквизитов</template>

        <template v-slot:item.id="{ item }">
          <v-btn color="red" dark @click="removeRekvizit(item)">
            <v-icon dark>
              mdi-delete
            </v-icon>
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
          <CreateRekvizitForm
            @create-rekvizit="addNewrekvizit"
            @close="dialog = false"
          />
        </v-dialog>
      </template>
    </v-card>
  </div>
</template>

<script>
import { GET_CLIENT_REKVIZITS, REMOVE_REKVIZIT } from "@/api";
import Axios from "axios";

import CreateRekvizitForm from "./CreateRekvizitForm";

export default {
  name: "client-details-rekvizits",

  components: {
    CreateRekvizitForm
  },

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      dialog: false,
      rekvizits: null,
      tableHeaders: [
        {
          text: "Реквизит",
          value: "kaccount",
          width: "100%"
        },
        {
          text: "",
          value: "id",
          sortable: false
        }
      ]
    };
  },

  methods: {
    async getRekvizits() {
      try {
        const { data: rekvizits } = await Axios.get(GET_CLIENT_REKVIZITS, {
          params: {
            id: this.$route.params.clientID
          }
        });

        this.rekvizits = rekvizits;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },

    openCreateIpDialog() {
      this.dialog = true;
    },

    async removeRekvizit(item) {
      try {
        const { status } = await Axios.post(REMOVE_REKVIZIT, {
          rekvizitId: item.id
        });

        if (status === 200) {
          const itemIndex = this.rekvizits.indexOf(item);

          this.rekvizits.splice(itemIndex, 1);
        } else {
          throw new Error();
        }
      } catch {
        alert("Не удалось удалить ip");
      }
    },

    addNewrekvizit() {
      this.getRekvizits();
    }
  },

  created() {
    this.getRekvizits();
  }
};
</script>
