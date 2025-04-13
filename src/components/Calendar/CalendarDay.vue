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
      <div class="expense-amount">{{ totalAmount }}€</div>
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

  computed: {
    hasExpenses() {
      return this.dayExpenses.length > 0
    },
    totalAmount() {
      return this.dayExpenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)
    },
  },

  methods: {
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
  padding: 4px 8px;
  border: 1px solid #e5e5e6;
  height: 80px;
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
  font-size: 12px;
  color: #3e3e3e;
}

.add-expense-button {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #004467;
  color: white;
  border: none;
  font-size: 14px;
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

.add-expense-button:hover {
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
  font-size: 0.9rem;
}

.expense-info {
  margin-top: 28px;
  text-align: center;
  font-size: 0.85rem;
}

.expense-amount {
  font-weight: 500;
  color: #004467;
  font-weight: bold;
}

.calendar-day.has-expenses {
  background-color: rgba(76, 175, 80, 0.1);
}
</style>
