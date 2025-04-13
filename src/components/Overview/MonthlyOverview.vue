<template>
  <div class="monthly-overview">
    <div class="header">
      <h2 class="panel-title">Monthly Overview</h2>
    </div>

    <!-- Total Expenses Card -->
    <div class="total-expenses-card">
      <h3>Total Expenses</h3>
      <div class="amount">{{ totalExpenses }}€</div>
    </div>

    <!-- Weekly Spending Section -->
    <div class="section">
      <h3 class="weekly-spending-header">Weekly Spending</h3>
      <div v-for="(week, index) in weeklyExpenses" :key="index" class="week-row">
        <div class="week-label">Week {{ week.week }}</div>
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: week.percentage + '%' }"></div>
        </div>
        <div class="week-amount">
          {{ week.amount.toFixed(2) }}€ <span class="percentage">({{ week.percentage }}%)</span>
        </div>
      </div>
    </div>

    <!-- Top Categories Section -->
    <div class="section">
      <h3 class="top-categories-header">Top Categories</h3>
      <div v-for="category in topCategories" :key="category.id" class="category-row">
        <div class="category-icon">{{ getCategoryIcon(category.id) }}</div>
        <div class="category-info">
          <div class="category-name">{{ getCategoryName(category.id) }}</div>
          <div class="category-amount">{{ category.amount.toFixed(2) }}€</div>
        </div>
        <div class="category-percentage">{{ category.percentage }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonthlyOverview',

  props: {
    expenses: {
      type: Array,
      default: () => [],
    },
    categories: {
      type: Array,
      required: true,
    },
    currentMonth: {
      type: Number,
      default: () => new Date().getMonth(),
    },
    currentYear: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
  },

  computed: {
    currentMonthExpenses() {
      return this.expenses.filter((expense) => {
        const expenseDate = new Date(expense.date)
        return (
          expenseDate.getMonth() === this.currentMonth &&
          expenseDate.getFullYear() === this.currentYear
        )
      })
    },

    totalExpenses() {
      return this.calculateTotal(this.currentMonthExpenses).toFixed(2)
    },

    weeklyExpenses() {
      const total = this.calculateTotal(this.currentMonthExpenses)
      if (total === 0) return []

      // Group by week
      const weekMap = {}

      this.currentMonthExpenses.forEach((expense) => {
        // Get week number from date
        const date = new Date(expense.date)
        const weekNum = this.getWeekNumber(date)

        if (!weekMap[weekNum]) {
          weekMap[weekNum] = 0
        }

        weekMap[weekNum] += expense.amount
      })

      // Convert to array format
      const result = Object.keys(weekMap)
        .map((week) => {
          const amount = weekMap[week]
          const percentage = Math.round((amount / total) * 100)
          return { week, amount, percentage }
        })
        .sort((a, b) => a.week - b.week)

      // Renumber the weeks sequentially starting from 1
      return result.map((week, index) => ({
        ...week,
        week: index + 1,
      }))
    },

    topCategories() {
      // Group expenses by category
      const categories = {}
      const total = this.calculateTotal(this.currentMonthExpenses)

      if (total === 0) return []

      // Calculate per category
      this.currentMonthExpenses.forEach((expense) => {
        if (!categories[expense.category]) {
          categories[expense.category] = 0
        }
        categories[expense.category] += expense.amount
      })

      // Convert to array and sort
      return Object.keys(categories)
        .map((id) => {
          const amount = categories[id]
          const percentage = Math.round((amount / total) * 100)
          return { id, amount, percentage }
        })
        .sort((a, b) => b.amount - a.amount)
    },
  },

  methods: {
    calculateTotal(expenses) {
      return expenses.reduce((sum, expense) => sum + expense.amount, 0)
    },

    getCategoryName(categoryId) {
      const category = this.categories.find((c) => c.id === categoryId)
      return category ? category.name : 'Unknown'
    },

    getCategoryIcon(categoryId) {
      const category = this.categories.find((c) => c.id === categoryId)
      return category ? category.icon : '&#63;'
    },

    getWeekNumber(date) {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
      const pastDaysOfYear = (date - firstDayOfYear) / 86400000
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
    },

    getCurrentDay() {
      return new Date().getDate()
    },
  },
}
</script>

