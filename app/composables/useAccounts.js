export const useAccounts = () => {
  async function checkLogin(dataObject) {
    let response = await $fetch("/api/user/login", {
      method: "POST",
      body: dataObject,
    });
    return response;
  }

  async function createUser(dataObject) {
    let response = await $fetch("/api/user/signup", {
      method: "POST",
      body: dataObject,
    });
    return response;
  }

  async function updateUser(dataObject) {
    let response = await $fetch("/api/user/update", {
      method: "POST",
      body: dataObject,
    });
    return response;
  }

  async function getUserData(id) {
    let response = await $fetch(`/api/user/${id}`);
    return response;
  }

  async function verifyUser(dataObject) {
    let response = await $fetch("/api/user/verify", {
      method: "POST",
      body: dataObject,
    });
    return response;
  }

  async function sendVerificationMail(id) {
    const dataObject = new Object();
    dataObject.id = id;
    dataObject.location = location.hostname;
    dataObject.verificationKey = await getRandomString(32);
    let response = await $fetch("/api/mail/verification", {
      method: "POST",
      body: dataObject,
    });
    return response;
  }

  return {
    checkLogin,
    createUser,
    updateUser,
    getUserData,
    sendVerificationMail,
    verifyUser,
  };
};
