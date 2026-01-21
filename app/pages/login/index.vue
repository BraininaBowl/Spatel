<template>
  <main>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <FormInputComponent
        v-model="credentials.email"
        :formfieldData="{
          typeField: 'email',
          label: 'Email',
          placeholder: 'email@address.com',
          requiredField: true,
          id: useId(),
          disabledField: false,
          autocomplete: 'email',
        }"
      />
      <FormInputComponent
        v-model="credentials.password"
        :formfieldData="{
          typeField: 'password',
          label: 'Password',
          placeholder: '******************',
          requiredField: true,
          id: useId(),
          disabledField: false,
          autocomplete: 'current-password',
        }"
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
  const response = await checkLogin(credentials);
  refreshSession();
  addNotification(response.message, response.type);
}
</script>

<style lang="css" scoped></style>
