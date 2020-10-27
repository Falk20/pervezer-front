<template>
  <p>{{ $t("hello") }}</p>
</template>

<script>
export default {
  name: "HelloI18n"
};
</script>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  },
  "ru": {
    "hello": "Привет i18n !!"
  }
}
</i18n>
