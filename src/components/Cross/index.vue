<template>
  <v-card width="100%" class="d-flex flex-column align-center">
    <v-form
      ref="form"
      @submit.prevent="startSearch"
      class="pa-1 mb-12 cross-search"
      v-model="isValid"
    >
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Поиск"
        clearable
        @click:append="startSearch"
        :rules="[rules.required]"
      />
    </v-form>

    <v-data-table
      v-if="isStartSearch"
      :headers="tableHeaders"
      :items="crosses"
      item-key="id"
      class="elevation-1 cross-search-result"
      :loading="isLoad"
      no-data-text="найдено 0 подходящих деталей"
      loading-text="Идёт поиск..."
    ></v-data-table>
  </v-card>
</template>

<script>
import { GET_CROSSES } from "@/api";
import Axios from "axios";

export default {
  name: "cross",

  data() {
    return {
      isValid: false,

      search: "",

      isLoad: false,

      isStartSearch: false,

      crosses: [],

      tableHeaders: [
        { text: "Артикул", value: "article" },
        { text: "Модель", value: "model" },
        { text: "Цена", value: "price" },
        { text: "Код", value: "code" },
      ],

      rules: {
        required: (v) => !!v || "Чтобы начать поиск, необходимо ввести запрос",
      },
    };
  },

  methods: {
    async startSearch() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          this.isStartSearch = true;
          this.isLoad = true;
          const { data: crosses } = await Axios.get(GET_CROSSES, {
            params: {
              value: this.search,
            },
          });

          this.crosses = crosses;
        }
      } catch {
        alert("Не удалось совершить поиск");
      } finally {
        this.isLoad = false;
      }
    },
  },
};
</script>

<style lang="scss">
.cross-search {
  width: 500px;
}

.cross-search-result {
  width: 100%;
}
</style>