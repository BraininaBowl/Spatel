<template>
  <main>
    <h1>Profile</h1>
    <div class="page_options">
      <div class="submenu left"></div>
      <NavigationOptionsRightComponent />
    </div>
    <div v-if="loggedIn">
      <div v-if="!userDataOnServer.verified">
        <h2>Verify account</h2>
        <form class="area" @submit.prevent="verifyUser">
          <p>
            You need to verify your account before you can add recipes. Please
            check your email for a verification link.
          </p>
          <button type="submit">Resend verification mail</button>
        </form>
      </div>
      <h2>Update profile</h2>
      <form class="area" @submit.prevent="updateData">
        <FormInputComponent
          v-model="userData.name"
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
          v-model="userData.email"
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
        <button type="submit">Update profile</button>
      </form>
      <h2>Change password</h2>
      <form class="area" @submit.prevent="changePassword" v-if="loggedIn">
        <FormInputComponent
          v-model="credentials.oldPassword"
          :formfieldData="{
            typeField: 'password',
            label: 'Current password',
            placeholder: '*********',
            requiredField: true,
            id: useId(),
            disabledField: false,
            autocomplete: 'current-password',
          }"
        />
        <FormInputComponent
          v-model="credentials.newPassword"
          :formfieldData="{
            typeField: 'password',
            label: 'New password',
            placeholder: '*********',
            requiredField: true,
            id: useId(),
            disabledField: false,
            autocomplete: 'new-password',
          }"
        />
        <button type="submit">Change password</button>
      </form>
    </div>
    <CardNotAllowedComponent v-else />
  </main>
</template>

<script setup>
const { loggedIn, fetch: refreshSession, user } = useUserSession();
const { updateUser, getUserData, sendVerificationMail } = useAccounts();
const userDataOnServer = await getUserData(user.id);
const userData = reactive({
  name: userDataOnServer.name,
  email: userDataOnServer.email,
});

const credentials = reactive({
  oldPassword: "",
  newPassword: "",
});
async function verifyUser() {
  const response = await sendVerificationMail(user.value.id);
  addNotification(response.message, response.type);
}

async function updateData() {
  const response = await updateUser(userData);
  refreshSession();
  addNotification(response.message, response.type);
}
async function changePassword() {
  const response = await updateUser(credentials);
  refreshSession();
  addNotification(response.message, response.type);
}
</script>

<style lang="css" scoped></style>
