export const useAccounts = () => {
  const user = useState("user", () => null);

  async function loginUser(dataObject) {
    const response = await $fetch("/api/login/login", {
      method: "POST",
      body: dataObject,
    });
    return response;
  }

  return {
    loginUser,
  };
};
