<template>
  <div class="modal-overlay" v-if="show" @click.self="closeModal">
    <div class="expense-modal">
      <h2 class="modal-title">Add New Expense</h2>

      <form @submit.prevent="submitExpense">
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
          <input
            type="number"
            id="expense-amount"
            placeholder="0.00"
            step="0.01"
            v-model="amount"
          />
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
          <button type="button" class="cancel-button" @click="closeModal">Cancel</button>
          <button type="submit" class="submit-button">Add Expense</button>
        </div>
      </form>
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
          date: this.date
            ? this.date.toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
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
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  width: 90%;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-title {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

input {
  width: 100%;
  border: 1px solid #e5e5e6;
  border-radius: 6px;
  background-color: #f7f7f8;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-group {
  margin-bottom: 20px;
}

.error-message {
  color: #ef4444;
  margin-top: 0.4rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.category-option {
  background-color: #f7f7f8;
  border: 1px solid #e5e5e6;
  border-radius: 6px;
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
  border-color: var(--primary-color);
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.cancel-button,
.submit-button {
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.cancel-button {
  background-color: #f0f0f0;
  color: #333;
}

.submit-button {
  background-color: var(--primary-color);
  color: white;
}

/* Mobile (375px - 767px) */
@media (max-width: 767px) {
  .expense-modal {
    padding: 1.2rem;
    max-width: 95%;
  }

  .modal-title {
    font-size: 1.3rem;
  }

  label {
    font-size: 0.85rem;
  }

  input {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  .error-message {
    font-size: 0.75rem;
  }

  .category-option {
    padding: 0.4rem;
    font-size: 13px;
  }

  .category-icon {
    font-size: 1.3rem;
  }

  .cancel-button,
  .submit-button {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .expense-modal {
    padding: 1.5rem;
    max-width: 500px;
  }

  .modal-title {
    font-size: 1.4rem;
  }

  label {
    font-size: 0.85rem;
  }

  input {
    padding: 0.65rem;
    font-size: 0.92rem;
  }

  .error-message {
    font-size: 0.78rem;
  }

  .category-option {
    padding: 0.45rem;
    font-size: 13.5px;
  }

  .category-icon {
    font-size: 1.4rem;
  }

  .cancel-button,
  .submit-button {
    padding: 0.7rem 1.3rem;
    font-size: 0.95rem;
  }
}

/* Desktop (1024px and above) */
@media (min-width: 1024px) {
  .expense-modal {
    padding: 2rem;
    max-width: 450px;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  label {
    font-size: 0.9rem;
  }

  input {
    padding: 0.7rem;
    font-size: 0.95rem;
  }

  .error-message {
    font-size: 0.8rem;
  }

  .category-option {
    padding: 0.5rem;
    font-size: 14px;
  }

  .category-icon {
    font-size: 1.5rem;
  }

  .cancel-button,
  .submit-button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
