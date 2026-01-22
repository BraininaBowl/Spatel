<template>
  <div class="page_options">
    <div class="submenu left">
      <div class="item">
        <label for="sorting">Sort:</label>
        <select name="sorting" id="sorting">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="edited">Recently updated</option>
        </select>
      </div>
    </div>
    <NavigationOptionsRightComponent />
  </div>
  <div class="loader" v-if="status == null">Loading...</div>
  <div class="empty_state" v-else-if="recipes.length == 0 && pageType != 'trash' && !loggedIn"
  >
    No recipes found. <a href="/login">Login</a> or <a href="/register">Register</a> to add one.
  </div>
  <div class="empty_state" v-else-if="recipes.length == 0 && pageType == 'main'"
  >
    No recipes found. <a href="/new">Create one</a>
  </div>
  <div
    class="empty_state"
    v-else-if="recipes.length == 0 && pageType == 'trash'"
  >
    No recipes in trash.
  </div>
  <div class="overview" v-else>
    <section class="card_container">
      <CardComponent
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
});
const pageType = props.pageType;
const { loggedIn, user } = useUserSession();
const { recipes, status, fetchRecipes, fetchTrashed, fetchMyRecipes } = useRecipes();

onMounted(async () => {
  function getRecipes(sort) {
    if (pageType == "main") {
      fetchRecipes(sort);
    } else if (pageType == "mine") {
      fetchMyRecipes(sort)
    } else if (pageType == "trash") {
      fetchTrashed(sort);
    }
  }
  getRecipes()
  const sorting = document.querySelector("#sorting");
  sorting.addEventListener("change", function () {
    getRecipes(sorting.value);
  });
});
onUnmounted(() => {});
</script>

<style lang="css" scoped>
.card_container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
</style>
