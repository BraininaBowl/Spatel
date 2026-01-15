<template>
    <footer>
      <ul>
        <li>
          Powered by <NuxtLink to="https://github.com/BraininaBowl/spatel/" class="link">Spatel</NuxtLink>.
        </li>
      </ul>
    </footer>
</template>

<script setup>
</script>


<style lang="css" scoped>
  footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 2rem;
    padding: 0.5rem 0;
    border-top: 1px solid var(--col-border);
    border-bottom: 1px solid var(--col-border);
    margin: 2.5rem 0 1.5rem;
    width: 100%;
    bottom: 0px;
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

