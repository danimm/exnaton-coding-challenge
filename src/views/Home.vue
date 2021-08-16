<template>
  <div class="grid-container">
    <div class="chart-container">
      <dashboard v-if="showChart" />
      <exnaton-progress-spinner v-if="loading" />
    </div>
    <div class="panel-container">
      <panel />
    </div>
  </div>
</template>

<script lang="ts">
import Dashboard from "@/components/Home/Dashboard.vue";
import Panel from "@/components/Home/Panel.vue";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { Dashboard, Panel },
  name: "Home",
  setup() {
    const store = useStore();
    const loading = computed(() => store.getters["loading"]);
    const results = computed(() => store.getters["measurements/getResults"]);

    const showChart = computed(() => !loading.value && results.value.length);

    return { loading, results, showChart };
  },
});
</script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-areas: "chart panel";
}
.chart-container {
  widows: 100%;
  grid-area: chart;
  padding: 20px 50px;
}
.panel-container {
  grid-area: panel;
}
.hero {
  width: 35rem;
  margin-bottom: 2em;
  padding: 2em;
}

@media screen and (max-width: 1024px) {
  .grid-container {
    grid-template-rows: minmax(1fr, 300px) 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
      "panel"
      "chart";
  }
}
@media screen and (max-width: 660px) {
  .chart-container {
    padding: 20px 20px;
  }
}
</style>
