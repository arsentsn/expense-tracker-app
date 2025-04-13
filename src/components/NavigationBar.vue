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
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.logo {
  font-weight: bold;
  color: #333;
}

.profile-button {
  border: none;
  background: none;
}

/* Mobile (375px - 767px) */
@media (max-width: 767px) {
  .navigation-bar {
    padding: 8px 15px;
    height: 45px;
  }
  
  .logo {
    font-size: 1.2rem;
  }
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .navigation-bar {
    padding: 5px 20px;
    height: 45px;
  }
  
  .logo {
    font-size: 1.4rem;
  }
}

/* Desktop (1024px and above) */
@media (min-width: 1024px) {
  .navigation-bar {
    padding: 5px 40px;
    height: 45px;
  }
  
  .logo {
    font-size: 1.5rem;
  }
}
</style>
