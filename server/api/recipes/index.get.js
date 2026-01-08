import data from "../../data.json";

export default defineEventHandler((async) => {
  const recipes = data;
  return {
    status: "succes",
    data: { recipes },
  };
});
