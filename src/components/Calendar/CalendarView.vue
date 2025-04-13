<template>
  <div class="calendar-container">
    <calendar-header
      :month="currentMonth"
      :year="currentYear"
      @previous-month="previousMonth"
      @next-month="nextMonth"
    />

    <calendar-grid
      :current-month="currentMonth"
      :current-year="currentYear"
      :selected-day="selectedDay"
      :expenses="expenses"
      @day-selected="selectDay"
      @add-expense="addExpenseForDay"
    />
  </div>
</template>

<script>
import CalendarHeader from './CalendarHeader.vue'
import CalendarGrid from './CalendarGrid.vue'

export default {
  name: 'CalendarView',

  components: {
    CalendarHeader,
    CalendarGrid,
  },

  props: {
    expenses: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      currentDate: new Date(),
      selectedDay: null,
    }
  },

  methods: {
    previousMonth() {
      const newDate = new Date(this.currentDate)
      newDate.setMonth(newDate.getMonth() - 1)
      this.currentDate = newDate
      this.$emit('month-changed', new Date(this.currentDate))
    },

    nextMonth() {
      const newDate = new Date(this.currentDate)
      newDate.setMonth(newDate.getMonth() + 1)
      this.currentDate = newDate
      this.$emit('month-changed', new Date(this.currentDate))
    },

    selectDay(day) {
      this.selectedDay = day
      let selectedDate = new Date(this.currentYear, this.currentMonth, day)
      this.$emit('day-selected', selectedDate)
    },

    addExpenseForDay(selectedDate) {
      this.$emit('add-expense', selectedDate)
    },
  },

  computed: {
    currentMonth() {
      return this.currentDate.getMonth()
    },

    currentYear() {
      return this.currentDate.getFullYear()
    },
  },
}
</script>

<style scoped>
.calendar-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

/* Mobile (375px - 767px) */
@media (max-width: 767px) {
  .calendar-container {
    padding: 10px;
  }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .calendar-container {
    padding: 12px;
  }
}

/* Desktop (1024px and above) */
@media (min-width: 1024px) {
  .calendar-container {
    flex: 2;
    padding: 15px;
  }
}
</style>
