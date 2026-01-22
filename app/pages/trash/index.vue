<template>
  <main >
    <h1>Trashed recipes</h1>
    <OverviewRecipesComponent pageType="trash" v-if="loggedIn" />
    <CardNotAllowedComponent v-else />
  </main>
</template>

<script setup>
const { loggedIn } = useUserSession();
</script>

<style lang="css" scoped></style>
