export default defineEventHandler(async (event) => {
    const storage = useStorage("userStore");
    const id = getRouterParam(event, "id");
    const key = getRouterParam(event, "key");
    let user = await storage.getItem(id + ".json");
    let response = {};
    if (await verifyPassword(user.key, key)) {
    }
  });
  