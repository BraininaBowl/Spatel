<template>
  <div class="default_template">
    <NavigationComponent :nav-items="navItems" />
    <NuxtPage />
  </div>
</template>

<script setup>
const navItems = [
  {
    to: "/",
    label: "Recipes",
  },
  {
    to: "/New",
    label: "New recipe",
  },
];
</script>

<style lang="css">
:root {
  --col-bg: #efefef;
  --col-text: #333344;
  --col-link: #26547C;
  --col-link-hover: #24496A;
  --col-accent: #45C5C1;
  --col-button-text: #ffffff;
}


body {
  background-color: var(--col-bg);
  color: var(--col-text);
  font-size: 14px;
  line-height: 1.4rem;
}

.default_template {
  font-family: "PT Serif", serif;
  font-size: 1rem;
  margin: 1rem auto;
  max-width: 800px;
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

/* Links */

a {
  color: var(--col-link);
  text-decoration: none;
}
a:hover {
  color: var(--col-link-hover);
  text-decoration: underline;
}

button, .button {
  font-family: "PT Serif", serif;
  margin: 1rem 0 0;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: var(--col-link);
  color: var(--col-button-text);
  font-size: 1rem;
  transition: border-radius 0.35s ease-out, background-color 0.2s;
}
button:hover, .button:hover {
  background-color: var(--col-link-hover);
  border-radius: 1rem;
}

/* Form elements */

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.formfield, fieldset {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  width: 100%;
  border: 0;
  padding: 0;
  margin: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0 0 0 0;
}


label, legend {
  font-weight: bold;
  font-size: 0.85rem;
}

input {
  font-family: "PT Serif", serif;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
  box-sizing: border-box;
}

input:focus-visible {
    outline: none;
    border: 1px solid var(--col-accent);
}

.expandableList {
  display: flex;
  flex-direction:column;
  gap: 0.125rem;
}
</style>
