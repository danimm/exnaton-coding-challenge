<template>
  <div class="p-grid">
    <toolbar>
      <template #left>
        <Button label="New" icon="pi pi-plus" class="p-mr-2" />
        <Button label="Upload" icon="pi pi-upload" class="p-button-success" />
        <Button label="Filter the results" class="p-button-primary p-ml-2" />
      </template>
      <template #right>
        <Calendar :showWeek="true" />
      </template>
    </toolbar>
  </div>
  <div class="p-grid">
    <div class="p-col">
      <Chart type="bar" :data="basicData" height="150" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore();
    store.dispatch("getData");
    const basicData = ref({
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "#42A5F5",
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: "My Second dataset",
          backgroundColor: "#9CCC65",
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    });
    return { basicData };
  },
});
</script>
