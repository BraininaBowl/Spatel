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

  async function checkEmail(email) {
    let foundUser = false;
    allUsers.forEach((user) => {
      if (user.email === email) {
        foundUser = true;
      }
    });
    return foundUser;
  }

  async function checkname(name) {
    let foundUser = false;
    allUsers.forEach((user) => {
      if (user.name === name) {
        foundUser = true;
      }
    });
    return foundUser;
  }

  let response = {};
  const body = await readBody(event);
  const storage = useStorage("userStore");
  const Allow = useStorage("userAllowStore");
  const Deny = useStorage("userDenyStore");
  const allUsers = await getUsers();
  const Allowed = await checkAllow(body.email);
  const Denyed = await checkDeny(body.email);
  const duplicateEmail = await checkEmail(body.email);
  const duplicatename = await checkname(body.name);
  if (Allowed === false || Denyed === true) {
    response.message = "Email address not allowed.";
    response.type = "error";
  } else if (duplicateEmail === true) {
    response.message = "Duplicate email.";
    response.type = "error";
  } else if (duplicatename === true) {
    response.message = "Duplicate name.";
    response.type = "error";
  } else {
    if (!body.id) {
      body.id = await getNewId();
    }
    body.password = await hashPassword(body.password);
    await storage.setItem(body.id + ".json", body);
    response.message = "Account created.";
    response.type = "success";
    await setUserSession(event, {
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    });
  }
  return response;
});
