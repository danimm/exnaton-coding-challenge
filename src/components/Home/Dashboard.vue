<template>
  <div class="container">
    <Chart type="bar" :data="results" :options="options" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Dashboard",
  props: {
    results: {
      required: true,
      type: Array,
    },
  },
  setup(props, ctx) {
    const options = {
      responsive: true,
      backgroundColor: "#9CCC65",
      parsing: {
        xAxisKey: "timestamp",
        yAxisKey: "consumption",
      },
    };
    return { options };
  },
});
</script>

<style lang="scss" scoped>
.container {
  background-color: #eeeeee;
  height: 100vh;
}
</style>
