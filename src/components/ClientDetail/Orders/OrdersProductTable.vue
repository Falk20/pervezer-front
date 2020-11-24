<template>
  <v-data-table
    disable-pagination
    :headers="tableHeaders"
    :items="productsWithUniqueKey"
    item-key="key"
    hide-default-footer
    disable-sort
    class="order-products"
  >
  <template v-slot:item.changeStatus="{ item }">
        <v-row v-if="item.status === 'Обрабатывается'" disabled>
          <v-btn color="primary" class="mb-2" disabled>
              <span>Оплатить</span>
            </v-btn>
        </v-row>
        <v-row v-if="item.status === 'Ожидает оплаты'">
          <v-btn  color="primary" dark class="mb-1 mt-1" @click="payOrder(item.id)">
          <span>Оплатить</span>
        </v-btn>
        <v-btn  color="red" dark class="mb-1 mt-1" @click="rejectOrder(item.id)">
          <span>Отменить</span>
        </v-btn>
        </v-row>
        <v-row v-if="item.status === 'Оплачен'">
        <v-btn color="primary" class="mb-1 mt-1" disabled>
          <span>Получить</span>
        </v-btn>
        </v-row>
        <v-row v-if="item.status === 'Доставляется'">
        <v-btn color="primary" dark class="mb-1 mt-1" @click="closeOrder(item.id)">
          <span>Получить</span>
        </v-btn>
        </v-row>
  </template>
  </v-data-table>
</template>

<script>
import { PAY_ORDER, CLOSE_ORDER, REJECT_ORDER } from "@/api";
import Axios from "axios";
export default {
  name: "orders-product-table",

  props: ["products"],

  data() {
    return {
      tableHeaders: [
        {
          text: "Код заказа",
          value: "changeStatus",
          width: "280px",
        },
        {
          text: "Менеджер",
          value: "manager",
          width: "100px",
        },
        {
          text: "Код товара",
          value: "productId",
          width: "100px",
        },
        {
          text: "Описание товара",
          value: "prodDesc",
          width: "150px",
        },
        {
          text: "Доставка, дни",
          value: "deliveryDuration",
          width: "50px",
        },
        {
          text: "Кол-во товара",
          value: "count",
          width: "50px",
        },
        {
          text: "Стоимость",
          value: "totalRealPrise",
          width: "50px",
        },
        {
          text: "Статус",
          value: "status",
          width: "100px",
        },
      ],
    };
  },
	methods:{
    async payOrder(item) {
          const {status} = await Axios.post(PAY_ORDER, {
            orderProductId: item,
          });
          if (status === 200) {
            this.$emit("update-list");
          }
    },
    async rejectOrder(item) {
          const {status} = await Axios.post(REJECT_ORDER, {
            orderProductId: item,
          });
          if (status === 200) {
            this.$emit("update-list");
          }
    },
    async closeOrder(item) {
          const {status} = await Axios.post(CLOSE_ORDER, {
            orderProductId: item,
          });
          if (status === 200) {
            this.$emit("update-list");
          }
    },
    
  },
  computed: {
    productsWithUniqueKey() {
      return this.products.map((item, i) => {
        return { ...item, key: `${item.id}-${i}` };
      });
    },
  },
};
</script>

<style lang="scss">
.order-products {
  .v-data-table__wrapper {
    background: #eeeeee;
  }
}
</style>