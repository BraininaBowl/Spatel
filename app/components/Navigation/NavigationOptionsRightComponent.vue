<template>
  <div v-if="loggedIn" class="submenu right">
    <p>{{ user.name }} | <a @click="clear">Logout</a></p>
  </div>
  <div v-else class="submenu right">
    <div class="item"><NuxtLink to="/login/">Login</NuxtLink></div>
    <div class="item"><NuxtLink to="/register/">Register</NuxtLink></div>
  </div>
</template>

<script setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();
</script>

<style lang="css" scoped></style>
