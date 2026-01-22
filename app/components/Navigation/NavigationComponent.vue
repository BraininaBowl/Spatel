<template>
  <nav>
    <div class="submenu left">
      <ul>
        <li>
          <NuxtLink to="/" class="nav_link link">All recipes</NuxtLink>
        </li>
        <li v-if="loggedIn">
          <NuxtLink to="/mine" class="nav_link link">My recipes</NuxtLink>
        </li>
        <li v-if="loggedIn">
          <NuxtLink to="/trash" class="nav_link link">Trashed recipes</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="submenu right">
      <ul>
        <li v-if="loggedIn">
          <NuxtLink to="/new" class="nav_link link button">New recipe</NuxtLink>
        </li>
      </ul>
    </div>
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

nav {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  align-items: center;
}
</style>

<script setup>
const { loggedIn } = useUserSession();
</script>