<style scoped>
.monthly-overview {
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.panel-title {
  margin: 0;
  font-weight: 600;
}

.date {
  color: #666;
}

.section {
  margin-bottom: 15px;
}

.section h3 {
  font-weight: 600;
  color: #333;
}

.weekly-spending-header {
  margin-bottom: 10px;
}

.top-categories-header {
  margin-bottom: 5px;
}

.total-expenses-card {
  background-color: #004467;
  color: white;
  border-radius: 8px;
  text-align: center;
}

.total-expenses-card h3 {
  margin-bottom: 5px;
  font-weight: 500;
  color: #ccc;
}

.amount {
  font-weight: bold;
}

.week-row,
.category-row {
  display: flex;
  align-items: center;
}

.week-row {
  margin-bottom: 5px;
}

.week-label {
  flex-shrink: 0;
  font-weight: 500;
}

.progress-container {
  flex: 1;
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #007ab6;
  border-radius: 5px;
}

.week-amount {
  text-align: right;
  font-weight: 500;
}

.percentage {
  color: #007ab6;
  font-weight: normal;
}

.category-row {
  border-radius: 8px;
  transition: background-color 0.2s;
}

.category-row:hover {
  background-color: #f5f5f5;
}

.category-icon {
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-info {
  flex: 1;
}

.category-name {
  font-weight: 600;
  margin-bottom: 3px;
}

.category-amount {
  color: #666;
}

.category-percentage {
  font-weight: bold;
  color: #004467;
  text-align: right;
}

/* Mobile (375px - 767px) */
@media (max-width: 767px) {
  .panel-title {
    font-size: 1.2rem;
  }

  .date {
    font-size: 0.9rem;
  }

  .section h3 {
    font-size: 1rem;
  }

  .total-expenses-card {
    padding: 12px;
    margin-bottom: 12px;
  }

  .total-expenses-card h3 {
    font-size: 0.9rem;
  }

  .amount {
    font-size: 1.2rem;
  }

  .progress-container {
    margin: 0 10px;
  }

  .week-amount {
    min-width: 80px;
    font-size: 0.8rem;
  }

  .category-row {
    padding: 8px;
  }

  .category-icon {
    font-size: 1.4rem;
    width: 30px;
  }

  .category-name {
    font-size: 0.9rem;
  }

  .category-amount {
    font-size: 0.8rem;
  }

  .category-percentage {
    min-width: 45px;
    font-size: 0.9rem;
  }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .panel-title {
    font-size: 1.3rem;
  }

  .date {
    font-size: 1rem;
  }

  .section h3 {
    font-size: 1.1rem;
  }

  .total-expenses-card {
    padding: 14px;
    margin-bottom: 14px;
  }

  .total-expenses-card h3 {
    font-size: 0.95rem;
  }

  .amount {
    font-size: 1.3rem;
  }

  .progress-container {
    margin: 0 12px;
  }

  .week-amount {
    min-width: 90px;
    font-size: 0.85rem;
  }

  .category-row {
    padding: 9px;
  }

  .category-icon {
    font-size: 1.6rem;
    width: 35px;
  }

  .category-name {
    font-size: 0.95rem;
  }

  .category-amount {
    font-size: 0.85rem;
  }

  .category-percentage {
    min-width: 50px;
    font-size: 0.95rem;
  }
}

/* Desktop (1024px and above) */
@media (min-width: 1024px) {
  .panel-title {
    font-size: 1.5rem;
  }

  .date {
    font-size: 1.1rem;
  }

  .section h3 {
    font-size: 1.2rem;
  }

  .total-expenses-card {
    padding: 15px;
    margin-bottom: 15px;
  }

  .total-expenses-card h3 {
    font-size: 1rem;
  }

  .amount {
    font-size: 1.4rem;
  }

  .progress-container {
    margin: 0 15px;
  }

  .week-amount {
    min-width: 100px;
    font-size: 0.9rem;
  }

  .category-row {
    padding: 10px;
  }

  .category-icon {
    font-size: 1.75rem;
    width: 40px;
  }

  .category-name {
    font-size: 1rem;
  }

  .category-amount {
    font-size: 0.9rem;
  }

  .category-percentage {
    min-width: 60px;
    font-size: 1rem;
  }
}
</style>
