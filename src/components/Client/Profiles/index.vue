<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isErr">Error</p>
    <v-card width="100%" v-else>
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
        :items="profiles"
        item-key="profileId"
        :search="search"
        :loading="isLoad"
        show-expand
        single-expand
      >
        <template v-slot:no-data>Нет профилей</template>
        <template v-slot:no-results>Нет таких профилей</template>

        <template v-slot:item.remove="{ item }">
          <v-btn color="red" dark @click="removeProfile(item)">
            <v-icon dark> mdi-delete </v-icon>
          </v-btn>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <DiscountList
              :discounts="item.discounts"
              :profileId="item.profileId"
              @delete-discount="removeDiscount"
              @update-table="updateTable"
            />
          </td>
        </template>
      </v-data-table>

      <template>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center pt-2">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Добавить профиль
              </v-btn>
            </div>
          </template>
          <CreateProfileForm @create-profile="updateTable" @close="close" />
        </v-dialog>
      </template>
    </v-card>
  </div>
</template>

<script>
import { GET_PROFILES_TO_UPDATE, REMOVE_PROFILE } from "@/api";
import Axios from "axios";

import CreateProfileForm from "./CreateProfileForm";
import DiscountList from "./DiscountList";

export default {
  name: "client-details-profiles",

  components: {
    CreateProfileForm,
    DiscountList,
  },

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      dialog: false,
      profiles: [],

      tableHeaders: [
        {
          text: "ID",
          value: "profileId",
        },
        {
          text: "Название",
          value: "name",
        },
        {
          text: "Комментарий",
          value: "comment",
        },
        {
          text: "Наценка, %",
          value: "surchrage",
        },
        {
          text: "",
          value: "remove",
          sortable: false,
        },
      ],
    };
  },

  methods: {
    close() {
      this.dialog = false;
    },

    formatDate(date) {
      if (!date) return null;

      return new Date(date).toLocaleDateString("ru", {
        year: "numeric",
      });
    },

    async getProfiles() {
      try {
        const { data: profiles } = await Axios.get(GET_PROFILES_TO_UPDATE, {
          params: {
            id: this.$route.params.clientID,
          },
        });

        this.profiles = profiles;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },

    async removeProfile(item) {
      try {
        const { status } = await Axios.post(REMOVE_PROFILE, {
          profileId: item.profileId,
        });

        if (status === 200) {
          const itemIndex = this.profiles.indexOf(item);

          this.profiles.splice(itemIndex, 1);
        } else {
          throw new Error();
        }
      } catch {
        alert("Не удалось удалить профиль");
      }
    },

    removeDiscount({ discount, profileId }) {
      const profileIndex = this.profiles.findIndex(
        (profile) => profile.profileId === profileId
      );

      const discountIndex = this.profiles[profileIndex].discounts.indexOf(
        discount
      );

      this.profiles[profileIndex].discounts.splice(discountIndex, 1);
    },

    updateTable() {
      this.getProfiles();
    },
  },

  created() {
    this.getProfiles();
  },
};
</script>
