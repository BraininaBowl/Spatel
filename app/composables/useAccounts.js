export const useAccounts = () => {
  async function checkLogin(dataObject) {
    let response = await $fetch("/api/login", {
      method: "POST",
      body: dataObject,
    });
    return response;
  }

  async function createUser(dataObject) {
    let response = await $fetch("/api/signup", {
      method: "POST",
      body: dataObject,
    });
    return response;
  }

  async function updateUser(dataObject) {
    let response = await $fetch("/api/updateUser", {
      method: "POST",
      body: dataObject,
    });
    return response;
  }
  return {
    checkLogin,
    createUser,
    updateUser
  };
};
