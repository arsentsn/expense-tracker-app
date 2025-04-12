<template>
  <div class="calendar-container">
    <div class="calendar-navigation">
      <button class="directional-button" @click="previousMonth">&lt; Prev</button>
      <h2>{{ monthName }} {{ currentYear }}</h2>
      <button class="directional-button" @click="nextMonth">Next &gt;</button>
    </div>
    <div class="weekdays-header-container">
      <div class="weekday-header" v-for="day in weekdays" :key="day">{{ day }}</div>
    </div>
    <div class="calendar-grid">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="calendar-day"
        :class="{
          'prev-month': day.type === 'prev-month',
          'next-month': day.type === 'next-month',
          today: day.isToday,
        }"
        @click="day.type === 'current-month' ? selectDay(day.day) : null"
      >
        {{ day.day }}
        <!-- Inline add expense button, only for current month days -->
        <button
          v-if="day.type === 'current-month'"
          class="add-expense-button"
          @click.stop="addExpenseForDay(day.day)"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarView',

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
    getDaysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate()
    },
    selectDay(day) {
      this.selectedDay = day
      let selectedDate = new Date(this.currentYear, this.currentMonth, day)
      this.$emit('day-selected', selectedDate)
    },

    addExpenseForDay(day) {
      const selectedDate = new Date(this.currentYear, this.currentMonth, day)
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
    monthName() {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      return monthNames[this.currentMonth]
    },
    weekdays() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    rowsNeeded() {
      let daysInMonth = this.getDaysInMonth()
      let paddingPrev = new Date(this.currentYear, this.currentMonth, 1).getDay()

      let firstRowDays = 7 - paddingPrev
      let remainingDays = daysInMonth - firstRowDays

      let completeWeeks = Math.floor(remainingDays / 7)

      let lastRowDays = remainingDays % 7

      let rows = 1 + completeWeeks

      if (lastRowDays > 0) {
        rows += 1
      }

      return rows
    },

    calendarDays() {
      let allDays = []
      let firstDay = new Date(this.currentYear, this.currentMonth, 1)
      let startingDayOfWeek = firstDay.getDay()
      let daysInMonth = this.getDaysInMonth()
      let today = new Date()

      for (let i = 0; i < startingDayOfWeek; i++) {
        let prevMonth = new Date(this.currentYear, this.currentMonth, 0)
        let prevMonthDays = prevMonth.getDate()
        let day = prevMonthDays - startingDayOfWeek + i + 1

        allDays.push({
          day: day,
          type: 'prev-month',
        })
      }

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
    },
  },
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

.calendar-navigation {
  display: flex;
  justify-content: space-between;
}

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

.directional-button {
  border-radius: 20px;
  border: none;
  background-color: #f16e20;
  padding: 4px 10px;
  color: white;
  font-weight: 600;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-top: 10px;
}

.calendar-day {
  text-align: left;
  padding: 4px 8px;
  border: 1px solid #eee;
  height: 80px;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
}

.calendar-day.prev-month,
.calendar-day.next-month {
  color: #ccc;
  background-color: #f9f9f9;
  cursor: default;
}

.calendar-day.today {
  font-weight: bold;
  border: 2px solid var(--primary-color, #4caf50);
}

.calendar-day.selected {
  background-color: rgba(76, 175, 80, 0.1);
}

.add-expense-button {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #f16e20;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  transition:
    opacity 0.3s ease,
    transform 0.2s,
    background-color 0.2s;
  z-index: 5;
}

.add-expense-button:hover {
  background-color: #e15e10;
  transform: scale(1.1);
}

.calendar-day:hover .add-expense-button {
  opacity: 1;
}

.calendar-day.prev-month .add-expense-button,
.calendar-day.next-month .add-expense-button {
  display: none;
}
</style>
