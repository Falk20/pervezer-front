<template>
  <div class="d-flex flex-column align-center">
    <columnSetting />
    <BlackList />
    <newPriceAccepting />
  </div>
</template>

<script>
import columnSetting from "./columnSetting";
import newPriceAccepting from "./newPriceAccepting";
import BlackList from "./BlackList";

export default {
  name: "vendor-pricelist-setting",

  components: {
    columnSetting,
    newPriceAccepting,
    BlackList,
  },
};
</script>