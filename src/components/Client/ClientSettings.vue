<template>
<div>
  <v-container>
    <v-card>
      <v-card-title>{{currClient.fio}}</v-card-title>
      <v-card-text>

    <v-text-field
        v-model="currClient.clientId"
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
      <v-text-field
        
        label="Профиль"
        disabled
      ></v-text-field>
      <v-text-field
        v-model="currClient.fio"
        label="ФИО"
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
        ></v-switch>
      <v-text-field
        
        label="Статус"
      ></v-text-field>
      <v-text-field
        
        label="Регистрация"
      ></v-text-field>
      <v-text-field
        v-model="currClient.uRfacetype"
        label="Тип юр. лица"
      ></v-text-field>
      <v-text-field
        v-model="currClient.uRfacename"
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
import { GET_CLIENTTOUPDATE } from "@/api";
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
        clientId: "",
        fio: "",
        city: "",
        email: "",
        mobile: "",
        password: "",
        uRfacetype: "",
        uRfacename: "",
        inn: "",
        ogrn: "",
        okpo: "",
        uRaddress: "",
        allowSMS: true,
        userId: "",
        profileId: "",
      }
    };
  },

  methods:{
    async getClientToUpdate() {
      try {
        const { data: currClient } = await Axios
        .get(GET_CLIENTTOUPDATE + "?id=" + this.clientId);
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
    },
  },

  created() {
    this.getProfiles();
    this.getClientToUpdate();
  },
};
</script>