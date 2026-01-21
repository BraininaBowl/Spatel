<template>
  <div class="default_template">
    <div id="notifications" role="alert"></div>
    <NavigationComponent />
    <NuxtPage />
    <NavigationFooterComponent />
  </div>
</template>

<script>
function addNotification(message, type = "info") {
  const notificationsArea = document.querySelector("#notifications");
  if (notificationsArea) {
    const notification = document.createElement("div");
    notification.classList.add(`notification`);
    notification.classList.add(`${type}`);
    notification.innerText = message;
    notificationsArea.appendChild(notification);
    setTimeout(() => {
      notificationsArea.removeChild(notification);
    }, 7000);
  }
}

function returnUri(string) {
  return encodeURIComponent(string.trim().toLowerCase().replace(/\s+/g, "-"));
}

export { addNotification, returnUri };
</script>

<script setup>
const { loggedIn, session, user, clear, fetch } = useUserSession();
</script>

<style lang="css">
:root {
  --col-bg: #f7f7f7;
  --col-area-bg: #ffffff;
  --col-text: #333344;
  --col-link: #224c70;
  --col-link-hover: #326796;
  --col-accent: #2faca7;
  --col-button-text: #ffffff;
  --col-border: #cccccc;
  --col-success: #2faca7;
  --col-error: #991515;
  --col-info: #26547c;
}

body {
  background-color: var(--col-bg);
  color: var(--col-text);
  font-size: 14px;
  line-height: 1.4rem;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

.default_template {
  font-family: "PT Serif", serif;
  font-size: 1rem;
  margin: 0 auto;
  max-width: 120ch;
  padding: 1rem 2rem 0;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
}

main {
  flex-grow: 2;
}

.hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.page_options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  padding: 0.5rem 0;
  border-top: 1px solid var(--col-border);
  border-bottom: 1px solid var(--col-border);
  margin: 0 0 1.5rem 0;
  p {
    margin: 0;
  }
  .submenu {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 2rem;

    .item {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }
  }

  select,
  input {
    font-family: "PT Serif", serif;
    font-size: 0.8rem;
    padding: 0 0.5rem 0 0;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
}

h1 {
  margin: 3rem 0 1.5rem;
}

/* Links */
a {
  color: var(--col-link);
  text-decoration: none;
  transition: color 0.2s;
  display: inline-block;
  cursor: pointer;
}
a:not(.card)::after {
  content: "";
  display: block;
  border-bottom: 1px solid var(--col-link-hover);
  transition: opacity 0.25s ease-out;
  opacity: 0;
}

a:hover {
  color: var(--col-link-hover);
}
a:hover::after {
  opacity: 1;
}

button,
.button {
  font-family: "PT Serif", serif;
  margin: 0;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: var(--col-link);
  color: var(--col-button-text);
  font-size: 1rem;
  transition:
    border-radius 0.35s ease-out,
    box-shadow 0.35s ease-out,
    background-color 0.2s;
}
button:hover,
.button:hover {
  background-color: var(--col-link-hover);
  color: var(--col-button-text);
  border-radius: 1rem;
  box-shadow:
    0 0.3rem 0.6rem rgba(0, 0, 0, 0.2),
    0 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
}

button::before,
.button::before {
  content: "▸ ";
  margin-left: -0.3rem;
}

.button-row {
  margin: 2rem 0 0;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
}

/* Notifications */
#notifications {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1000;
}

.notification {
  padding: 0.75rem 1rem;
  color: var(--col-text);
  border-radius: 4px;
  border: 1px solid var(--col-border);
  background-color: var(--col-area-bg);
}

.notification::before {
  content: "";
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.5rem;
  border-radius: 50%;
}

.notification.info::before {
  background-color: var(--col-info);
}
.notification.success::before {
  background-color: var(--col-accent);
}
.notification.error::before {
  background-color: #991515;
}

/* Form elements */
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.formfield,
fieldset {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  width: 100%;
  border: 0;
  padding: 0;
  margin: 0;
}

label,
legend,
.label {
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0;
}

form .help-text {
  font-size: 0.9rem;
  color: var(--col-text);
  opacity: 0.7;
  margin: 0;
  font-style: italic;
}

input,
textarea {
  font-family: "PT Serif", serif;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
  box-sizing: border-box;
}

input::placeholder,
textarea::placeholder {
  font-style: italic;
  color: var(--col-text);
  opacity: 0.3;
}

input:focus-visible,
textarea:focus-visible {
  outline: none;
  border: 1px solid var(--col-accent);
}

.expandableList {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

/* Transition */
.page-enter-active {
  transition: all 0.1s ease-out;
}

.page-leave-active {
  transition: all 0.1s ease-in;
}
.page-enter-from {
  opacity: 0.25;
  transform: translateX(5%);
}

.page-leave-to {
  opacity: 0.25;
  transform: translateX(-5%);
}

/* Print */

@media print {
  footer,
  nav,
  .page_options {
    display: none !important;
  }

  .default_template {
    padding: 0 1rem 0 4rem;
  }

  * {
    background-color: rgba(255, 255, 255, 0);
  }

  h1 {
    font-size: 24px !important;
  }

  h4 {
    font-size: 12px !important;
  }

  p,
  a,
  li {
    font-size: 14px !important;
  }

  ul,
  ol {
    gap: 3px !important;
  }
}
</style>
