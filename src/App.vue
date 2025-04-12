<template>
  <div class="app-container">
    <NavigationBar />
    <div class="main-content">
      <CalendarView />
      <OverviewPanel />
    </div>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import CalendarView from './components/Calendar/CalendarView.vue'
import OverviewPanel from './components/Overview/OverviewPanel.vue'

export default {
  name: 'App',
  components: {
    NavigationBar,
    CalendarView,
    OverviewPanel,
  },
  data() {
    return {
      expenses: [],
      selectedDate: null,
    }
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
