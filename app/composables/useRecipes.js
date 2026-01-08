export const useRecipes = () => {
  const recipes = useState("recipes", () => []);
  const recipe = useState("recipe", () => null);

  async function fetchRecipes() {
    const response = await $fetch("/api/recipes");
    recipes.value = response.data.recipes;
  }

  async function fetchRecipe(id) {
    const response = await $fetch(`/api/recipe/${id}`);
    recipe.value = response.data.recipe;
  }

  async function createRecipe({ name, email }) {
    const response = await $fetch("/api/recipe", {
      method: "POST",
      body: { name, email },
    });
  }

  return {
    fetchRecipes,
    fetchRecipe,
    createRecipe,
    recipes,
    recipe,
  };
};
