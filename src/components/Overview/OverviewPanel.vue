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
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px 15px 0px 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
