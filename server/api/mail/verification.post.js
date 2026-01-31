export default defineEventHandler(async (event) => {
  const { transport, nodemailer, sendMail } = useNodeMailer();
  const body = await readBody(event);
  const verificationKey = body.verificationKey;
  const userData = body.userData.user;
  const location = body.location;
  const response = {};
    userData.verificationKey = await hashPassword(verificationKey);
    const verificationlink =
      "https://" +
      location +
      "/verify/?id=" +
      userData.id +
      "&key=" +
      verificationKey;
    try { sendMail({
      subject: 'Validate your Spatel account',
      text:
        'Thank you for signing up to Spatel!\n\nYou need to confirm your account to add recipes. Visit ' +
        verificationlink +
        ' to do so.',
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
    response.status = "error";
  } finally {
    response.userData = userData;
    response.message = "Verification mail sent!";
    response.status = "success";
  }
  return response;
});
