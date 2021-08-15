<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$store.dispatch("checkAuth");
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
