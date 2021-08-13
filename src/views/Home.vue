<template>
  <div class="p-flex">
    <div class="p-grid">
      <div class="p-col-8">
        <dashboard />
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
    const date = ref("");

    const basicData = ref({
      // labels: [xAxis],
      // labels: ["January", "February", "March", "April", "May", "June", "July"],
      // datasets: [
      //   {
      //     label: "May",
      //     data: may.value,
      //     backgroundColor: "#9CCC65",
      //     // parsing: {
      //     //   xAxisKey: "x",
      //     // },
      //   },
      //   {
      //     label: "June",
      //     data: june.value,
      //     backgroundColor: "#42A5F5",
      //     // parsing: {
      //     //   xAxisKey: "x",
      //     // },
      //   },
      //   {
      //     label: "July",
      //     data: july.value,
      //     backgroundColor: "#FFD371",
      //     // parsing: {
      //     //   xAxisKey: "x",
      //     // },
      //   },
      // ],
    });

    const options = ref({
      responsive: true,
    });
    return { basicData, options, date };
  },
});
</script>

<style lang="scss" scoped></style>
