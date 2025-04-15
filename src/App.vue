<template>
  <div class="app-container">
    <NavigationBar />
    <div class="main-content">
      <CalendarView
        @add-expense="openExpenseModal"
        :expenses="expenses"
        @month-changed="updateSelectedMonth"
        @day-selected="updateSelectedDay"
      />
      <OverviewPanel
        ref="overviewPanelRef"
        :expenses="expenses"
        :selected-date="selectedDate"
        :viewing-date="calendarViewingDate"
        @add-expense="openExpenseModal"
        @delete-expense="deleteExpense"
      />
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
      calendarViewingDate: new Date(),
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
      this.calendarViewingDate = newDate

      if (this.$refs.overviewPanelRef) {
        this.$refs.overviewPanelRef.switchToMonthlyView()
      }
    },

    updateSelectedDay(date) {
      this.selectedDate = date
    },

    deleteExpense(id) {
      // Find the expense index
      const index = this.expenses.findIndex((expense) => expense.id === id)
      if (index !== -1) {
        // Remove it from the array
        this.expenses.splice(index, 1)
        // Update storage
        storageService.deleteExpense(id)
      }
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
  width: 100%;
  max-width: 1400px;
}

.main-content {
  display: flex;
  flex-direction: column;
  margin-top: 45px; /* Navigation bar height */
  width: 100%;
  gap: 15px;
}

/* Mobile (375px - 767px) */
@media (max-width: 767px) {
  .app-container {
    padding: 10px;
  }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .app-container {
    padding: 15px 20px;
  }

  .main-content {
    gap: 20px;
  }
}

/* Desktop (1024px and above) */
@media (min-width: 1024px) {
  .app-container {
    padding: 20px 40px;
  }

  .main-content {
    flex-direction: row;
    gap: 25px;
  }
}
</style>
