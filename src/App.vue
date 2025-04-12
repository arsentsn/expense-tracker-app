<template>
  <div class="app-container">
    <NavigationBar />
    <div class="main-content">
      <CalendarView @add-expense="openExpenseModal" />
      <OverviewPanel />
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
      selectedDate: null,
      showExpenseModal: false,
      dateForNewExpense: new Date(),
    }
  },
  methods: {
    saveNewExpense(expenseData) {
      this.expenses.push(expenseData)
      this.showExpenseModal = false
      // localStorage stuff later
      console.log('New expense added:', expenseData)
    },
    openExpenseModal(date) {
      this.dateForNewExpense = date
      this.showExpenseModal = true
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

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.app-container {
  margin: 0 auto;
  padding: 20px 40px;
  width: 100%;
}

.main-content {
  padding-top: 40px; /* Navigation bar height */
  display: flex;
  margin-top: 20px;
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
