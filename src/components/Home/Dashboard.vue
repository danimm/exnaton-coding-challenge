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
export default {
  name: "Dashboard",
  data() {
    return {
      options: {
        responsive: true,
        stacked: true,
        normalized: true,
        animation: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: this.$store.getters["measurements/getChartTitle"],
          },
        },
      },
    };
  },
  computed: {
    getType() {
      return this.$store.getters["measurements/getTypeOfResults"];
    },
    getResults() {
      return this.$store.getters["measurements/getResults"];
    },
    formattedResults() {
      return {
        datasets: [
          {
            label: this.getType == "hour" ? "watts" : "Kw/h",
            data: this.getResults,
            backgroundColor: "#9CCC65",
            parsing: {
              xAxisKey: "date",
              yAxisKey: "total",
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #e1e8eb;
  height: 100vh;
}
</style>
