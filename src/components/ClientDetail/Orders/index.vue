<template>
  <div>
    <OrdersTable :getMethod="GET_CLIENT_ORDERS" />
  </div>
</template>

<script>
import OrdersTable from "./OrdersTable";
import { GET_CLIENT_ORDERS } from "@/api";

export default {
  name: "client-orders",

  components: {
    OrdersTable,
  },

  data() {
    return {
      GET_CLIENT_ORDERS,
    };
  },
};
</script>