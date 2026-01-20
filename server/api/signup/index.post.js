export default defineEventHandler(async (event) => {
  async function getNewId() {
    if (allUsers === undefined || allUsers.length == 0) {
      return 0;
    } else {
      const userWithHighestId = allUsers.reduce(function (prev, current) {
        return prev && prev.id > current.id ? prev : current;
      });
      return userWithHighestId.id === undefined ? 0 : userWithHighestId.id + 1;
    }
  }

  async function getUsers() {
    const keys = await storage.keys();
    const promises = keys.map((key) => storage.getItem(key));
    const allUsers = await Promise.all(promises);
    return allUsers;
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

  async function checkEmail(email) {
    let foundUser = false;
    allUsers.forEach((user) => {
      if (user.email === email) {
        foundUser = true;
      }
    });
    return foundUser;
  }

  async function checkUsername(username) {
    let foundUser = false;
    allUsers.forEach((user) => {
      if (user.username === username) {
        foundUser = true;
      }
    });
    return foundUser;
  }

  const body = await readBody(event);
  const storage = useStorage("userStore");
  const whitelist = useStorage("userWhitelistStore");
  const blacklist = useStorage("userBlacklistStore");
  const allUsers = await getUsers();
  const whitelisted = await checkWhitelist(body.email);
  const blacklisted = await checkBlacklist(body.email);
  const duplicateEmail = await checkEmail(body.email);
  const duplicateUsername = await checkUsername(body.username);
  if (whitelisted === false || blacklisted === true) {
    return "Email address not allowed.";
  } else if (duplicateEmail === true) {
    return "Duplicate email";
  } else if (duplicateUsername === true) {
    return "Duplicate username";
  } else {
    if (!body.id) {
      body.id = await getNewId();
    }
    body.password = await hashPassword(body.password);
    await storage.setItem(body.id + ".json", body);
    return "Success";
  }
});
