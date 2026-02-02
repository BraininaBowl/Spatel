export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const storage = useStorage("userStore");
  let response = new Object();
  if (body.id === false || body.key === false) {
    response.message = "Incorrect link";
    response.type = "error";
  } else {
    const id = body.id;
    const key = body.key;
    let userData = await storage.getItem(id + ".json");
    if (await verifyPassword(userData.verificationKey, key)) {
      userData.verified = true;
      delete userData.verificationKey;
      await storage.setItem(id + ".json", userData);
      response.message = "Account verified!";
      response.type = "success";
    } else {
      response.message = "Incorrect key!";
      response.type = "error";
    }
  }
  return response;
});
