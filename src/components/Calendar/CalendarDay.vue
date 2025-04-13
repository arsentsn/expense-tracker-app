<template>
  <div
    class="calendar-day"
    :class="{
      'prev-month': type === 'prev-month',
      'next-month': type === 'next-month',
      today: isToday,
      selected: isSelected,
      'has-expenses': hasExpenses && type === 'current-month',
    }"
    @click="selectDay"
  >
    <div class="day-number">{{ day }}</div>

    <div v-if="hasExpenses" class="expense-info">
      <div class="expense-amount">{{ formattedAmount }}€</div>
    </div>
    <div v-if="hasExpenses">
      <div class="expense-count">({{ dayExpenses.length }})</div>
    </div>

    <button v-if="type === 'current-month'" class="add-expense-button" @click.stop="addExpense">
      +
    </button>
  </div>
</template>

<script>
import { formatCurrency } from '../../utils/formatters.js'

export default {
  name: 'CalendarDay',

  props: {
    day: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ['prev-month', 'current-month', 'next-month'].includes(value),
    },
    isToday: {
      type: Boolean,
      default: false,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    dayExpenses: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      windowWidth: window.innerWidth
    }
  },

  created() {
    window.addEventListener('resize', this.updateWindowWidth)
  },

  unmounted() {
    window.removeEventListener('resize', this.updateWindowWidth)
  },

  computed: {
    hasExpenses() {
      return this.dayExpenses.length > 0
    },
    totalAmount() {
      return this.dayExpenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)
    },
    isMobileView() {
      return this.windowWidth < 768
    },
    formattedAmount() {
      const total = this.dayExpenses.reduce((sum, expense) => sum + expense.amount, 0)
      return formatCurrency(total, this.isMobileView)
    }
  },

  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    selectDay() {
      if (this.type === 'current-month') {
        this.$emit('select-day', this.day)
      }
    },

    addExpense() {
      if (this.type === 'current-month') {
        const selectedDate = new Date(this.year, this.month, this.day)
        this.$emit('add-expense', selectedDate)
      }
    },
  },
}
</script>

<style scoped>
.calendar-day {
  text-align: left;
  border: 1px solid #e5e5e6;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
}

.calendar-day.prev-month,
.calendar-day.next-month {
  color: #ccc;
  background-color: #f9f9f9;
  cursor: default;
}

.calendar-day.today {
  font-weight: bold;
  border: 2px solid #4caf50;
}

.calendar-day.selected {
  outline: 2px solid #004467;
}

.calendar-day.selected .expense-amount,
.calendar-day.selected .day-number {
  font-weight: bold;
}

.expense-count {
  position: absolute;
  bottom: 2px;
  left: 4px;
  color: #3e3e3e;
}

.add-expense-button {
  position: absolute;
  bottom: 5px;
  right: 5px;
  border-radius: 50%;
  background-color: #004467;
  color: white;
  border: none;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  transition:
    opacity 0.3s ease,
    transform 0.2s,
    background-color 0.2s;
  z-index: 5;
}

.add-expense-button:hover,
.add-expense-button:active {
  background-color: #e15e10;
  transform: scale(1.1);
}

.calendar-day:hover .add-expense-button {
  opacity: 1;
}

.calendar-day.prev-month .add-expense-button,
.calendar-day.next-month .add-expense-button {
  display: none;
}

.day-number {
  position: absolute;
  top: 5px;
  left: 8px;
}

.expense-info {
  text-align: center;
}

.expense-amount {
  font-weight: 500;
  color: #004467;
  font-weight: bold;
}

.calendar-day.has-expenses {
  background-color: rgba(76, 175, 80, 0.1);
}

/* Mobile styles (375px - 767px) */
@media (max-width: 767px) {
  .calendar-day {
    padding: 2px 4px;
    height: 60px;
  }
  
  .day-number {
    font-size: 0.8rem;
    top: 3px;
    left: 5px;
  }
  
  .expense-info {
    margin-top: 22px;
    font-size: 0.7rem;
  }
  
  .expense-count {
    font-size: 0.65rem;
  }
  
  .add-expense-button {
    width: 16px;
    height: 16px;
    font-size: 12px;
    bottom: 3px;
    right: 3px;
  }
}

/* Tablet styles (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .calendar-day {
    padding: 3px 6px;
    height: 70px;
  }
  
  .day-number {
    font-size: 0.85rem;
    top: 4px;
    left: 6px;
  }
  
  .expense-info {
    margin-top: 25px;
    font-size: 0.8rem;
  }
  
  .expense-count {
    font-size: 0.7rem;
  }
  
  .add-expense-button {
    width: 18px;
    height: 18px;
    font-size: 13px;
    bottom: 4px;
    right: 4px;
  }
}

/* Desktop styles (1024px and above) */
@media (min-width: 1024px) {
  .calendar-day {
    padding: 4px 8px;
    height: 80px;
  }
  
  .day-number {
    font-size: 0.9rem;
  }
  
  .expense-info {
    margin-top: 28px;
    font-size: 0.85rem;
  }
  
  .expense-count {
    font-size: 0.75rem;
  }
  
  .add-expense-button {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
}
</style>
