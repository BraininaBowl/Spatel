export default defineEventHandler(async (event) => {
  async function getNewId() {
    const keys = await storage.keys();
    const promises = keys.map((key) => storage.getItem(key));
    const recipes = await Promise.all(promises);

    if (recipes === undefined || recipes.length == 0) {
      return 0;
    } else {
      const recipeWithHighestId = recipes.reduce(function (prev, current) {
        return prev && prev.id > current.id ? prev : current;
      });
      return recipeWithHighestId.id === undefined
        ? 0
        : recipeWithHighestId.id + 1;
    }
  }

  const body = await readBody(event);
  const storage = useStorage("recipeStore");
  if (!body.id) {
    body.id = await getNewId();
  }
  await storage.setItem(body.id + ".json", body);
  return;
});
