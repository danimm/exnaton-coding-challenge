<template>
  <div class="cards-info-conta">
    <cards-info />
  </div>
  <exnaton-chart
    ref="chart"
    type="bar"
    :data="formattedResults"
    :options="options"
  />
</template>

<script>
import CardsInfo from "./CardsInfo.vue";
export default {
  name: "Dashboard",
  components: { CardsInfo },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: true,
        normalized: true,
        animation: false,
        aspectRatio: 2,
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
    getAvg() {
      return this.$store.getters["measurements/getAverage"];
    },
    getResults() {
      return this.$store.getters["measurements/getResults"];
    },
    getAverageResults() {
      return this.$store.getters["measurements/getAverageResults"];
    },
    formattedResults() {
      return {
        datasets: [
          {
            label: this.getType == "hour" ? "watts" : "Kw/h",
            data: this.getResults,
            order: 1,
            backgroundColor: "#9CCC65",
            parsing: {
              xAxisKey: "date",
              yAxisKey: "total",
            },
          },
          // Eneable average line on chart
          {
            label: "Average",
            type: "line",
            order: 0,
            data: this.getAverageResults,
            borderColor: "#39A2DB",
            backgroundColor: "#39A2DB",
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
// .container {
//   background-color: #e1e8eb;
//   height: 100vh;
// }
</style>
