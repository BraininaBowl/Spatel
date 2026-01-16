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
import { addNotification } from "~/layouts/default.vue";
const { loggedIn, user, fetch: refreshSession } = useUserSession();
const { checkLogin } = useAccounts();
const credentials = reactive({
  email: "",
  password: "",
});

async function login() {
  const status = checkLogin(credentials);
  status.catch((error) => {
    addNotification("Incorrect username and/or password", "error");
  });
  status.finally(() => {
    refreshSession();
    addNotification("Login succesful!", "success");
  });

}
</script>

<style lang="css" scoped></style>
