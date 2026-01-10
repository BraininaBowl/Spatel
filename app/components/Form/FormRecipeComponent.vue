<template>
  <form @submit.prevent="handleSubmit">
    <FormInputComponent
      v-model="formData.title"
      :formfieldData="{
        label: 'Title',
        placeholder: getRecipePlaceholderName(),
        required: 'true',
      }"
    />
    <FormInputComponent
      v-model="formData.description"
      :formfieldData="{
        label: 'Description',
        placeholder: 'A short description of the recipe',
        required: 'false',
      }"
    />
    <button type="submit">Text</button>
  </form>
</template>

<script setup>
const { writeRecipe } = useRecipes();
const formData = ref({
  author: "default",
});

function getRecipePlaceholderName() {
  function getRandomItemFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  function toSentenceCase(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  const pre = [
    "scrumptious",
    "delicious",
    "perfect",
    "saucy",
    "simple",
    "quick",
    "overwhelming",
    "tasty",
    "flagrant",
    "spicy",
    "eastern",
    "western",
    "nordic",
    "southern",
    "sweet",
    "crispy",
    "French",
    "Spanish",
    "Italian",
    "Danish",
    "Dutch",
    "Canadian",
    "family favourite",
    "crusty",
    "chunky",
    "thanksgiving",
    "onion",
  ];
  const main = [
    "pasta",
    "couscous",
    "curry",
    "pizza",
    "caserole",
    "falafel",
    "stew",
    "soup",
    "linguine",
    "burrito",
    "potatoes",
    "garlic",
    "baguette",
    "eggplant",
    "beans",
    "pancakes",
    "pie",
  ];
  const post = [
    " for one",
    " for two",
    " with garlic",
    " a la mode",
    ", New York style",
    " au fungi",
    " di papa",
    " with a hint of citrus",
    " - tastes like the real thing!",
    " with a cherry on top",
  ];
  return toSentenceCase(
    "" +
      (Math.random() < 0.7 ? getRandomItemFromArray(pre) + " " : "") +
      getRandomItemFromArray(main) +
      (Math.random() < 0.7 ? getRandomItemFromArray(post) : "")
  );
}

const handleSubmit = function () {
  writeRecipe(formData.value);
};
</script>

<style lang="css" scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
</style>
