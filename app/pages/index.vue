<template>
  <div class="loader" v-if="!recipes.length">Loading...</div>
  <main v-else>
    <h1>Recipes</h1>
    <section class="card_container">
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
