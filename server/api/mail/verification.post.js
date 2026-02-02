export default defineEventHandler(async (event) => {
  const { transport, nodemailer, sendMail } = useNodeMailer();
  const storage = useStorage("userStore");
  const body = await readBody(event);
  const id = body.id;
  const verificationKey = body.verificationKey;
  const location = body.location;
  const response = {};

  async function getUser() {
    const userData = await storage.getItem(id + ".json");
    return userData;
  }

  async function setUser() {
    await storage.setItem(id + ".json", userData);
  }

  const userData = await getUser();
  userData.verificationKey = await hashPassword(verificationKey);
  await setUser();

  const verificationlink =
    "https://" + location + "/verify/?id=" + id + "&key=" + verificationKey;
  try {
    sendMail({
      subject: "Validate your Spatel account",
      text:
        "Thank you for signing up to Spatel!\n\nYou need to confirm your account to add recipes. Visit " +
        verificationlink +
        " to do so.",
      html:
        'Thank you for signing up to Spatel!<br><br>You need to confirm your account to add recipes. Visit <a href="' +
        verificationlink +
        '">' +
        verificationlink +
        "</a> to do so.",
      to: userData.email,
    });
  } catch (error) {
    response.message = "Error sending verification mail: " + error.message;
    response.type = "error";
  } finally {
    response.message = "Verification mail sent!";
    response.type = "success";
  }
  return response;
});
