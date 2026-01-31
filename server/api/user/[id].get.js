export default defineEventHandler(async (event) => {
  const storage = useStorage("userStore");
  const id = getRouterParam(event, "id");
  let user = await storage.getItem(id + ".json");
  //delete user.password;
  return { user };
});
