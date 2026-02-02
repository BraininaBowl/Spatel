<template>
  <main>
    <h1>Register</h1>
    <div class="page_options">
      <div class="submenu left"></div>
      <NavigationOptionsRightComponent />
    </div>
    <form @submit.prevent="signup">
      <FormInputComponent
        v-model="credentials.name"
        :formfieldData="{
          typeField: 'text',
          label: 'Username',
          placeholder: 'Username',
          requiredField: true,
          id: useId(),
          disabledField: false,
          autocomplete: 'nickname',
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
          autocomplete: 'email',
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
          autocomplete: 'new-password',
        }"
      />
      <button type="submit">Sign up</button>
    </form>
  </main>
</template>

<script setup>


const { fetch: refreshSession } = useUserSession();
const { createUser } = useAccounts();
const credentials = reactive({
  name: "",
  email: "",
  password: "",
});

async function signup() {
  const response = await createUser(credentials);
  addNotification(response.message, response.type);
  if (response.type === "success") {
    navigateTo("/profile/");
  }
}
</script>

<style lang="css" scoped></style>
