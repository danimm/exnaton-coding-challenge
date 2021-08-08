<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Button label="Hello" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore();
    store.dispatch("getData");
    return {};
  },
});
</script>
