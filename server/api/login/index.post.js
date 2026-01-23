export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const storage = useStorage("userStore");
  const keys = await storage.keys();
  const promises = keys.map((key) => storage.getItem(key));
  const users = await Promise.all(promises);

  var user = users.filter(function (obj) {
    return obj.email === body.email;
  })[0];

  let response = {};

  if (user === undefined) {
    response.message = "Invalid credentials.";
    response.type = "error";
  } else {
    if (await verifyPassword(user.password, body.password)) {
      await setUserSession(event, {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      });
      response.message = "Login successful.";
      response.type = "success";
    } else {
      response.message = "Invalid credentials.";
      response.type = "error";
    }
  }
  return response;
});
