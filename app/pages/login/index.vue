<template>
  <main>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="credentials.email" type="email" placeholder="Email" />
      <input
        v-model="credentials.password"
        type="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  </main>
</template>

<script setup>
const { loggedIn, user, fetch: refreshSession } = useUserSession();
const { loginUser} = useAccounts();
const credentials = reactive({
  email: "",
  password: "",
});

async function login() {
  const status = loginUser(credentials.value);
  status.catch((error) => {
    addNotification("Incorrect username and/or password", "error");
  });
  status.finally(() => {
    addNotification("Login succesful!", "success");
    refreshSession();
  });


  try {
    await $fetch("/api/login", {
      method: "POST",
      body: credentials,
    });

    // Refresh the session on client-side and redirect to the home page
    await refreshSession();
    await navigateTo("/");
  } catch {
    alert("Bad credentials");
  }
}
</script>

<style lang="css" scoped></style>
