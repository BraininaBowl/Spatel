<template>
  <div class="submenu right">
    <div v-if="loggedIn">
    <p>{{ user.name }} | <a @click="clear">Logout</a></p>
    
  </div>
  <div v-else>
    <NuxtLink to="/login/">Login</NuxtLink></div>
  </div>
    
    
</template>

<script setup>
  const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()
</script>

<style lang="css" scoped>
</style>