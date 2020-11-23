<template>
  <div class="d-flex flex-column align-center">
    <columnSetting />
  </div>
</template>

<script>
import columnSetting from "./columnSetting";

export default {
  name: "vendor-pricelist-setting",

  components: {
    columnSetting,
  },
};
</script>