<template>
  <main class="index">
    <h1>New recipe</h1>
    <FormRecipeComponent :recipe="new Object()" v-if="loggedIn" />
    <CardNotAllowedComponent v-else />
  </main>
</template>

<script setup>
const { loggedIn } = useUserSession();
</script>

<style lang="css" scoped></style>
