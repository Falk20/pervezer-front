<template>
<div>
  <v-container>
    <v-card>
      <v-card-title>{{currClient.fio}}</v-card-title>
      <v-card-text>

    <v-text-field
        v-model="currClient.id"
        label="Код клиента"
        disabled
      ></v-text-field>
    <v-text-field
        
        label="Организация"
        disabled
      ></v-text-field>
      <v-text-field
        v-model="currClient.email"
        label="Емаил"
      ></v-text-field>
      <v-text-field
        v-model="currClient.password"
        label="Пароль"
      ></v-text-field>
      <v-text-field
        
        label="Наценка"
        disabled
      ></v-text-field>
      <v-row>
        <v-text-field
        
        label="Профиль"
        disabled
      ></v-text-field>
      <v-combobox
      :items="profiles"
      item-key="id"
      item-text="name"
      >
      </v-combobox>
      </v-row>
      <v-text-field
        v-model="currClient.fio"
        label="ФИО"
      ></v-text-field>
      <v-text-field
        
        label="Регион"
      ></v-text-field>
      <v-text-field
        v-model="currClient.birthDate"
        label="Дата рождения"
      ></v-text-field>
      <v-text-field
        v-model="currClient.city"
        label="Город"
      ></v-text-field>
      <v-text-field
        v-model="currClient.mobile"
        label="Мобильный номер"
      ></v-text-field>
      <v-switch
      v-model="currClient.allowSMS"
      :label="currClient.allowSMS"
      ></v-switch>
      <v-text-field
        
        label="Статус"
      ></v-text-field>
      <v-text-field
        
        label="Регистрация"
      ></v-text-field>
      <v-text-field
        
        label="Тип юр. лица"
      ></v-text-field>
      <v-text-field
        
        label="Название юр.лица"
      ></v-text-field>
      <v-btn
      @click="updateClient()"
      block
      type="submit"
      >
      <span>Сохранить изменения</span>
      </v-btn>
      </v-card-text>
  </v-card>
  </v-container>
  </div>
</template>

<script>
import Axios from "axios";
import { GET_CURRCLIENT } from "@/api";
import { UPDATE_CLIENT } from "@/api";
import { GET_PROFILES } from "@/api";

export default {
  name: "ClientSettings",
  props:{
    clientId:{
      type: String,
      required:true
    }
  },
  data() {
    return {
      isLoad: true,
      isErr: false,
      dialog: false,
      profiles: null,
      currClient:{
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "fio": "петров сергей семенович",
        "city": "string",
        "email": "string",
        "mobile": "string",
        "password": "string",
        "birthDate": "2020-11-06T12:02:04.526Z",
        "allowSMS": true,
      }
    };
  },

  methods:{
    async getCurrClient() {
      try {
        const { data: currClient } = await Axios
        .get(GET_CURRCLIENT + "?id=" + this.clientId);

        this.currClient = currClient;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },
    async updateClient(){
        const {
          data: { result }
        } = await Axios.post(UPDATE_CLIENT, this.currClient);
        if (result === "success") {
          console.log(result);
        }
    },
    async getProfiles() {
        const { data: profiles } = await Axios.get(GET_PROFILES);

        this.profiles = profiles;
    }
  },

  created() {
    this.getCurrClient();
    // console.log(clientId);
    this.getProfiles();
  },
};
</script>