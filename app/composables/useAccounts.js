export const useAccounts = () => {
  async function checkLogin(dataObject) {
    await $fetch("/api/login", {
      method: "POST",
      body: dataObject,
    });
  }
  return {
    checkLogin,
  };
};
