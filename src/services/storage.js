/*
 * Expense Data Structure
 *
 * {
 *   id: string,           // Unique identifier (typically timestamp as string)
 *   name: string,         // Name/description of the expense
 *   amount: number,       // Amount in dollars (e.g., 15.99)
 *   date: string,         // ISO date string (e.g., "2025-04-13")
 *   category: string,     // Category ID (e.g., "food", "transport")
 * }
 */

const STORAGE_KEY = 'expense-tracker-data'

export default {
  saveExpenses(expenses) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  },

  readExpenses() {
    const expenses = localStorage.getItem(STORAGE_KEY)
    if (expenses) {
      return JSON.parse(expenses)
    } else {
      return []
    }
  },

  createExpense(expense) {
    const expenses = this.readExpenses()
    expenses.push(expense)
    this.saveExpenses(expenses)
  },

  updateExpense(id, updatedExpense) {
    const expenses = this.readExpenses()
    const index = expenses.findIndex((expense) => expense.id === id)
    if (index !== -1) {
      expenses[index] = { ...expenses[index], ...updatedExpense }
      this.saveExpenses(expenses)
      return true
    }
    return false
  },

  deleteExpense(id) {
    const expenses = this.readExpenses()
    const filteredExpenses = expenses.filter((expense) => expense.id !== id)
    if (filteredExpenses.length !== expenses.length) {
      this.saveExpenses(filteredExpenses)
      return true
    }

    return false
  },
}
