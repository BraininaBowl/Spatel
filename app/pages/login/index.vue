<template>
  <main>
    <h1>Login</h1>
    <div class="page_options">
      <div class="submenu left"></div>
      <NavigationOptionsRightComponent />
    </div>
    <form @submit.prevent="login">
      <FormInputComponent
        v-model="credentials.email"
        :formfieldData="{
          typeField: 'email',
          label: 'Email',
          placeholder: 'email@address.com',
          requiredField: true,
          id: useId(),
          disabledField: loggedIn,
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
          disabledField: loggedIn,
          autocomplete: 'current-password',
        }"
      />

      <button type="submit">Login</button>
    </form>
  </main>
</template>

<script setup>
import { addNotification } from "~/layouts/default.vue";
const { fetch: refreshSession, loggedIn } = useUserSession();
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
