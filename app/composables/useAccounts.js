export const useAccounts = () => {
  async function checkLogin(dataObject) {
    await $fetch("/api/login", {
      method: "POST",
      body: dataObject,
    });
  }

  async function createUser(dataObject) {
    await $fetch("/api/signup", {
      method: "POST",
      body: dataObject,
    });
  }
  return {
    checkLogin,
    createUser,
  };
};
