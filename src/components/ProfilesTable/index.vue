<template>
  <div>
    <p v-if="isLoad">Load...</p>
    <p v-else-if="isErr">Error</p>
    <template v-else>
<<<<<<< Updated upstream
      <v-row>
        <v-row class="rower">
            <v-col>
                    <h2>Профили по умолчанию</h2>
                    <span>Для оптовиков</span>
                    <v-select 
                    clearable
                    :v-model="select"
                    :items="profiles"
                    item-text="name"
                    class="elevation-select"
                    >
                    </v-select>
                    <span>Для розницы</span>
                    <v-select 
                    clearable
                    :v-model="select"
                    :items="profiles"
                    item-text="name"
                    class="elevation-select"
                    >
                    </v-select>
            </v-col>
            <v-col>
                    <h2>Менеджеры по умолчанию</h2>
                    <span>Для оптовиков</span>
                    <v-select 
                    clearable
                    :v-model="select"
                    :items="profiles"
                    item-text="name"
                    class="elevation-select"
                    >
                    </v-select>
                    <span>Для розницы</span>
                    <v-select 
                    clearable
                    :v-model="select"
                    :items="profiles"
                    item-text="name"
                    class="elevation-select"
                    >
                    </v-select>
            </v-col>
        </v-row>
=======
>>>>>>> Stashed changes
        <v-data-table
            v-model="selected"
            :headers="tableHeaders"
            :items="profiles"
            :single-select="false"
            item-key="id"
            show-select
            class="elevation-1">
        </v-data-table>
<<<<<<< Updated upstream
      </v-row>
=======
>>>>>>> Stashed changes
    </template>
  </div>
</template>

<script>
import Axios from "axios";
import { GET_PROFILES } from "@/api";

export default {
  name: "ProfilesTable",

  data() {
    return {
      isLoad: true,
      isErr: false,
      profiles: null,
      selected: [],
      tableHeaders: [
        {
          text: "Код профиля",
          value:"id"
        },
        {
          text: "Наименование",
          value: "name"
        },
        {
          text: "Комментарий",
          value: "comment"
        },
        {
          text: "Наценка",
          value: "surCharge"
        },
        {
          text: "Ред."
        },
        {
          text: "Коп"
        },
        {
          text: "Xls"
        },
        {
          text: "Цены"
        },
        {
          text: ""
        }
      ]
    };
  },

  methods: {
    async getProfiles() {
      try {
        const { data: profiles } = await Axios.get(GET_PROFILES);

        this.profiles = profiles;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    }
  },

  created() {
    this.getProfiles();
  }
};
</script>
<<<<<<< Updated upstream

<style scoped>
    .elevation-1{
        width:60%;
    }
    .rower{
        margin: 5px;
    }
</style>
=======
>>>>>>> Stashed changes
