<template>
  <main>
    <h1>Register</h1>
    <form @submit.prevent="signup">
      <FormInputComponent
        v-model="credentials.username"
        :formfieldData="{
          typeField: 'text',
          label: 'Username',
          placeholder: 'Username',
          requiredField: true,
          id: useId(),
          disabledField: false,
        }"
      />
      <FormInputComponent
        v-model="credentials.email"
        :formfieldData="{
          typeField: 'email',
          label: 'Email',
          placeholder: 'email@address.com',
          requiredField: true,
          id: useId(),
          disabledField: false,
        }"
      />
      <FormInputComponent
        v-model="credentials.password"
        :formfieldData="{
          typeField: 'password',
          label: 'Password',
          placeholder: '*********',
          requiredField: true,
          id: useId(),
          disabledField: false,
        }"
      />
      <button type="submit">Sign up</button>
    </form>
  </main>
</template>

<script setup>
import { addNotification } from "~/layouts/default.vue";
const { fetch: refreshSession } = useUserSession();
const { createUser } = useAccounts();
const credentials = reactive({
  username: "",
  email: "",
  password: "",
});

async function signup() {
  const status = createUser(credentials);
  status.catch((error) => {
    addNotification("Error: " + error, "error");
  });
  status.finally(() => {
    refreshSession();
    addNotification("Signup succesful!", "success");
  });
}
</script>

<style lang="css" scoped></style>
