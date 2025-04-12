<template>
  <div>
    <div class="weekdays-header-container">
      <div class="weekday-header" v-for="day in weekdays" :key="day">{{ day }}</div>
    </div>
    <div class="calendar-grid">
      <calendar-day
        v-for="(day, index) in calendarDays"
        :key="index"
        :day="day.day"
        :type="day.type"
        :is-today="day.isToday"
        :is-selected="day.isSelected"
        :month="currentMonth"
        :year="currentYear"
        @select-day="onSelectDay"
        @add-expense="onAddExpense"
      />
    </div>
  </div>
</template>

<script>
import CalendarDay from './CalendarDay.vue'

export default {
  name: 'CalendarGrid',
  
  components: {
    CalendarDay
  },
  
  props: {
    currentMonth: {
      type: Number,
      required: true
    },
    currentYear: {
      type: Number,
      required: true
    },
    selectedDay: {
      type: Number,
      default: null
    }
  },
  
  data() {
    return {
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  },
  
  methods: {
    getDaysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate()
    },
    
    onSelectDay(day) {
      this.$emit('day-selected', day)
    },
    
    onAddExpense(date) {
      this.$emit('add-expense', date)
    }
  },
  
  computed: {
    calendarDays() {
      let allDays = []
      let firstDay = new Date(this.currentYear, this.currentMonth, 1)
      let startingDayOfWeek = firstDay.getDay()
      let daysInMonth = this.getDaysInMonth()
      let today = new Date()

      // Add days from the previous month
      for (let i = 0; i < startingDayOfWeek; i++) {
        let prevMonth = new Date(this.currentYear, this.currentMonth, 0)
        let prevMonthDays = prevMonth.getDate()
        let day = prevMonthDays - startingDayOfWeek + i + 1

        allDays.push({
          day: day,
          type: 'prev-month',
        })
      }

      // Add days from the current month
      for (let day = 1; day <= daysInMonth; day++) {
        let isToday =
          day === today.getDate() &&
          this.currentMonth === today.getMonth() &&
          this.currentYear === today.getFullYear()

        allDays.push({
          day: day,
          type: 'current-month',
          isToday: isToday,
          isSelected: day === this.selectedDay,
        })
      }

      // Add days from the next month to complete the grid
      let totalDaysSoFar = allDays.length
      let remainingDaysInLastRow = totalDaysSoFar % 7
      let daysToAdd = remainingDaysInLastRow === 0 ? 0 : 7 - remainingDaysInLastRow

      for (let day = 1; day <= daysToAdd; day++) {
        allDays.push({
          day: day,
          type: 'next-month',
        })
      }

      return allDays
    }
  }
}
</script>

<style scoped>
.weekdays-header-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.weekday-header {
  flex: 1;
  text-align: center;
  font-weight: 500;
  padding: 8px 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-top: 10px;
}
</style>
