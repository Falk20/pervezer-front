<template>
  <v-card class="pa-4">
    <v-card-title>Авторизация</v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="login"
      >
        <v-text-field
          v-model="inputs.email"
          :rules="[rules.required]"
          label="E-mail"
        ></v-text-field>
        <v-text-field
          v-model="inputs.password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="show ? 'text' : 'password'"
          name="password"
          label="Password"
          @click:append="show = !show"
        ></v-text-field>
        <v-btn
          block
          type="submit"
          :disabled="!valid"
          color="success"
          class="mr-4 mt-6"
        >
          Log in
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import Axios from "axios";
import { AUTH } from "@/api/index.js";
import { mapMutations } from "vuex";
import { SET_IS_AUTHENTICATED } from "@/store/mutations";

export default {
  name: "login-window",

  data() {
    return {
      valid: true,
      show: false,
      inputs: {
        email: "",
        password: "",
      },

      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },

  methods: {
    ...mapMutations([SET_IS_AUTHENTICATED]),

    validate() {
      this.$refs.form.validate();
    },

    async login() {
      this.validate();

      if (this.valid) {
        const { data: result } = await Axios.post(AUTH, this.inputs);

        this[SET_IS_AUTHENTICATED](result);
      }
    },
  },
};
</script>

<style lang="scss"></style>
