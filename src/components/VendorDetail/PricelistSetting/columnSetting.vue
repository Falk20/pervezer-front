<template>
  <v-card width="100%" class="mb-6">
    <v-form ref="form" @submit.prevent="updColSettings" v-model="isValid">
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="colSetting in colSettings"
            :key="colSetting.colSettingId"
          >
            <p>{{ colSetting.colName }}</p>

            <v-select
              v-model="colSetting.colNumber"
              :items="colNums"
              item-text="label"
              item-value="value"
              label="Номер колонки"
              clearable
              :rules="[rules.required]"
              @change="checkChoosen($event, colSetting.colSettingId)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              width="100%"
              type="submit"
              color="primary"
              :loading="sending"
            >
              Сохранить
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-alert
        v-model="isErr"
        dense
        outlined
        type="error"
        dismissible
        transition="scale-transition"
      >
        Не удалось сохранить изменения
      </v-alert>
      <v-alert
        v-model="isSuccess"
        dense
        text
        type="success"
        dismissible
        transition="scale-transition"
      >
        Изменения успешно сохранены
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import { GET_VENDOR_COL_SETTING, UPD_VENDOR_COL_SETTING } from "@/api";
import Axios from "axios";

export default {
  name: "pricelist-column-setting",

  data() {
    return {
      isValid: false,
      colSettings: [],
      colNums: [
        {
          value: 0,
          label: 1,
        },
        {
          value: 1,
          label: 2,
        },
        {
          value: 2,
          label: 3,
        },
        {
          value: 3,
          label: 4,
        },
        {
          value: 4,
          label: 5,
        },
        {
          value: 5,
          label: 6,
        },
        {
          value: 6,
          label: 7,
        },
      ],
      sending: false,

      isSuccess: false,
      isErr: false,

      rules: {
        required: (v) => v !== undefined || "",
      },
    };
  },

  methods: {
    checkChoosen(v, id) {
      let duplicate = this.colSettings.find((col) => {
        return col.colSettingId !== id && col.colNumber === v;
      });

      duplicate.colNumber = undefined;
    },

    async getColSettings() {
      try {
        const { data: colSettings } = await Axios.get(GET_VENDOR_COL_SETTING, {
          params: {
            id: this.$route.params.vendorID,
          },
        });

        this.colSettings = colSettings;
      } catch {
        alert("Не удалось загрузить настройки");
      }
    },

    async updColSettings() {
      try {
        this.$refs.form.validate();
        if (this.isValid) {
          this.sending = true;
          const { status } = await Axios.post(
            UPD_VENDOR_COL_SETTING,
            this.colSettings
          );

          if (status === 200) {
            this.getColSettings();
            this.isSuccess = true;
          }
        }
      } catch {
        this.isErr = true;
      } finally {
        this.sending = false;
      }
    },
  },

  created() {
    this.getColSettings();
  },
};
</script>