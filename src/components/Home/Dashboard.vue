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
            text: "Total of comsuption in Kw/h",
          },
        },
      },
    };
  },
  computed: {
    results() {
      return this.$store.getters["measurements/getResults"];
    },
    formattedResults() {
      return {
        datasets: [
          {
            label: "Kw/h",
            data: this.results,
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
  background-color: #eeeeee;
  height: 100vh;
}
</style>
