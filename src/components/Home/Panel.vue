<template>
  <div class="panel-container">
    <h3>Options</h3>
    <h5>1. Select a filter type:</h5>
    <div class="select-container">
      <SelectButton v-model="filterBy" :options="options" />
    </div>
    <!-- Filter by days -->
    <template v-if="filterBy == 'Day'">
      <h5>2. Choose a range of dates:</h5>
      <div class="p-grid">
        <div class="p-col">
          <Calendar
            :showWeek="true"
            v-model="startDate"
            dateFormat="yy-mm-dd"
          />
        </div>
        <div class="p-col date-container">
          <Calendar :showWeek="true" v-model="endDate" dateFormat="yy-mm-dd" />
        </div>
      </div>
    </template>
    <!-- Filter by days -->
    <template v-if="filterBy == 'Hour'">
      <h5>2. Choose a range of hours (e.g. 14:00 - 15:00):</h5>
      <div class="p-grid">
        <div class="p-col">
          <Calendar
            v-model="startHour"
            :timeOnly="true"
            hourFormat="24"
            :stepMinute="60"
          />
        </div>
        <div class="p-col hour-container">
          <Calendar
            v-model="endHour"
            :timeOnly="true"
            hourFormat="24"
            :stepMinute="60"
            class="p-invalid"
          />
        </div>
      </div>
    </template>
    <Message severity="error" v-if="!validDates && startDate && endDate">
      the first date must be earlier
    </Message>
    <Message severity="error" v-if="!validHours && startHour && endHour">
      the first hour must be earlier
    </Message>
    <Button
      label="Search"
      style="width: 100%"
      :disabled="!validDates && !validHours"
      @click="searchDates()"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";
export default defineComponent({
  name: "PanelComponent",
  setup() {
    const store = useStore();
    const data = reactive({
      filterBy: "",
      options: ["Day", "Hour"],
      startDate: "",
      endDate: "",
      startHour: "",
      endHour: "",
    });

    const validDates = computed(() =>
      moment(data.startDate).isSameOrBefore(data.endDate)
    );
    const validHours = computed(() =>
      moment(data.startHour).isSameOrBefore(data.endHour)
    );

    function searchDates() {
      if (data.filterBy) {
        store.dispatch("measurements/getRecordsByHours", {
          start: data.startHour,
          end: data.endHour,
        });
      } else {
        store.dispatch("measurements/getRecordsByMonths", {
          start: data.startDate,
          end: data.endDate,
        });
      }
    }

    return { ...toRefs(data), validDates, validHours, searchDates };
  },
});
</script>

<style lang="scss" scoped>
.panel-container {
  background-color: #17212f;
  height: 100vh;
  padding: 20px;

  .date-container,
  .hour-container {
    margin-bottom: 20px;
  }

  .select-container {
    margin: 20px 20px 20px 20px;
    display: inline-block;
  }

  h5 {
    display: inline-block;
  }

  h3,
  h5 {
    color: #eeeeee;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
}
</style>
