<template>
  <main v-if="loggedIn">
    <h1>Trashed recipes</h1>
    <OverviewRecipesComponent pageType="trash" />
  </main>
  <main v-else>
    <h1>You shouldn't be here.</h1>
    <p><NuxtLink to="/">Return home</NuxtLink></p>
  </main>
</template>

<script setup>
const { loggedIn } = useUserSession();
</script>

<style lang="css" scoped></style>
