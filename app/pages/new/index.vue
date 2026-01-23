<template>
  <main class="index">
    <h1>New recipe</h1>
    <div class="page_options">
      <div class="submenu left"></div>
      <NavigationOptionsRightComponent />
    </div>
    <FormRecipeComponent :recipe="new Object()" v-if="loggedIn" />
    <CardNotAllowedComponent v-else />
  </main>
</template>

<script setup>
const { loggedIn } = useUserSession();
</script>

<style lang="css" scoped></style>
