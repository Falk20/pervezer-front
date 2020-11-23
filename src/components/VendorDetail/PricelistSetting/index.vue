<template>
  <div class="d-flex flex-column align-center">
    <columnSetting />
    <newPriceAccepting />
  </div>
</template>

<script>
import columnSetting from "./columnSetting";
import newPriceAccepting from "./newPriceAccepting";

export default {
  name: "vendor-pricelist-setting",

  components: {
    columnSetting,
    newPriceAccepting,
  },
};
</script>