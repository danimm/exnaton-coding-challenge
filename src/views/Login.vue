<template>
  <div class="container">
    <card class="hero">
      <template #title>
        <h2 class="p-text-center">
          Wellcome to the <br />Exnaton Coding Challenge! ✌🏻
        </h2>
      </template>
      <template #content>
        <p>
          in this small app you will be able to know the consumption you have
          had with your solar energy system in just a few seconds.
        </p>
        <p>
          In order to visualize the data in a better way, I have created a panel
          with different filters according to the type of query you want to
          make.
        </p>
        <p>Enter your credentials to get started.</p>
        <div class="form-container">
          <span class="p-float-label p-inputtext-lg">
            <input-text type="text" v-model="username" />
            <label for="username">Username</label>
          </span>
          <span class="p-float-label p-inputtext-lg">
            <input-text type="password" v-model="password" />
            <label for="username">Password</label>
          </span>
          <Message v-if="loginError" severity="error">
            Wrong credentials
          </Message>
          <Button
            label="Login"
            class="p-button-rounded"
            style="width: 230px"
            @click="userLogin"
          />
        </div>
        <p class="p-text-center p-mt-4">
          Made with ❤️ <br />by Daniel Muñoz Martín
        </p>
      </template>
    </card>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "Login",
  setup() {
    const router = useRouter();
    const store = useStore();

    const username = ref("");
    const password = ref("");
    const loginError = computed(() => store.getters["loginError"]);

    async function userLogin() {
      try {
        await store.dispatch("userLogin", {
          email: username.value,
          password: password.value,
        });
        if (!loginError.value) {
          router.push({ name: "Home" });
        }
      } catch (e) {
        console.error(e.message);
      }
    }

    return {
      username,
      password,
      loginError,
      userLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  background-color: #e1e8eb;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    gap: 20px;
  }

  .hero {
    width: 45em;
    padding: 0 50px;
    border-radius: 30px;
  }
}
</style>
