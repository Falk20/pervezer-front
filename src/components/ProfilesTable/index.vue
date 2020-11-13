<template>
  <div>
    <p v-if="isLoad">Load...</p>
    <p v-else-if="isErr">Error</p>
    <template v-else>
      <v-data-table
        v-model="selected"
        :headers="tableHeaders"
        :items="profiles"
        :single-expand="true"
        item-key="id"
        show-select
        class="elevation-1"
        show-expand
        :expanded.sync="expanded"
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ openedItem.name }}</span>
              </v-card-title>
            </v-card>
          </v-dialog>
        </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <DiscountList
          :discounts="item.discounts"
          >
          </DiscountList>
        </td>
      </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
import Axios from "axios";
import { GET_PROFILES_TO_UPDATE } from "@/api";
import DiscountList from "./Discounts";

export default {
  name: "ProfilesTable",
  components:{
    DiscountList
  },
  data() {
    return {
      expanded: [],
      isLoad: true,
      isErr: false,
      profiles: null,
      dialog: false,
      openedItem: {},
      openedIndex: -1,
      selected: [],
      tableHeaders: [
        {
          text: "Код профиля",
          value: "profileId"
        },
        {
          text: "Название",
          value: "name"
        },
        {
          text: "Скидка",
          value: "surchrage"
        },
        {
          text: "Комментарий",
          value: "comment"
        },
      ]
    };
  },

  methods: {
    async getProfiles() {
      try {
        const { data: profiles } = await Axios.get(GET_PROFILES_TO_UPDATE);
        console.log(profiles);
        this.profiles = profiles;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },
  },

  created() {
    this.getProfiles();
  },

  watch: {
    dialog(val) {
      val || this.closeClientInfo();
    }
  }
};
</script>