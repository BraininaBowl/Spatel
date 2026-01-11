<template>
  <form @submit.prevent="handleSubmit">
    <FormInputComponent
      v-model="formData.title"
      :formfieldData="{
        label: 'Title',
        placeholder: getRecipePlaceholderName(),
        requiredField: true,
      }"
    />
    <FormInputComponent
      v-model="formData.description"
      :formfieldData="{
        label: 'Description',
        placeholder: 'A short description of the recipe',
        requiredField: false,
      }"
    />
    <fieldset>
      <legend>Ingredients</legend>
      <ul class="expandableList">
        <li>
          <FormInputComponent
            v-model="formData.ingredient"
            :formfieldData="{
              label: 'Ingredient',
              labelHidden: true,
              placeholder: '',
              requiredField: false,
            }"
          />
        </li>
      </ul>
    </fieldset>

    <button type="submit">Save recipe</button>
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

function getExpandableLists() {
  const listInputs = [];
  document.querySelectorAll(".expandableList").forEach((list) => {
    list.addEventListener("focusout", (event) => {
      list.contains(event.relatedTarget)? null : cleanUpExpandableList(list);
    });
    list.querySelectorAll("li").forEach((item) => {
      const input = {
        parent: list,
        element: item,
        input: item.querySelector("input"),
      };
      listInputs.push(input);
    });
  });
  return listInputs;
}

function inputEventListener(item) {
  item.input.addEventListener("input", appendToExpandableList.bind(null, item));
}

function appendToExpandableList(item) {
  if (item.input.value !== "") {
    const lastItem = item.parent.querySelector("li:last-child input");
    if (lastItem.value !== "") {
      const newItem = item.element.cloneNode(true);
      item.parent.appendChild(newItem);
      const newInput = newItem.querySelector("input");
      newInput.value = "";
      inputEventListener({
        parent: item.parent,
        element: newItem,
        input: newInput,
      });
    }
  }
}

function cleanUpExpandableList(parent) {
  const items = parent.querySelectorAll("li");
  items.forEach((item, index) => {
    const input = item.querySelector("input");
    if (input.value === "" && index < items.length - 1) {
      parent.removeChild(item);
    }
  });
}

onMounted(() => {
  const listInputs = getExpandableLists();
  listInputs.forEach((item) => {
    inputEventListener(item);
  });
});
</script>

<style lang="css" scoped></style>
