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
    CalendarGrid
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
    },
    
    nextMonth() {
      const newDate = new Date(this.currentDate)
      newDate.setMonth(newDate.getMonth() + 1)
      this.currentDate = newDate
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
    }
  }
}
</script>

<style scoped>
.calendar-container {
  flex: 2;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
