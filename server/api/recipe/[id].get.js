import data from "../../data.json";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id');
  const recipes = data;
  const recipe = recipes.find(
        (recipe) => recipe.id === parseInt(id),
      );
  return {
    status: "succes",
    data: { recipe },
  };
});
