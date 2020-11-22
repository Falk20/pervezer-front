<template>
  <div class="d-flex flex-column align-center">
    <p v-if="isErr">Error</p>
    <v-card v-else>
      <v-card-title>
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Поиск"
          single-line
          hide-details
          clearable
        />
      </v-card-title>

      <v-data-table
        :headers="tableHeaders"
        :items="cartItems"
        item-key="id"
        :search="search"
        :loading="isLoad"
      >
        <template v-slot:no-data>Нет товаров в корзине</template>
        <template v-slot:no-results>Нет таких товаров в корзине</template>

        <template v-slot:item.remove="{ item }">
          <v-btn color="red" dark @click="RemoveCartItem(item)">
            <v-icon dark> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <template>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center pt-2">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Добавить товар в корзину
              </v-btn>
            </div>
          </template>
          <AddCartItemForm
            @add-new-item="updateTable"
            @close="dialog = false"
          />
        </v-dialog>
        <v-dialog v-model="contractDialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center pt-2">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Создать заказ
              </v-btn>
            </div>
          </template>
          <CreateContractForm
            @create-contract="updateTable"
            @close="contractDialog = false"
          />
        </v-dialog>
      </template>
    </v-card>
  </div>
</template>

<script>
import { GET_CLIENT_CART, REMOVE_CART_ITEM } from "@/api";
import Axios from "axios";

import AddCartItemForm from "./AddCartItemForm";
import CreateContractForm from "./CreateContractForm";

export default {
  name: "client-details-cart",

  components: {
    AddCartItemForm,
    CreateContractForm,
  },

  data() {
    return {
      search: "",
      isLoad: true,
      isErr: false,
      dialog: false,
      contractDialog: false,
      cartItems: [],
      tableHeaders: [
        {
          text: "ID",
          value: "productId",
        },
        {
          text: "Модель",
          value: "productModel",
        },
        {
          text: "Поставщик",
          value: "vendorName",
        },
        {
          text: "Наценка, %",
          value: "surCharge",
        },
        {
          text: "Скидка, %",
          value: "discount",
        },
        {
          text: "Кол-во",
          value: "productCount",
        },
        {
          text: "Итоговая цена поставщика",
          value: "totalVendorCost",
        },
        {
          text: "Итоговая реальная цена",
          value: "totalRealCost",
        },
        {
          text: "Доставка, дни",
          value: "deliveryDuration",
        },
        {
          text: "",
          value: "remove",
          sortable: false,
        },
      ],
    };
  },

  methods: {
    async getCartItems() {
      try {
        const { data: cartItems } = await Axios.get(GET_CLIENT_CART, {
          params: {
            id: this.$route.params.clientID,
          },
        });

        this.cartItems = cartItems;
      } catch {
        this.isErr = true;
      } finally {
        this.isLoad = false;
      }
    },

    async RemoveCartItem(item) {
      try {
        const { status } = await Axios.post(REMOVE_CART_ITEM, {
          cartItemId: item.cartItemId,
        });

        if (status === 200) {
          const itemIndex = this.cartItems.indexOf(item);

          this.cartItems.splice(itemIndex, 1);
        } else {
          throw new Error();
        }
      } catch {
        alert("Не удалось удалить продукт из корзины");
      }
    },

    updateTable() {
      this.getCartItems();
    },
  },

  created() {
    this.getCartItems();
  },
};
</script>
