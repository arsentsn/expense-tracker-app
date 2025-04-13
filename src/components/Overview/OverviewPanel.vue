<template>
  <div class="overview-panel">
    <monthly-overview
      :expenses="expenses"
      :categories="categories"
      :current-month="getCurrentMonth(selectedDate)"
      :current-year="getCurrentYear(selectedDate)"
    />
  </div>
</template>

<script>
import MonthlyOverview from './MonthlyOverview.vue'

export default {
  name: 'OverviewPanel',

  components: {
    MonthlyOverview,
  },

  props: {
    expenses: {
      type: Array,
      default: () => [],
    },
    selectedDate: {
      type: Date,
      default: null,
    },
  },

  data() {
    return {
      categories: [
        { id: 'food', name: 'Food', icon: '🍔' },
        { id: 'transport', name: 'Transport', icon: '🚗' },
        { id: 'bills', name: 'Bills', icon: '📄' },
        { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
        { id: 'shopping', name: 'Shopping', icon: '🛍️' },
        { id: 'other', name: 'Other', icon: '💰' },
      ],
    }
  },

  methods: {
    getCurrentMonth(date = new Date()) {
      return date.getMonth()
    },
    getCurrentYear(date = new Date()) {
      return date.getFullYear()
    },
  },
}
</script>

<style scoped>
.overview-panel {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

/* Mobile (375px - 767px) */
@media (max-width: 767px) {
  .overview-panel {
    padding: 10px 10px 0px 10px;
    margin-bottom: 20px;
  }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .overview-panel {
    padding: 12px 12px 0px 12px;
    margin-bottom: 20px;
  }
}

/* Desktop (1024px and above) */
@media (min-width: 1024px) {
  .overview-panel {
    flex: 1;
    padding: 15px 15px 0px 15px;
  }
}
</style>
