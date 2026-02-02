export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const userSession = user;

  async function getUsers() {
    const keys = await storage.keys();
    const promises = keys.map((key) => storage.getItem(key));
    const allUsers = await Promise.all(promises);
    return allUsers;
  }

  async function getUser() {
    const userData = await storage.getItem(userSession.id + ".json");
    return userData;
  }

  async function checkAllow(email) {
    const keys = await Allow.keys();
    const result = keys.includes(email);
    if (keys === undefined || keys.length == 0 || result) {
      return true;
    } else {
      return false;
    }
  }

  async function checkDeny(email) {
    const keys = await Deny.keys();
    const result = keys.includes(email);
    return result;
  }

  function checkEmail(email) {
    let foundUser = false;
    allUsers.forEach((user) => {
      if (user.email === email && user.id != newData.id) {
        foundUser = true;
      }
    });
    return foundUser;
  }

  function checkname(name) {
    let foundUser = false;
    allUsers.forEach((user) => {
      if (user.name === name && user.id != newData.id) {
        foundUser = true;
      }
    });
    return foundUser;
  }

  async function localSessionUpdate() {
    await replaceUserSession(event, {
      user: {
        name: newData.name,
        email: newData.email,
        id: newData.id,
        admin: newData.admin,
      },
    });
  }

  function toSentenceCase(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const response = new Object();
  response.message = "Nothing to update.";
  response.type = "info";
  const body = await readBody(event);
  const storage = useStorage("userStore");
  const allUsers = await getUsers();
  const newData = await getUser();
  const Allow = useStorage("userAllowStore");
  const Deny = useStorage("userDenyStore");
  const changes = new Array();
  const errors = new Array();

  if (body.newPassword) {
    if (await verifyPassword(newData.password, body.oldPassword)) {
      newData.password = await hashPassword(body.newPassword);
      changes.push("password");
    } else {
      errors.push("current password incorrect");
    }
  }

  if (body.email && body.email != newData.email) {
    const Allowed = await checkAllow(body.email);
    const Denyed = await checkDeny(body.email);
    const duplicateEmail = checkEmail(body.email);
    if (Allowed === false || Denyed === true) {
      errors.push("email address not allowed");
    } else if (duplicateEmail === true) {
      errors.push("duplicate email");
      response.type = "error";
    } else {
      newData.email = body.email;
      changes.push("email");
    }
  }

  if (body.name && body.name != newData.name) {
    const duplicatename = checkname(body.name);
    if (duplicatename === true) {
      errors.push("duplicate name");
    } else {
      newData.name = body.name;
      changes.push("username");
    }
  }

  if (errors.length > 0) {
    response.message = toSentenceCase(errors.toString() + ".");
    response.type = "error";
  } else if (changes.length > 0) {
    response.message = toSentenceCase(changes.toString() + " updated.");
    response.type = "success";
  }

  await storage.setItem(newData.id + ".json", newData);
  await localSessionUpdate();
  return response;
});
