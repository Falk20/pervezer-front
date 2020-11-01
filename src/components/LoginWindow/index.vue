<template>
  <v-card class="pa-4">
    <v-card-title>Авторизация</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="inputs.email"
          :rules="[rules.required, rules.email]"
          label="E-mail"
        ></v-text-field>
        <v-text-field
          v-model="inputs.password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="password"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show = !show"
        ></v-text-field>
        <v-btn
          block
          :disabled="!valid"
          color="success"
          class="mr-4 mt-6"
          @click="validate"
        >
          Log in
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "login-window",

  data() {
    return {
      valid: true,
      show: false,
      inputs: {
        email: "",
        password: ""
      },

      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>

<style lang="scss">
</style>