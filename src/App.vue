<template>
  <div class="app-container">
    <NavigationBar />
    <div class="main-content">
      <CalendarView
        @add-expense="openExpenseModal"
        :expenses="expenses"
        @month-changed="updateSelectedMonth"
      />
      <OverviewPanel :expenses="expenses" :selected-date="selectedDate" />
    </div>
  </div>
  <ExpenseModal
    :show="showExpenseModal"
    :date="dateForNewExpense"
    @close="showExpenseModal = false"
    @save="saveNewExpense"
  />
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import CalendarView from './components/Calendar/CalendarView.vue'
import OverviewPanel from './components/Overview/OverviewPanel.vue'
import ExpenseModal from './components/ExpenseModal.vue'
import storageService from './services/storage.js'

export default {
  name: 'App',
  components: {
    NavigationBar,
    CalendarView,
    OverviewPanel,
    ExpenseModal,
  },
  data() {
    return {
      expenses: [],
      selectedDate: new Date(), // Initialize with current date
      showExpenseModal: false,
      dateForNewExpense: new Date(),
    }
  },

  created() {
    this.expenses = storageService.readExpenses()
  },
  methods: {
    saveNewExpense(expenseData) {
      this.expenses.push(expenseData)

      storageService.createExpense(expenseData)

      this.showExpenseModal = false

      console.log('New expense added:', expenseData)
    },
    openExpenseModal(date) {
      this.dateForNewExpense = date
      this.showExpenseModal = true
    },
    // New method to update selected month
    updateSelectedMonth(newDate) {
      this.selectedDate = newDate
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  margin: 0 auto;
  padding: 20px 40px;
  width: 100%;
}

.main-content {
  display: flex;
  margin-top: 40px; /* Navigation bar height */
  width: 100%;
  gap: 20px;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .app-container {
    padding: 5px;
  }
}
</style>
