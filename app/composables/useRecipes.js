export const useRecipes = () => {
  const recipes = useState("recipes", () => []);
  const recipe = useState("recipe", () => null);
  const status = useState("status", () => null);

  async function fetchRecipes() {
    const response = await $fetch("/api/recipes");
    recipes.value = response.data.recipes;
    status.value = response.status;
  }

  async function fetchTrashed() {
    const response = await $fetch("/api/trashed");
    recipes.value = response.data.recipes;
    status.value = response.status;
  }

  async function fetchRecipe(id) {
    const response = await $fetch(`/api/recipe/${id}`);
    recipe.value = response.data.recipe;
    status.value = response.status;
  }

  async function writeRecipe(dataObject) {
    const response = await $fetch("/api/recipe/write", {
      method: "POST",
      body: dataObject,
    });
  }
  return {
    fetchRecipes,
    fetchTrashed,
    fetchRecipe,
    writeRecipe,
    recipes,
    recipe,
    status,
  };
};
