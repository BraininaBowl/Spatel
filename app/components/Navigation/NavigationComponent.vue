<template>
  <nav>
    <ul>
      <li v-for="item in navItems" :key="item.to">
        <NuxtLink :to="item.to" class="nav_link link">{{
          item.label
        }}</NuxtLink>
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
}
</style>

<script setup>
defineProps({
  navItems: {
    type: Array,
    required: true,
  },
});
</script>
