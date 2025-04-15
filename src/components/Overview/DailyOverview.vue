components: { DeleteIcon },
<template>
  <div class="daily-overview">
    <!-- Total Expenses Card -->
    <div class="total-expenses-card">
      <h3>Total for {{ formattedDate }}</h3>
      <div class="amount">{{ formattedTotalExpenses }}€</div>
    </div>

    <!-- Daily Expenses List -->
    <div class="expenses-list" v-if="hasExpenses">
      <div v-for="expense in dayExpenses" :key="expense.id" class="expense-item">
        <div class="expense-icon">{{ getCategoryIcon(expense.category) }}</div>
        <div class="expense-info">
          <div class="expense-name">{{ expense.name }}</div>
          <div class="expense-category">{{ getCategoryName(expense.category) }}</div>
        </div>
        <div class="expense-amount">{{ formatAmount(expense.amount) }}€</div>
        <button class="delete-button" @click="deleteExpense(expense.id)">
          <DeleteIcon />
        </button>
      </div>
    </div>

    <!-- Categories for the day -->
    <div class="section" v-if="hasExpenses">
      <h3 class="categories-header">Categories</h3>
      <div v-for="category in dayCategories" :key="category.id" class="category-row">
        <div class="category-icon">{{ getCategoryIcon(category.id) }}</div>
        <div class="category-info">
          <div class="category-name">{{ getCategoryName(category.id) }}</div>
          <div class="category-amount">{{ formatAmount(category.amount) }}€</div>
        </div>
        <div class="category-percentage">{{ category.percentage }}%</div>
      </div>
    </div>

    <div class="no-expenses-message" v-if="!hasExpenses">
      <p>No expenses recorded for this day</p>
    </div>

    <!-- Add Expense Button -->
    <button class="add-expense-button" @click="addExpense">
      <span class="add-icon">+</span> Add Expense
    </button>
  </div>
</template>

<script>
import { formatCurrency } from '../../utils/formatters.js'
import DeleteIcon from '../icons/DeleteIcon.vue'

export default {
  name: 'DailyOverview',

  components: {
    DeleteIcon,
  },

  props: {
    expenses: {
      type: Array,
      default: () => [],
    },
    selectedDate: {
      type: Date,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },

  created() {
    window.addEventListener('resize', this.updateWindowWidth)
  },

  unmounted() {
    window.removeEventListener('resize', this.updateWindowWidth)
  },

  computed: {
    formattedDate() {
      return this.selectedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    },

    hasExpenses() {
      return this.dayExpenses.length > 0
    },

    isMobileView() {
      return this.windowWidth < 768
    },

    dayExpenses() {
      // Create a date string in the format YYYY-MM-DD for the selected date
      const selectedDateStr = this.selectedDate.toISOString().split('T')[0]

      // Filter expenses by matching the date string
      return this.expenses.filter((expense) => expense.date === selectedDateStr)
    },

    totalExpenses() {
      return this.calculateTotal(this.dayExpenses).toFixed(2)
    },

    formattedTotalExpenses() {
      const total = this.calculateTotal(this.dayExpenses)
      return formatCurrency(total, this.isMobileView)
    },

    dayCategories() {
      // Group expenses by category
      const categories = {}
      const total = this.calculateTotal(this.dayExpenses)

      if (total === 0) return []

      // Calculate per category
      this.dayExpenses.forEach((expense) => {
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
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },

    formatAmount(value) {
      return formatCurrency(value, this.isMobileView)
    },

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

    deleteExpense(id) {
      this.$emit('delete-expense', id)
    },

    addExpense() {
      this.$emit('add-expense', this.selectedDate)
    },
  },
}
</script>

<style scoped>
.daily-overview {
  width: 100%;
  position: relative;
}

.section {
  margin-bottom: 15px;
}

.section h3 {
  font-weight: 600;
  color: #333;
}

.categories-header {
  margin-bottom: 5px;
}

.total-expenses-card {
  background-color: var(--primary-color);
  color: white;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 15px;
}

.total-expenses-card h3 {
  margin-bottom: 5px;
  font-weight: 500;
  color: #ccc;
}

.amount {
  font-weight: bold;
}

.expenses-list {
  margin-bottom: 15px;
}

.expense-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.expense-item:last-child {
  border-bottom: none;
}

.expense-icon {
  margin-right: 10px;
  font-size: 1.3rem;
}

.expense-info {
  flex: 1;
}

.expense-name {
  font-weight: 500;
}

.expense-category {
  font-size: 0.85rem;
  color: #666;
  margin-top: 2px;
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
  color: #e74c3c; /* Red color for the SVG */
}

.delete-button:hover {
  opacity: 1;
}

.delete-icon {
  width: 16px;
  height: 16px;
}

.expense-amount {
  font-weight: bold;
  color: var(--primary-color);
}

.category-row {
  display: flex;
  align-items: center;
  border-radius: 8px;
  border-bottom: 1px solid #d6d6d65c;
  transition: background-color 0.2s;
  padding: 10px;
}

.category-row:hover {
  background-color: #f5f5f5;
}

.category-icon {
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  width: 40px;
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
  color: var(--primary-color);
  text-align: right;
}

.no-expenses-message {
  padding: 20px;
  text-align: center;
  color: #666;
  font-style: italic;
  border-radius: 8px;
  margin: 15px 0;
}

.add-expense-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  width: 100%;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-expense-button:hover {
  background-color: #00608e;
}

.add-icon {
  margin-right: 5px;
  font-weight: bold;
}

/* Mobile (375px - 767px) */
@media (max-width: 767px) {
  .section h3 {
    font-size: 1rem;
  }

  .total-expenses-card {
    padding: 12px;
  }

  .total-expenses-card h3 {
    font-size: 0.9rem;
  }

  .amount {
    font-size: 1.2rem;
  }

  .expense-icon {
    font-size: 1.2rem;
    width: 30px;
  }

  .expense-name {
    font-size: 0.9rem;
  }

  .expense-amount {
    font-size: 0.9rem;
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

  .selected-date {
    font-size: 1rem;
  }

  .section h3 {
    font-size: 1.1rem;
  }

  .total-expenses-card {
    padding: 14px;
  }

  .total-expenses-card h3 {
    font-size: 0.95rem;
  }

  .amount {
    font-size: 1.3rem;
  }

  .expense-icon {
    font-size: 1.4rem;
    width: 35px;
  }

  .expense-name {
    font-size: 0.95rem;
  }

  .expense-amount {
    font-size: 0.95rem;
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

  .selected-date {
    font-size: 1.1rem;
  }

  .section h3 {
    font-size: 1.2rem;
  }

  .total-expenses-card {
    padding: 15px;
  }

  .total-expenses-card h3 {
    font-size: 1rem;
  }

  .amount {
    font-size: 1.4rem;
  }

  .expense-icon {
    font-size: 1.5rem;
    width: 40px;
  }

  .expense-name {
    font-size: 1rem;
  }

  .expense-amount {
    font-size: 1rem;
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
