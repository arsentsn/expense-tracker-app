<template>
  <div class="overview-panel">
    <div class="sticky-container">
      <div class="tab-header">
        <div
          class="tab-item"
          :class="{ active: currentView === 'monthly' }"
          @click="switchToMonthlyView"
        >
          <h2 class="panel-title">Monthly Overview</h2>
        </div>
        <div
          v-if="selectedDate"
          class="tab-item"
          :class="{ active: currentView === 'daily' }"
          @click="switchToDailyView"
        >
          <h2 class="panel-title">{{ formattedDate }}</h2>
        </div>
      </div>
    </div>

    <div class="panel-content">
      <monthly-overview
        v-if="currentView === 'monthly'"
        :expenses="expenses"
        :categories="categories"
        :current-month="getCurrentMonth(viewingDate)"
        :current-year="getCurrentYear(viewingDate)"
      />

      <daily-overview
        v-else
        :expenses="expenses"
        :categories="categories"
        :selected-date="selectedDate"
        @add-expense="addExpense"
        @delete-expense="deleteExpense"
      />
    </div>
  </div>
</template>

<script>
import MonthlyOverview from './MonthlyOverview.vue'
import DailyOverview from './DailyOverview.vue'

export default {
  name: 'OverviewPanel',

  components: {
    MonthlyOverview,
    DailyOverview,
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
    viewingDate: {
      type: Date,
      default: () => new Date(), // Sensible default
    },
  },

  data() {
    return {
      currentView: 'monthly', // Default view is monthly
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

  watch: {
    selectedDate(newDate, oldDate) {
      // If a new date is selected and it's not null, switch to daily view
      if (
        newDate &&
        (!oldDate ||
          newDate.getDate() !== oldDate.getDate() ||
          newDate.getMonth() !== oldDate.getMonth() ||
          newDate.getFullYear() !== oldDate.getFullYear())
      ) {
        this.currentView = 'daily'
      }
    },
  },

  computed: {
    formattedDate() {
      if (!this.selectedDate) return ''
      return this.selectedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    },
  },

  methods: {
    getCurrentMonth(date = new Date()) {
      return date ? date.getMonth() : new Date().getMonth()
    },

    getCurrentYear(date = new Date()) {
      return date ? date.getFullYear() : new Date().getFullYear()
    },

    switchToDailyView() {
      this.currentView = 'daily'
    },

    switchToMonthlyView() {
      this.currentView = 'monthly'
    },

    addExpense(date) {
      this.$emit('add-expense', date)
    },

    deleteExpense(id) {
      this.$emit('delete-expense', id)
    },
  },
}
</script>

<style scoped>
.sticky-container {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  padding-top: 15px;
  margin-top: -15px; /* Compensate for panel padding */
  margin-left: -15px;
  margin-right: -15px;
  padding-left: 15px;
  padding-right: 15px;
}

.tab-header {
  display: flex;
  margin-bottom: 15px;
}

.tab-item {
  padding: 10px 15px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: background-color 0.2s;
}

.panel-title {
  font-size: 1.2rem;
}

.tab-item:hover {
  background-color: #000f6722;
}

.tab-item.active {
  background-color: #f0f0f0;
  font-weight: bold;
}

/* Panel Content Styles */
.panel-content {
  position: relative;
  z-index: 1;
}

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

  .sticky-container {
    padding-top: 10px;
    margin-top: -10px;
    margin-left: -10px;
    margin-right: -10px;
    padding-left: 10px;
    padding-right: 10px;
  }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .overview-panel {
    padding: 12px 12px 0px 12px;
    margin-bottom: 20px;
  }

  .sticky-container {
    padding-top: 12px;
    margin-top: -12px;
    margin-left: -12px;
    margin-right: -12px;
    padding-left: 12px;
    padding-right: 12px;
  }
}

/* Desktop (1024px and above) */
@media (min-width: 1024px) {
  .sticky-container {
    padding-top: 15px;
    margin-top: -15px; /* Match the padding of overview-panel */
  }

  .overview-panel {
    flex: 1;
    padding: 0px 15px;
    max-height: 85vh; /* Limit height on desktop */
    overflow-y: auto; /* Enable vertical scrolling */
  }

  .panel-content {
    padding-bottom: 15px; /* Add some space at the bottom */
  }
}
</style>
