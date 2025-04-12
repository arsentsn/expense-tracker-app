<template>
  <nav class="navigation-bar">
    <div class="logo">Expense Tracker</div>
    <button class="profile-button"><ProfileIcon /></button>
  </nav>
</template>

<script>
import ProfileIcon from './icons/ProfileIcon.vue'

export default {
  name: 'NavigationBar',
  components: { ProfileIcon },
}
</script>

<style scoped>
.navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.profile-button {
  border: none;
  background: none;
}
</style>
