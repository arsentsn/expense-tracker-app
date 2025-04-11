<template>
  <nav class="navigation-bar">
    <div class="logo">Expense Tracker</div>
    <div class="actions">
      <button class="settings-button">Settings</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
}
</script>

<style scoped>
.navigation-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.settings-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.settings-button:hover {
  background-color: #45a049;
}
</style>
