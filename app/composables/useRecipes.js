export const useRecipes = () => {
  const recipes = useState("recipes", () => []);
  const recipe = useState("recipe", () => null);
  const status = useState("status", () => null);

  async function fetchRecipes(sort) {
    let response = [];
    try {
      response = await $fetch(`/api/recipes/all`);
    } catch (error) {
      recipes.value = [];
    } finally {
      let data = response.data.recipes;
      if (sort == "oldest") {
        data.sort((a, b) => new Date(a.added) - new Date(b.added));
      } else if (sort == "edited") {
        data.sort((a, b) => new Date(b.edited) - new Date(a.edited));
      } else {
        data.sort((a, b) => new Date(b.added) - new Date(a.added));
      }
      recipes.value = data;
      status.value = response.status;
    }
  }

  async function fetchMyRecipes(sort) {
    let response = [];
    try {
      response = await $fetch(`/api/recipes/mine`);
    } catch (error) {
      recipes.value = [];
    } finally {
      let data = response.data.recipes;
      if (sort == "oldest") {
        data.sort((a, b) => new Date(a.added) - new Date(b.added));
      } else if (sort == "edited") {
        data.sort((a, b) => new Date(b.edited) - new Date(a.edited));
      } else {
        data.sort((a, b) => new Date(b.added) - new Date(a.added));
      }
      recipes.value = data;
      status.value = response.status;
    }
  }

  async function fetchTrashed(sort) {
    let response = [];
    try {
      response = await $fetch(`/api/recipes/trash`);
    } catch (error) {
      recipes.value = [];
    } finally {
      let data = response.data.recipes;
      if (sort == "oldest") {
        data.sort((a, b) => new Date(a.added) - new Date(b.added));
      } else if (sort == "edited") {
        data.sort((a, b) => new Date(b.edited) - new Date(a.edited));
      } else {
        data.sort((a, b) => new Date(b.added) - new Date(a.added));
      }
      recipes.value = data;
      status.value = response.status;
    }
  }

  async function fetchRecipe(id) {
    let response = [];
    try {
      response = await $fetch(`/api/recipe/${id}`);
    } catch (error) {
    } finally {
      recipe.value = response.data.recipe;
      status.value = response.status;
    }
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
    fetchMyRecipes,
    fetchRecipe,
    writeRecipe,
    recipes,
    recipe,
    status,
  };
};
