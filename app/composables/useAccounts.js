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

  async function sendVerificationMail(id) {
    const dataObject = new Object;
    dataObject.userData = await getUserData(id);
    dataObject.location = location.hostname;
    dataObject.verificationKey = await getRandomString(32)
    let mailResponse = await $fetch("/api/mail/verification", {
      method: "POST",
      body: dataObject,
    });
    console.log(mailResponse.userData)
    let updateResponse =  updateUser(mailResponse.userData);
    return updateResponse;
  }

  return {
    checkLogin,
    createUser,
    updateUser,
    getUserData,
    sendVerificationMail,
  };
};
