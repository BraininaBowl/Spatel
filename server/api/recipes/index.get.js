export default defineEventHandler(async (event) => {
  const storage = useStorage("recipeStore");
  const keys = await storage.keys();
  const promises = keys.map((key) => storage.getItem(key));
  const recipes = await Promise.all(promises);
  return {
    status: "succes",
    data: { recipes },
  };
});
