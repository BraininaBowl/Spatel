export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const storage = useStorage("userStore");
  const keys = await storage.keys();
  const promises = keys.map((key) => storage.getItem(key));
  const users = await Promise.all(promises);

  var user = users.filter(function (obj) {
    return obj.email === body.email;
  })[0];

  if (await verifyPassword(user.password, body.password)) {
    console.log("User checks out!");
    const status = await setUserSession(event, {
      user: {
        name: user.username,
        email: user.email,
      },
    });
    return { succes: true, message: "Login successful" };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
});
