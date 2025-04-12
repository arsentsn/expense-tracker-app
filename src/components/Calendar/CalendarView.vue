<template>
  <div class="calendar-container">
    <div class="calendar-navigation">
      <button @click="previousMonth">Prev</button>
      <h2>{{ monthName }} {{ currentYear }}</h2>
      <button @click="nextMonth">Next</button>
    </div>
    <div class="weekdays-header-container">
      <div class="weekday-header" v-for="day in weekdays" :key="day">{{ day }}</div>
    </div>
    <div class="calendar-grid">
      <div v-for="day in monthDays" :key="day" class="calendar-day">
        {{ day }}
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
    monthDays() {
      let days = []
      let totalDays = this.getDaysInMonth() // int

      for (let day = 1; day <= totalDays; day++) {
        days.push(day)
      }

      return days
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

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  text-align: center;
  padding: 10px;
  border: 1px solid #eee;
}
</style>
