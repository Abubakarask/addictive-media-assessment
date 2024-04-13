const userInteraction = require("../model/user_interaction");

async function userInteractionCreate(req, res) {
  try {
    const ipAddress = req.ip;
    const deviceType = req.headers["device-type"];
    const browser = req.headers["browser"];
    const userAgent = req.headers["user-agent"];

    const result = await userInteraction.create({
      ipAddress,
      deviceType,
      browser,
      userAgent,
    });

    console.log(result);
    res.send({ success: true, message: "Saved succesfully" });
  } catch (err) {
    res.status(500).send({ success: false, message: "Something went wrong." });
  }
}

module.exports = {
    userInteractionCreate
}