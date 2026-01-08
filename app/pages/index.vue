<template>
  <main class="index">
    <h1>Recipes</h1>
    <div class="loader" v-if="!recipes.length">Loading...</div>
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
const { recipes, fetchRecipes } = useRecipes();

onMounted(() => {
  fetchRecipes();
});
onUnmounted(() => {});
</script>
