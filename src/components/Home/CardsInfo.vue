<template>
  <div class="cards-container">
    <!-- Min -->
    <exnaton-card class="card">
      <template #title>
        <h3>Minimum: {{ min.date }}</h3>
      </template>
      <template #content>
        <p>{{ `${min.total} ${type == "hour" ? "Watts" : "Kw/h"}` }}</p>
      </template>
    </exnaton-card>
    <!-- Average -->
    <exnaton-card class="card">
      <template #title>
        <h3>Average per {{ type }}</h3>
      </template>
      <template #content>
        <p>{{ `${avg} ${type == "hour" ? "Watts" : "Kw/h"}` }}</p>
      </template>
    </exnaton-card>
    <!-- Max -->
    <exnaton-card class="card">
      <template #title>
        <h3>Maximum: {{ max.date }}</h3>
      </template>
      <template #content style="padding: 0">
        <p>{{ `${max.total} ${type == "hour" ? "Watts" : "Kw/h"}` }}</p>
      </template>
    </exnaton-card>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "CardsInfo",
  setup() {
    const store = useStore();
    const max = computed(() => store.getters["measurements/getMax"]);
    const min = computed(() => store.getters["measurements/getMin"]);
    const avg = computed(() => store.getters["measurements/getAverage"]);
    const type = computed(() => store.getters["measurements/getTypeOfResults"]);
    return { max, min, avg, type };
  },
});
</script>

<style lang="scss" scoped>
.cards-container {
  // height: 100px;
  margin: 20px 0 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .card {
    text-align: center;
    min-height: 100px;
    h3 {
      margin: 0;
    }
    p {
      margin-top: 0;
      font-size: 38px;
    }
  }
}

@media screen and (max-width: 660px) {
  .cards-container {
    margin: 20px 0;
    .card {
      h3 {
        font-size: 18px;
      }
      p {
        font-size: 20px;
      }
    }
  }
}
</style>
