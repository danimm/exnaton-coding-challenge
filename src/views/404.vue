<template>
  <div class="container">
    <exnaton-card class="card">
      <template #title>
        <h3>Error 404</h3>
      </template>
      <template #content>
        <h3>Page not found</h3>
        <h3>Try to go to <router-link to="/login">login page</router-link></h3>
      </template>
    </exnaton-card>
  </div>
</template>

<script>
export default {
  name: "Error page",
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  .card {
    border-radius: 30px;
    text-align: center;
    padding: 50px;
    width: 400px;

    a {
      color: white;
    }
  }
}
</style>
