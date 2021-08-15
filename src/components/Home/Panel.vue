<template>
  <div class="panel-container">
    <div class="p-d-flex p-jc-end">
      <Button label="Logout" @click="userLogout" />
    </div>
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
            :minDate="minDate"
            :maxDate="maxDate"
          />
        </div>
        <div class="p-col date-container">
          <Calendar
            :showWeek="true"
            v-model="endDate"
            dateFormat="yy-mm-dd"
            :minDate="minDate"
            :maxDate="maxDate"
          />
        </div>
      </div>
    </template>
    <!-- Filter by days -->
    <!-- Filter by hours -->
    <template v-if="filterBy == 'Hour'">
      <div class="p-grid">
        <h5>2. Choose a day:</h5>
        <div class="p-col">
          <Calendar
            v-model="selectedDay"
            dateFormat="yy-mm-dd"
            :showWeek="true"
            :minDate="minDate"
            :maxDate="maxDate"
          />
        </div>
      </div>
      <h5>3. Choose a range of hours (e.g. 14:00 - 15:00):</h5>
      <div class="p-grid">
        <div class="p-col">
          <Calendar
            v-model="startHour"
            :timeOnly="true"
            hourFormat="24"
            :stepMinute="60"
            :disabled="allHours"
            :class="{ 'p-invalid': !validHours && startHour && endHour }"
          />
        </div>
        <div class="p-col hour-container">
          <Calendar
            v-model="endHour"
            :timeOnly="true"
            hourFormat="24"
            :stepMinute="60"
            :disabled="allHours"
            :class="{ 'p-invalid': !validHours && startHour && endHour }"
          />
        </div>
      </div>
      <div class="p-grid">
        <div class="p-col">
          <h5>View all records of the day</h5>
          <InputSwitch v-model="allHours" class="p-ml-4" />
        </div>
      </div>
    </template>
    <!-- Filter by hours -->
    <Message severity="error" v-if="!validDates && startDate && endDate">
      the first date must be earlier
    </Message>
    <Message severity="error" v-if="!validHours && startHour && endHour">
      the first hour must be earlier
    </Message>
    <Button
      label="Search"
      class="p-mt-4"
      style="width: 100%"
      :disabled="!validSearch"
      @click="searchDates()"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, computed, watch } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "PanelComponent",
  setup() {
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      filterBy: "",
      options: ["Day", "Hour"],
      startDate: "",
      endDate: "",
      startHour: "",
      selectedDay: "",
      endHour: "",
      allHours: false,
    });

    const minDate = new Date("2021-05-01");
    const maxDate = new Date("2021-07-01");

    const validDates = computed(() =>
      moment(data.startDate).isSameOrBefore(data.endDate)
    );
    const validHours = computed(() =>
      moment(data.startHour).isSameOrBefore(data.endHour)
    );

    const validSearch = computed(() => {
      return (
        validDates.value ||
        validHours.value ||
        (data.allHours && data.selectedDay)
      );
    });

    function searchDates() {
      if (data.filterBy == "Hour") {
        store.dispatch("measurements/getRecordsByHours", {
          day: data.selectedDay,
          start: data.startHour,
          end: data.endHour,
          allHours: data.allHours,
        });
      } else {
        store.dispatch("measurements/GetRecordsByDays", {
          start: data.startDate,
          end: data.endDate,
        });
      }
    }

    function clear() {
      data.startDate = "";
      data.endDate = "";
      data.selectedDay = "";
      data.allHours = false;
      data.startHour = "";
      data.endHour = "";
      store.commit("measurements/clearResults");
    }

    function userLogout() {
      store.dispatch("userLogOut");
      router.push({ name: "Login" });
    }

    watch(
      () => data.filterBy,
      () => clear()
    );

    return {
      ...toRefs(data),
      validDates,
      validHours,
      searchDates,
      minDate,
      maxDate,
      validSearch,
      userLogout,
    };
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
