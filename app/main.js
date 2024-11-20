const { Oso } = require("oso-cloud");
const express = require("express");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
// load the data
const contextFacts = require("./buildContextFacts");

const ip = require("ip");
const ipAddress = ip.address();
const ipPort = 4000;

async function start() {
  const app = express();
  app.use(
    express.json({
      inflate: true,
      limit: "100kb",
      reviver: null,
      strict: true,
      type: "application/json",
      verify: undefined,
    })
  );

  // remember to update this before running the server!
  console.log("oso api key : " + process.env.OSO_CLOUD_API_KEY);
  if (!process.env.OSO_CLOUD_API_KEY) {
    throw "Missing OSO API key from environment";
  }
  if (!process.env.OSO_URL) {
    throw "Missing OSO URL from environment";
  }

  const apiKey = process.env.OSO_CLOUD_API_KEY;
  const url = process.env.OSO_URL;
  const oso = new Oso(url, apiKey);

  // send data to oso using insert this will load all our data in once
  /**async function sendDataToOso() {
    await oso.insert([
      "has_role",
      { type: "User", id: "drmar" }, // Utilisateur
      "medecin",
      { type: "Organization", id: "Aile_Est" }, // Organisation
    ]);
    await oso.insert([
      "has_relation",
      { type: "DM", id: "dm0001" },
      "organization",
      { type: "Organization", id: "Aile_Est" },
    ]);
    await oso.insert(["is_public", { type: "DM", id: "dm0001" }, true]);
    await oso.insert(["is_locked", { type: "DM", id: "dm0001" }, true]);
  }
      // call the function to send data to oso cloud api ...
  console.log("------- sending data to oso ---------");
  await sendDataToOso();
  console.log("------- end sending data to ---------");
**/
  app.post("/dm", async (req, res) => {
    const { user_id, action, dm_id } = req.body;

    const actor = { type: "User", id: user_id }; // user that is doing the action
    const resource = { type: "DM", id: dm_id }; // resource that is being acted upon

    // in this authorize we will now send data with the request
    if (
      (await oso.authorize(
        actor,
        action,
        resource,
        contextFacts.slice(0, 20)
      )) === false
    ) {
      // Handle authorization failure
      res.status(401).send(user_id + " is not authorized for this resource");
      return;
    }
    res.status(200).send(`{"authorized": true, "Dm id": ${dm_id}}`);
  });

  app.listen(ipPort, console.log(`Listening to ${ipAddress}:${ipPort} !!!`));
}

start();
