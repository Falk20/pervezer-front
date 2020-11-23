<template>
  <v-data-table
    disable-pagination
    :headers="tableHeaders"
    :items="productsWithUniqueKey"
    item-key="key"
    hide-default-footer
    disable-sort
    class="order-products"
  />
</template>

<script>
export default {
  name: "orders-product-table",

  props: ["products"],

  data() {
    return {
      tableHeaders: [
        {
          text: "Код заказа",
          value: "id",
          width: "150px",
        },
        {
          text: "Клиент",
          value: "client",
          width: "100px",
        },
        {
          text: "Менеджер",
          value: "manager",
          width: "100px",
        },
        {
          text: "Поставщик",
          value: "vendor",
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
          text: "Стоимость клиента",
          value: "totalRealPrise",
          width: "50px",
        },
        {
          text: "Стоимость поставщика",
          value: "totalVendorPrise",
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