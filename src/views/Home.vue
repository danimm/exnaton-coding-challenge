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
    <div class="p-col-11 offset-1">
      <Chart type="bar" :data="basicData" :options="options" :height="150" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore();
    store.dispatch("getData");
    const may = computed(() => store.state.may);
    const june = computed(() => store.state.june);
    const july = computed(() => store.state.july);
    // const xAxis =
    //   may.value.map((el: any) => el.x) +
    //   june.value.map((el: any) => el.x) +
    //   july.value.map((el: any) => el.x);

    // console.log(xAxis);

    const basicData = ref({
      // labels: [xAxis],
      // labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "May",
          data: may.value,
          backgroundColor: "#9CCC65",
          // parsing: {
          //   xAxisKey: "x",
          // },
        },
        {
          label: "June",
          data: june.value,
          backgroundColor: "#42A5F5",
          // parsing: {
          //   xAxisKey: "x",
          // },
        },
        {
          label: "July",
          data: july.value,
          backgroundColor: "#FFD371",
          // parsing: {
          //   xAxisKey: "x",
          // },
        },
      ],
    });

    const options = ref({
      responsive: true,
    });
    return { basicData, options };
  },
});
</script>
