export const useRecipes = () => {
  const recipes = useState("recipes", () => []);
  const recipe = useState("recipe", () => null);
  const status = useState("status", () => null);

  async function fetchRecipes(sort) {
    const response = await $fetch("/api/recipes");
    let data = response.data.recipes;
    if (sort == "oldest") {
      data.sort((a,b) => new Date(a.added) - new Date(b.added))  
    }
    else if (sort == "edited") {
      data.sort((a,b) => new Date(b.edited) - new Date(a.edited))  
    } else {
      data.sort((a,b) => new Date(b.added) - new Date(a.added))
    }
    recipes.value = data;
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
