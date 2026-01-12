<template>
  <form @submit.prevent="handleSubmit">
    <FormInputComponent
      v-model="formData.title"
      :formfieldData="{
        label: 'Title',
        placeholder: formTitlePlaceholder,
        requiredField: true,
        id: useId(),
      }"
    />
    <FormTextareaComponent
      v-model="formData.description"
      :formfieldData="{
        label: 'Description',
        placeholder: formDescriptionPlaceholder,
        requiredField: false,
        id: useId(),
      }"
    />
    <FormTextareaComponent
      v-model="formData.ingredients"
      :formfieldData="{
        label: 'Ingredients',
        placeholder: formIngredientsPlaceholder,
        requiredField: true,
        id: useId(),
      }"
    />
    <FormTextareaComponent
      v-model="formData.instructions"
      :formfieldData="{
        label: 'Instructions',
        help: 'Use line breaks to separate steps.',
        placeholder: formInstructionsPlaceholder,
        requiredField: true,
        id: useId(),
      }"
    />
    <FormTextareaComponent
      v-model="formData.notes"
      :formfieldData="{
        label: 'Notes',
        placeholder: formNotesPlaceholder,
        requiredField: false,
        id: useId(),
      }"
    />

    <button type="submit">Save recipe</button>
  </form>
</template>

<script setup>
import { addNotification } from "~/layouts/default.vue";
const { writeRecipe } = useRecipes();
const formData = ref({
  author: "default",
});

const handleSubmit = function () {
  const status = writeRecipe(formData.value);
  status.catch((error) => {
    addNotification("Error saving recipe, please try again later.", "error");
  });
  status.finally(() => {
    addNotification("Recipe saved successfully.", "success");
  });
};

function getRandomItemFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function toSentenceCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getRecipePlaceholderName() {
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
    "garlic",
    "zesty",
    "herby",
    "smoky",
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
    "salad",
    "sandwich",
    "taco",
    "risotto",
    "quiche",
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
    " - grandma's secret recipe",
    " with a side of fries",
    " - best served hot",
    " - a family tradition",
  ];
  return toSentenceCase(
    "" +
      (Math.random() < 0.7 ? getRandomItemFromArray(pre) + " " : "") +
      getRandomItemFromArray(main) +
      (Math.random() < 0.7 ? getRandomItemFromArray(post) : "")
  );
}
function getRecipePlaceholderDescription() {
  const verb = [
    "Whip up",
    "Prepare",
    "Enjoy",
    "Savor",
    "Indulge in",
    "Create",
    "Devour",
    "Relish",
    "Feast on",
    "Dig into",
    "Treat yourself to",
    "Experience",
    "Celebrate with",
    "Delight in",
  ];
  const pre = [
    "surprising ",
    "easy ",
    "quick ",
    "delicious ",
    "tasty ",
    "healthy ",
    "family-friendly ",
    "weeknight ",
    "festive ",
    "flavor-packed ",
    "mouth-watering ",
    "satisfying ",
    "wholesome ",
    "zesty ",
    "hearty ",
    "savory ",
  ];
  const main = [
    "meal",
    "dish",
    "treat",
    "feast",
    "snack",
    "cuisine",
    "recipe",
    "specialty",
    "comfort food",
    "favorite",
    "delicacy",
    "creation",
    "masterpiece",
    "spread",
  ];
  const post = [
    " that's ready in under 30 minutes",
    " that everyone will love",
    " with a touch of elegance",
    " that's perfect for any occasion",
    " that brings out bold flavors",
    " that's a crowd-pleaser",
    " that's both nutritious and delicious",
    " that will become a household favorite",
    " that's packed with fresh ingredients",
    " that combines classic and modern tastes",
    " that's bursting with flavor",
    " that's easy to make and fun to eat",
    " that's perfect for sharing",
    " that will tantalize your taste buds",
    " that's a true culinary delight",
  ];
  return toSentenceCase(
    "" +
      getRandomItemFromArray(verb) +
      " this " +
      (Math.random() < 0.7 ? getRandomItemFromArray(pre) : "") +
      getRandomItemFromArray(main) +
      (Math.random() < 0.7 ? getRandomItemFromArray(post) : "") +
      "."
  );
}
function getRecipePlaceholderIngredients() {
  let ingredients = [
    "cups of flour",
    "teaspoons of salt",
    "cups of sugar",
    "tablespoons of olive oil",
    "cloves of garlic, minced",
    "cups of chopped onions",
    "teaspoons of baking powder",
    "teaspoons of black pepper",
    "cups of fresh parsley, chopped",
    "cans of diced tomatoes",
    "cups of sliced mushrooms",
    "cups of chopped bell peppers",
    "teaspoons of dried oregano",
    "teaspoons of paprika",
    "cups of vegetable broth",
    "tablespoons of soy sauce",
    "cups of cooked rice",
    "cups of cooked pasta",
    "large red peppers, sliced",
    "large yellow peppers, sliced",
    "grams of chickpeas",
    "grams of lentils",
    "grams of tofu",
    "tablespoons of hot chili sauce",
    "tablespoons of maple syrup",
    "teaspoons of ground cumin",
    "teaspoons of turmeric",
    "teaspoons of cinnamon",
    "teaspoons of Sriracha",
    "teaspoons of Harissa",
    "handfuls of fresh spinach",
    "handfuls of fresh kale",
    "handfuls of fresh arugula",
  ];
  let ingredientList = "";
  for (let i = 0; i < 3; i++) {
    ingredientList +=
      Math.floor(Math.random() * 3) +
      2 +
      " " +
      toSentenceCase(getRandomItemFromArray(ingredients)) +
      "\n";
  }
  return ingredientList;
}
function getRecipePlaceholderInstructions() {
  const step1 = [
    "Chop all vegetables finely.",
    "Preheat the oven to 400°F (200°C).",
    "Boil water in a large pot.",
    "Heat oil in a pan over medium heat.",
    "Grease a baking dish.",
    "Mix dry ingredients in a bowl.",
    "Whisk together wet ingredients in a separate bowl.",
    "Peel and mince the garlic cloves.",
  ];
  const step2 = [
    "Sauté onions and garlic until translucent.",
    "Add vegetables and cook until tender.",
    "Combine all ingredients in a large mixing bowl.",
    "Pour the mixture into the prepared baking dish.",
    "Cook pasta according to package instructions and drain.",
  ];
  const step3 = [
    "Stir in spices and cook for another 2 minutes.",
    "Bake for 25-30 minutes or until golden brown.",
    "Simmer for 15 minutes, stirring occasionally.",
    "Let it rest for 5 minutes before serving.",
  ];
  const step4 = [
    "Let it cool for a few minutes before serving.",
    "Garnish with fresh herbs and enjoy!",
    "Serve hot with your favorite side dish.",
    "Drizzle with olive oil before serving.",
  ];
  return (
    "" +
    getRandomItemFromArray(step1) +
    "\n" +
    getRandomItemFromArray(step2) +
    "\n" +
    getRandomItemFromArray(step3) +
    "\n" +
    getRandomItemFromArray(step4)
  );
}
function getRecipePlaceholderNotes() {
  const notes = [
    "For a spicier version, add more chili flakes.",
    "Leftovers can be stored in the fridge for up to 3 days.",
    "This recipe pairs well with a fresh green salad.",
    "Delicious with a side of garlic bread.",
    "Feel free to substitute ingredients based on availability.",
    "Perfect for meal prepping for the week ahead.",
    "Can be made gluten-free by using gluten-free pasta.",
    "Add a squeeze of lemon juice for extra freshness.",
    "Great for potlucks and family gatherings.",
    "Ideal for a cozy night in.",
  ];
  return getRandomItemFromArray(notes);
}

const formTitlePlaceholder = getRecipePlaceholderName();
const formDescriptionPlaceholder = getRecipePlaceholderDescription();
const formIngredientsPlaceholder = getRecipePlaceholderIngredients();
const formInstructionsPlaceholder = getRecipePlaceholderInstructions();
const formNotesPlaceholder = getRecipePlaceholderNotes();

onMounted(() => {});
</script>

<style lang="css" scoped></style>
