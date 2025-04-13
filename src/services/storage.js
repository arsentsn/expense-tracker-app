/**
 * Expense Data Structure
 *
 * {
 *   id: string,           // Unique identifier (typically timestamp as string)
 *   name: string,         // Name/description of the expense
 *   amount: number,       // Amount in dollars (e.g., 15.99)
 *   date: string,         // ISO date string (e.g., "2025-04-13")
 *   category: string,     // Category ID (e.g., "food", "transport")
 *   notes: string         // Optional additional information
 * }
 */

const STORAGE_KEY = 'expense-tracker-data'

export default {
  saveExpenses(expenses) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  },

  getExpenses() {
    const expenses = localStorage.getItem(STORAGE_KEY)
    if (expenses) {
      return JSON.parse(expenses)
    } else {
      return []
    }
  },

  addExpense(expense) {
    const expenses = this.getExpenses()
    expenses.push(expense)
    this.saveExpenses(expenses)
  },

  updateExpense(id, updatedExpense) {
    const expenses = this.getExpenses()
    const index = expenses.findIndex((expense) => expense.id === id)
    if (index !== -1) {
      expenses[index] = { ...expenses[index], ...updatedExpense }
      this.saveExpenses(expenses)
      return true
    }
    return false
  },

  deleteExpense(id) {
    const expenses = this.getExpenses()
    const filteredExpenses = expenses.filter((expense) => expense.id !== id)
    if (filteredExpenses.length !== expenses.length) {
      this.saveExpenses(filteredExpenses)
      return true
    }

    return false
  },
}
