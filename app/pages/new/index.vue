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
const { loggedIn, user } = useUserSession();
const { getUserData } = useAccounts();
const userData = await getUserData(user.value.id);
if (!userData.verified) {
  navigateTo("/profile");
}
</script>

<style lang="css" scoped></style>
