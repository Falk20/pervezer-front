<template>
  <div class="d-flex flex-column align-center">
    <v-card width="500">

      <v-data-table
        :headers="tableHeaders"
        :items="discounts"
        item-key="id"
      >
        <template v-slot:no-data>Скидок</template>

        <template v-slot:item.id="{ item }">
          <v-btn color="red" dark @click="removeDiscount(item)">
            <v-icon dark>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <template>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center pt-2">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Добавить скидку
              </v-btn>
            </div>
          </template>
        </v-dialog>
      </template>
    </v-card>
  </div>
</template>

<script>
import { REMOVE_DISCOUNT } from "@/api";
import Axios from "axios";

//import CreateDiscountForm from "./CreateDiscountForm";

export default {
  name: "client-profiles-discounts",

  components: {
  },
    props:{
        discounts:{}
    },
  data() {
    return {
      dialog: false,
      tableHeaders: [
        {
          text: "Скидка",
          width: "100%"
        },
        {
          text: "Скидка от",
          value: "discountStarts"
        },
        {
          text: "Процент скидки",
          value: "discountPersent"
        },
        {
          text: "",
          value: "id",
          sortable: false
        }
      ]
    };
  },

  methods: {
      async removeDiscount(item){
        try {
        const { status } = await Axios.post(REMOVE_DISCOUNT, {
          discountId: item.discountId
        });

        if (status === 200) {
          const itemIndex = this.discounts.indexOf(item);

          this.discounts.splice(itemIndex, 1);
        } else {
          throw new Error();
        }
      } catch {
        alert("Не удалось удалить ip");
      }
    },
  },
};
</script>
