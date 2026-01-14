<template>
  <main>
    <h1>Recipes</h1>
    <div class="loader" v-if="status == null">Loading...</div>
    <div class="loader" v-else-if="recipes.length == 0">No recipes found. <a href="/new">Create one</a></div>
    <section class="card_container" v-else>
      <CardComponent
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </section>
  </main>
</template>

<script setup>
const { recipes, status, fetchRecipes } = useRecipes();

onMounted(() => {
  fetchRecipes();
});
onUnmounted(() => {});
</script>

<style lang="css" scoped>
  .card_container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
</style>