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

  async function checkWhitelist(email) {
    const keys = await whitelist.keys();
    const result = keys.includes(email);
    if (keys === undefined || keys.length == 0 || result) {
      return true;
    } else {
      return false;
    }
  }

  async function checkBlacklist(email) {
    const keys = await blacklist.keys();
    const result = keys.includes(email);
    return result;
  }

  function checkEmail(email) {
    let foundUser = false;
    allUsers.forEach((user) => {
      if (user.email === email && user.id != userData.id) {
        foundUser = true;
      }
    });
    return foundUser;
  }

  function checkname(name) {
    let foundUser = false;
    allUsers.forEach((user) => {
      if (user.name === name && user.id != userData.id) {
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

  let response = {};
  response.message = "Nothing to update.";
  response.type = "error";
  const body = await readBody(event);
  const newData = {};
  const storage = useStorage("userStore");
  const allUsers = await getUsers();
  const userData = await getUser();
  const whitelist = useStorage("userWhitelistStore");
  const blacklist = useStorage("userBlacklistStore");

  if (body.newPassword) {
    if (await verifyPassword(userData.password, body.oldPassword)) {
      if (userData.admin) {
        newData.admin = true;
      }
      newData.id = userSession.id;
      newData.email = userData.email;
      newData.name = userData.name;
      newData.password = await hashPassword(body.newPassword);
      await storage.setItem(newData.id + ".json", newData);
      await localSessionUpdate();
      response.message = "Password updated.";
      response.type = "success";
    } else {
      response.message = "Current password incorrect.";
      response.type = "error";
    }
  }

  if (body.email) {
    const whitelisted = await checkWhitelist(body.email);
    const blacklisted = await checkBlacklist(body.email);
    const duplicateEmail = checkEmail(body.email);
    const duplicatename = checkname(body.name);
    if (whitelisted === false || blacklisted === true) {
      response.message = "Email address not allowed.";
      response.type = "error";
    } else if (duplicateEmail === true) {
      response.message = "Duplicate email.";
      response.type = "error";
    } else if (duplicatename === true) {
      response.message = "Duplicate name.";
      response.type = "error";
    } else {
      if (userData.admin) {
        newData.admin = true;
      }
      newData.password = userData.password;
      newData.id = userSession.id;
      newData.email = body.email;
      newData.name = body.name;
      await storage.setItem(newData.id + ".json", newData);
      await localSessionUpdate();
      response.message = "Profile updated.";
      response.type = "success";
    }
  }

  return response;
});
