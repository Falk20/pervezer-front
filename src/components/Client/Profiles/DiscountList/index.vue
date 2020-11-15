<template>
  <div>
    <div v-for="discount in discounts" :key="discount.discountId">
      Скидка {{ discount.discountPersent }}% при заказе от
      {{ discount.discountStarts }}
    </div>
  </div>
</template>

<script>
export default {
  name: "discount-list",

  props: ["discounts"],
};
</script>