<template>
  <div class="p-flex">
    <div class="p-grid p-nogutter">
      <div class="p-col-8">
        <div class="chart-container">
          <dashboard v-if="showChart" />
          <exnaton-progress-spinner v-if="loading" />
        </div>
      </div>
      <div class="p-col-4">
        <panel />
      </div>
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
.chart-container {
  background-color: #e1e8eb;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hero {
  width: 35rem;
  margin-bottom: 2em;
  padding: 2em;
}
</style>
