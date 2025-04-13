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
  color: white;
  font-weight: 600;
  cursor: pointer;
}

/* Mobile (375px - 767px) */
@media (max-width: 767px) {
  .calendar-navigation h2 {
    font-size: 1.1rem;
  }
  
  .directional-button {
    padding: 6px 8px;
    font-size: 0.85rem;
  }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .calendar-navigation h2 {
    font-size: 1.2rem;
  }
  
  .directional-button {
    padding: 7px 10px;
    font-size: 0.9rem;
  }
}

/* Desktop (1024px and above) */
@media (min-width: 1024px) {
  .calendar-navigation h2 {
    font-size: 1.3rem;
  }
  
  .directional-button {
    padding: 8px 12px;
    font-size: 0.95rem;
  }
}
</style>
