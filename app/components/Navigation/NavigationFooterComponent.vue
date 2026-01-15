<template>
    <footer>
      <ul>
        <li>
          Made with <NuxtLink to="https://github.com/BraininaBowl/recipes/tree/main" class="link">Spatel</NuxtLink>.
        </li>
      </ul>
    </footer>
</template>

<script setup>
</script>


<style lang="css" scoped>
  footer {
    border-top: 1px solid var(--col-border);
    padding: 1rem  0 0;
  }
  ul {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

