<template>
  <div class="container">
    <chart
      ref="chart"
      type="bar"
      :data="formattedResults"
      :options="options"
      :height="800"
      :width="900"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Dashboard",
  setup() {
    const store = useStore();
    const results = computed(() => store.getters["measurements/getResults"]);
    const formattedResults = ref({
      datasets: [
        {
          label: "Kw/h",
          data: results.value,
          backgroundColor: "#9CCC65",
          parsing: {
            xAxisKey: "date",
            yAxisKey: "total",
          },
        },
      ],
    });

    const options = ref({
      responsive: true,
      stacked: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Total of comsuption in Kw/h",
        },
      },
    });

    return { formattedResults, options };
  },
});
</script>

<style lang="scss" scoped>
.container {
  background-color: #eeeeee;
  height: 100vh;
}
</style>
