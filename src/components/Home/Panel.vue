<template>
  <div class="panel-container">
    <h3 class="p-text-white">Choose a range date to display</h3>
    <div class="p-grid">
      <div class="p-col">
        <Calendar :showWeek="true" v-model="startDate" dateFormat="yy-mm-dd" />
      </div>
      <div class="p-col date-container">
        <Calendar :showWeek="true" v-model="endDate" dateFormat="yy-mm-dd" />
      </div>
    </div>
    <Button label="Search" style="width: 100%" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "PanelComponent",
  setup() {
    const startDate = ref("");
    const endDate = ref("");
    return { startDate, endDate };
  },
});
</script>

<style lang="scss" scoped>
.panel-container {
  background-color: #17212f;
  height: 100vh;
  padding: 20px;

  .date-container {
    margin-bottom: 20px;
  }

  h3 {
    color: #eeeeee;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
}
</style>
