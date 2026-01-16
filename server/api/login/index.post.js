export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await setUserSession(event, {
    user: {
      name: "Test",
    },
  });
});
