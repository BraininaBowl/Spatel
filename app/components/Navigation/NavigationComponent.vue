<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/" class="nav_link link">All recipes</NuxtLink>
      </li>
      <li v-if="loggedIn">
        <NuxtLink to="/new" class="nav_link link">New recipe</NuxtLink>
      </li>
      <li  v-if="loggedIn">
        <NuxtLink to="/trash" class="nav_link link">Trashed recipes</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="css" scoped>
ul {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

<script setup>
const { loggedIn } = useUserSession();
</script>
