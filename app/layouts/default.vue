<template>
  <div class="default_template">
    <NavigationComponent :nav-items="navItems" />
    <NuxtPage />
  </div>
</template>

<script setup>
const navItems = [
  {
    to: "/",
    label: "Recipes",
  },
  {
    to: "/New",
    label: "New recipe",
  },
];
</script>

<style lang="css" scoped>
.default_template {
  font-family: "PT Serif", serif;
  font-size: 14px;
  line-height: 1.4rem;
}
</style>
