<template>
  <main>
    <p>Verifying account...</p>
  </main>
</template>

<script setup>
onMounted(async () => {
  const { fetch: refreshSession, loggedIn } = useUserSession();
  const { verifyUser } = useAccounts();
  const route = useRoute();
  const dataObject = new Object();
  let response = new Object();
  dataObject.id = route.query.id;
  dataObject.key = route.query.key;
  if (dataObject.id != null && dataObject.key != null) {
    response = await verifyUser(dataObject);
  } else {
    response.type = "error";
    response.message = "Incorrect link";
  }
  addNotification(response.message, response.type);
  if (response.type === "success") {
    refreshSession();
    navigateTo("/");
  } else {
    response.type = "error";
    response.message = "Incorrect link";
    navigateTo("/profile/");
  }
});
</script>

<style lang="css" scoped></style>
