<template>
  <v-card>
    <v-card-title>Новый товар в корзине</v-card-title>

    <v-form
      ref="form"
      @submit.prevent="saveNewItem"
      class="pa-1"
      v-model="isValid"
    >
      <v-container>
        <v-row>
          <v-col>
            <v-select
              v-model="inputs.productId"
              :items="products"
              item-text="model"
              item-value="id"
              :label="'Продукт'"
              :rules="[rules.required]"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model.number="inputs.count"
              label="Количество"
              type="number"
              min="1"
              :rules="[rules.required]"
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
              Создать
            </v-btn>
          </v-col>
          <v-col>
            <v-btn width="100%" type="button" @click="close">Отменить</v-btn>
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
        Не удалось добавить товар в корзину
      </v-alert>
      <v-alert
        v-model="isNotProducts"
        dense
        outlined
        type="error"
        dismissible
        transition="scale-transition"
      >
        Не удалось загрузить список товаров
      </v-alert>
      <v-alert
        v-model="isLimitExceeded"
        dense
        outlined
        type="error"
        dismissible
        transition="scale-transition"
      >
        Кол-во товара на складе: {{ maxCount }}
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import Axios from "axios";
import { CREATE_CART_ITEM, GET_PRODUCTS } from "@/api";

export default {
  name: "client-detail-add-cart-item-form",

  data() {
    return {
      isValid: true,

      inputs: {
        productId: "",
        count: "",
      },

      products: [],
      sending: false,
      isErr: false,
      isNotProducts: false,
      isLimitExceeded: false,

      rules: {
        required: (v) => !!v || "Обязательное поле",
      },
    };
  },

  computed: {
    maxCount() {
      if (this.inputs.productId) {
        return this.products.find((item) => item.id === this.inputs.productId)
          .count;
      }
      return 0;
    },
  },

  methods: {
    async getProducts() {
      try {
        const { data: products } = await Axios.get(GET_PRODUCTS);

        this.products = products;
      } catch {
        this.isNotProducts = true;
      }
    },

    async saveNewItem() {
      try {
        this.$refs.form.validate();

        if (this.isValid) {
          if (this.maxCount < this.inputs.count) {
            this.isLimitExceeded = true;
          } else {
            this.sending = true;

            const { status } = await Axios.post(CREATE_CART_ITEM, {
              ...this.inputs,
              clientId: this.$route.params.clientID,
            });

            if (status === 200) {
              this.$emit("add-new-item");

              this.close();
            }
          }
        }
      } catch {
        this.isErr = true;
      } finally {
        this.sending = false;
      }
    },
    close() {
      this.$emit("close");
      for (let key in this.inputs) {
        this.inputs[key] = "";
      }
    },
  },

  created() {
    this.getProducts();
  },
};
</script>