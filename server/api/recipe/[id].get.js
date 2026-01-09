export default defineEventHandler(async (event) => {
  const storage = useStorage("recipeStore");
  const id = getRouterParam(event, 'id');
  const recipe = await storage.getItem(id + ".json");
  return {
    status: "succes",
    data: { recipe },
  };
});