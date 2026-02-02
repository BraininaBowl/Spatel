export default defineEventHandler(async (event) => {
  // make sure user is logged in
  const { user } = await requireUserSession(event);

  const storage = useStorage("recipeStore");
  const keys = await storage.keys();
  const promises = keys.map((key) => storage.getItem(key));
  const allRecipes = await Promise.all(promises);
  const myRecipes = allRecipes.filter((el) => el.author === user.id)
  const recipes = myRecipes.filter((el) => el.trashed);
  return {
    status: "succes",
    data: { recipes },
  };
});
