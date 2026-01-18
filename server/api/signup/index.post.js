export default defineEventHandler(async (event) => {
  async function getNewId() {
    const keys = await storage.keys();
    const promises = keys.map((key) => storage.getItem(key));
    const users = await Promise.all(promises);

    if (users === undefined || users.length == 0) {
      return 0;
    } else {
      const userWithHighestId = users.reduce(function (prev, current) {
        return prev && prev.id > current.id ? prev : current;
      });
      return userWithHighestId.id === undefined ? 0 : userWithHighestId.id + 1;
    }
  }

  const body = await readBody(event);
  const storage = useStorage("userStore");
  if (!body.id) {
    body.id = await getNewId();
  }
  body.password = await hashPassword(body.password);
  await storage.setItem(body.id + ".json", body);
  return;
});
