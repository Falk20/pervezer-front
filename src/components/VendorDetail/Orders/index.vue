<template>
  <div>
    <OrdersTable :getMethod="GET_VENDOR_ORDERS" />
  </div>
</template>

<script>
import OrdersTable from "./OrdersTable";
import { GET_VENDOR_ORDERS } from "@/api";

export default {
  name: "vendor-orders",

  components: {
    OrdersTable,
  },

  data() {
    return {
      GET_VENDOR_ORDERS,
    };
  },
};
</script>