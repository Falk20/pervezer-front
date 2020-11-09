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
        :items="addresses"
        item-key="id"
        :search="search"
      >
        <template v-slot:no-data>Нет адресов</template>
        <template v-slot:no-results>Нет таких адресов</template>

        <template v-slot:item.id="{ item }">
          <v-btn color="red" dark @click="removeIp(item)">
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
                Добавить адрес
              </v-btn>
            </div>
          </template>
          <CreateAddressForm
            @create-address="addNewAddress"
            @close="dialog = false"
          />
        </v-dialog>
      </template>
    </v-card>
  </div>
</template>

<script>
import { GET_CLIENT_ADDRESSES, REMOVE_ADDRESS } from "@/api";
import Axios from "axios";

import CreateAddressForm from "./CreateAddressForm";

export default {
  name: "client-details-addresses",

  components: {
    CreateAddressForm
  },

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      dialog: false,
      addresses: null,
      tableHeaders: [
        {
          text: "Адрес",
          value: "address",
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
    async getAddresses() {
      try {
        const { data: addresses } = await Axios.get(GET_CLIENT_ADDRESSES, {
          params: {
            id: this.$route.params.clientID
          }
        });

        this.addresses = addresses;
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
        day: "numeric"
      });
    },

    openCreateIpDialog() {
      this.dialog = true;
    },

    async removeIp(item) {
      try {
        const { status } = await Axios.post(REMOVE_ADDRESS, {
          addressId: item.id
        });

        if (status === 200) {
          const itemIndex = this.addresses.indexOf(item);

          this.addresses.splice(itemIndex, 1);
        } else {
          throw new Error();
        }
      } catch {
        alert("Не удалось удалить ip");
      }
    },

    addNewAddress() {
      this.getAddresses();
    }
  },

  created() {
    this.getAddresses();
  }
};
</script>
