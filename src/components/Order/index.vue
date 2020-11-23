<template>
  <div>
    <OrdersTable :getMethod="GET_ORDERS" />
  </div>
</template>

<script>
import OrdersTable from "@/components/ClientDetail/Orders/OrdersTable";
import { GET_ORDERS } from "@/api";

export default {
  name: "client-orders",

  components: {
    OrdersTable,
  },

  data() {
    return {
      GET_ORDERS,
    };
  },
};
</script>