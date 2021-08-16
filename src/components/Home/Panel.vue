<template>
  <div class="panel-container">
    <div class="user-info-container">
      <h3>
        Welcome <span v-if="user">{{ user.email }}</span>
      </h3>
      <exnaton-button label="Logout" @click="userLogout" />
    </div>
    <div class="filter-type-container">
      <h3 class="options-text">Options</h3>
      <h5>1. Select a filter type:</h5>
      <div class="select-container">
        <exnaton-select-button v-model="filterBy" :options="options" />
      </div>
    </div>
    <div class="filters">
      <!-- Filter by days -->
      <div class="filter-days-container" v-if="filterBy == 'Day'">
        <h5>2. Choose a range of dates:</h5>
        <div class="p-grid">
          <div class="p-col">
            <exnaton-calendar
              :showWeek="true"
              v-model="startDate"
              dateFormat="yy-mm-dd"
              :minDate="minDate"
              :maxDate="maxDate"
            />
          </div>
          <div class="p-col date-container">
            <exnaton-calendar
              :showWeek="true"
              v-model="endDate"
              dateFormat="yy-mm-dd"
              :minDate="minDate"
              :maxDate="maxDate"
            />
          </div>
        </div>
      </div>
      <!-- Filter by days -->
      <!-- Filter by hours -->
      <div class="filter-hours-container" v-if="filterBy == 'Hour'">
        <div class="p-grid">
          <h5>2. Choose a day:</h5>
          <div class="p-col">
            <exnaton-calendar
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
            <exnaton-calendar
              v-model="startHour"
              :timeOnly="true"
              hourFormat="24"
              :stepMinute="60"
              :disabled="allHours"
              :class="{
                'p-invalid':
                  !validHours && startHour && endHour && !validSearch,
              }"
            />
          </div>
          <div class="p-col hour-container">
            <exnaton-calendar
              v-model="endHour"
              :timeOnly="true"
              hourFormat="24"
              :stepMinute="60"
              :disabled="allHours"
              :class="{
                'p-invalid':
                  !validHours && startHour && endHour && !validSearch,
              }"
            />
          </div>
        </div>
        <div class="p-grid">
          <div class="p-col">
            <h5>View all records of the day</h5>
            <exnaton-input-switch v-model="allHours" class="p-ml-4" />
          </div>
        </div>
      </div>
      <!-- Filter by hours -->
    </div>
    <div class="actions-container">
      <exnaton-message
        severity="error"
        v-if="!validDates && startDate && endDate"
      >
        the first date must be earlier
      </exnaton-message>
      <exnaton-message
        severity="error"
        v-if="!validHours && startHour && endHour && !validSearch"
      >
        the first hour must be earlier
      </exnaton-message>
      <exnaton-button
        label="Search"
        class="p-mt-4"
        id="searchButton"
        style="width: 100%"
        :disabled="!validSearch"
        @click="searchDates()"
      />
    </div>
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

    const user = computed(() => store.getters["user"]);

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
      user,
    };
  },
});
</script>

<style lang="scss" scoped>
.panel-container {
  background-color: #17212f;
  height: 100vh;
  padding: 20px;

  .user-info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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
@media screen and (max-width: 1024px) {
  .panel-container {
    display: grid;
    height: auto;
    grid-template-rows: 50px 20% 1fr minmax(1fr, 20%);
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "userInfo userInfo userInfo"
      "filterType filterType filterType"
      "filters filters filters"
      "actions actions actions";

    .select-container {
      margin: 0 0 0 20px;
    }
    #searchButton {
      margin: 0 !important;
      margin-bottom: 20px;
    }
    .p-message .p-component .p-message-error {
      margin: 0 0 20px 0;
    }
    .user-info-container {
      grid-area: userInfo;
    }
    .filter-type-container {
      grid-area: filterType;
    }
    .filters {
      grid-area: filters;
      margin: 0;
    }
    .actions-container {
      grid-area: actions;
    }
    .options-text {
      display: none;
    }
  }
}
</style>
