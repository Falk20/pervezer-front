<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        v-for="discount in discounts"
        :key="discount.discountId"
      >
        <v-card>
          <v-card-title>
            Скидка {{ discount.discountPersent }}% при заказе от
            {{ discount.discountStarts }}
          </v-card-title>
          <v-btn color="red" dark @click="removeDiscount(discount)">
            <v-icon dark> mdi-delete </v-icon>
          </v-btn>
        </v-card>
      </v-col>
      <v-col
        class="d-flex justify-center align-center"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <template>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                width="100%"
                height="100%"
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon x-large dark>mdi-plus</v-icon>
              </v-btn>
            </template>
            <CreateDiscountForm
              @create-discount="updateTable"
              @close="close"
              :profileId="profileId"
            />
          </v-dialog>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { REMOVE_DISCOUNT } from "@/api";
import Axios from "axios";

import CreateDiscountForm from "./CreateDiscountForm";

export default {
  name: "discount-list",

  components: {
    CreateDiscountForm,
  },

  props: ["discounts", "profileId"],

  data() {
    return {
      dialog: false,
    };
  },

  methods: {
    close() {
      this.dialog = false;
    },

    updateTable() {
      this.$emit("update-table");
    },

    async removeDiscount(item) {
      try {
        const { status } = await Axios.post(REMOVE_DISCOUNT, {
          discountId: item.discountId,
        });

        if (status === 200) {
          this.$emit("delete-discount", {
            discount: item,
            profileId: this.profileId,
          });
        } else {
          throw new Error();
        }
      } catch {
        alert("Не удалось удалить скидку");
      }
    },
  },
};
</script>