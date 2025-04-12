<template>
  <div class="calendar-navigation">
    <button class="directional-button" @click="$emit('previous-month')">&lt; Prev</button>
    <h2>{{ monthName }} {{ year }}</h2>
    <button class="directional-button" @click="$emit('next-month')">Next &gt;</button>
  </div>
</template>

<script>
export default {
  name: 'CalendarHeader',

  props: {
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },

  computed: {
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
      return monthNames[this.month]
    },
  },
}
</script>

<style scoped>
.calendar-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.directional-button {
  border-radius: 20px;
  border: none;
  background-color: #004467;
  padding: 8px 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}
</style>
