<template>
  <div>
    <div class="loader" v-if="!recipe">Loading...</div>
    <article class="recipe" v-else>
      <header>
        <h1 v-if="recipe.title">{{ recipe.title }}</h1>
        <div class="page_options">
          <div class="submenu left">
            <NuxtLink
              :to="`/${recipe.id}-${returnUri(recipe.title)}/edit`"
              v-if="loggedIn && user.id == recipe.author"
              >Edit</NuxtLink
            >
          </div>
          <NavigationOptionsRightComponent />
        </div>
      </header>
      <main>
        <section v-if="recipe.description">
          <p class="label">Description</p>
          <p class="area" v-html="stringToBreak(recipe.description)"></p>
        </section>
        <section v-if="recipe.ingredients">
          <p class="label">Ingredients</p>
          <ul v-html="stringToList(recipe.ingredients)"></ul>
        </section>
        <section v-if="recipe.instructions">
          <p class="label">Instructions</p>
          <ol v-html="stringToList(recipe.instructions)"></ol>
        </section>
        <section v-if="recipe.notes">
          <p class="label">Notes</p>
          <p class="area" v-html="stringToBreak(recipe.notes)"></p>
        </section>
      </main>
    </article>
  </div>
</template>

<script setup>
const { loggedIn, user } = useUserSession();
import { returnUri } from "~/layouts/default.vue";
const route = useRoute();
const recipeId = route.params.id;
const { recipe, fetchRecipe, fetchRecipes, writeRecipe } = useRecipes();
function stringToList(string) {
  const array = string ? string.split("\n") : [];
  const filtered = array.filter((item) => item.trim() !== "");
  return filtered.map((item) => `<li class="recipe-li">${item}</li>`).join("");
}
function stringToBreak(string) {
  return string.replace(/\n/g, "<br />");
}

onMounted(() => {
  fetchRecipe(recipeId);
});
</script>
<style lang="css" scoped>
.recipe {
  display: flex;
  flex-direction: column;
  gap: 0rem;
}
.recipe main {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  section {
    display: flex;
    flex-direction: column;
    gap: 0rem;

    p.area,
    ol,
    ul {
      border: 1px solid var(--col-border);
      background-color: var(--col-area-bg);
      border-radius: 4px;
      padding: 0.75rem 0.75rem;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    ol,
    ul {
      padding-left: 2rem;
    }
  }
}
</style>
