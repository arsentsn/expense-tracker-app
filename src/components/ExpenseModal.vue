<template>
  <div class="modal-overlay" v-if="show" @click.self="closeModal">
    <div class="expense-modal">
      <h2 class="modal-title">Add New Expense</h2>

      <div class="form-group">
        <label for="expense-name">Expense Name</label>
        <input
          type="text"
          id="expense-name"
          placeholder="e.g., Lunch, Coffee, Groceries..."
          v-model="expenseName"
        />
        <div v-if="nameError" class="error-message">{{ nameError }}</div>
      </div>

      <div class="form-group">
        <label for="expense-amount">Amount (€)</label>
        <input type="number" id="expense-amount" placeholder="0.00" step="0.01" v-model="amount" />
        <div v-if="amountError" class="error-message">{{ amountError }}</div>
      </div>

      <div class="form-group">
        <label>Category</label>
        <div class="category-grid">
          <div
            v-for="category in categories"
            :key="category.id"
            class="category-option"
            :class="{ selected: selectedCategory === category.id }"
            @click="selectCategory(category.id)"
          >
            <div class="category-icon">{{ category.icon }}</div>
            <div class="category-name">{{ category.name }}</div>
          </div>
        </div>
      </div>

      <div class="modal-actions">
        <button class="cancel-button" @click="closeModal">Cancel</button>
        <button class="submit-button" @click="submitExpense">Add Expense</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpenseModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: null,
    },
  },
  data() {
    return {
      expenseName: '',
      amount: '',
      selectedCategory: 'other',
      nameError: '',
      amountError: '',
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
    selectCategory(categoryId) {
      this.selectedCategory = categoryId
    },
    closeModal() {
      this.$emit('close')
    },
    validateForm() {
      let isValid = true

      // Validate name
      if (!this.expenseName.trim()) {
        this.nameError = 'Name is required'
        isValid = false
      } else {
        this.nameError = ''
      }

      // Validate amount
      if (!this.amount) {
        this.amountError = 'Amount is required'
        isValid = false
      } else if (isNaN(parseFloat(this.amount)) || parseFloat(this.amount) <= 0) {
        this.amountError = 'Amount must be a positive number'
        isValid = false
      } else {
        this.amountError = ''
      }

      return isValid
    },
    submitExpense() {
      if (this.validateForm()) {
        const expense = {
          id: Date.now().toString(),
          name: this.expenseName.trim(),
          amount: parseFloat(this.amount),
          category: this.selectedCategory,
          date: this.date ? this.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        }
        
        this.$emit('save', expense)
        this.resetForm()
        this.$emit('close')
      }
    },
    resetForm() {
      this.expenseName = ''
      this.amount = ''
      this.selectedCategory = 'other'
      this.nameError = ''
      this.amountError = ''
    },
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.expense-modal {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px var(--shadow-color);
  padding: 2rem;
  width: 90%;
  max-width: 450px;
  animation: slideIn-5e94698f 0.3s ease-out;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #e5e5e6;
  border-radius: 6px;
  background-color: #f7f7f8;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #004467;
}

.form-group {
  margin-bottom: 20px;
}

.error-message {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.4rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.categroy-name {
  font-size: 14px;
}

.category-option {
  background-color: #f7f7f8;
  border: 1px solid #e5e5e6;
  border-radius: 6px;
  padding: 0.5rem;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.category-option.selected {
  background-color: #f0f0f0;
  border-color: #004467;
}

.category-icon {
  font-size: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.cancel-button,
.submit-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.cancel-button {
  background-color: #f0f0f0;
  color: #333;
}

.submit-button {
  background-color: #004467;
  color: white;
}
</style>
