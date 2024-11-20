const { Oso } = require("oso-cloud");
const express = require("express");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const ip = require("ip");
const ipAddress = ip.address();
const ipPort = 4000;

async function start() {
  const app = express();
  // Middleware pour parser les données JSON
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

  const apiKey = process.env.OSO_CLOUD_API_KEY;
  const oso = new Oso("https://cloud.osohq.com", apiKey, {
    dataBindings: "../local-mode/config-schema-for-oso.yml", // path to your config file
  });

  app.post("/dm", async (req, res) => {
    const { user_id, action, dm_id } = req.body;

    const actor = { type: "User", id: user_id }; // L'utilisateur qui effectue l'action
    const resource = { type: "DM", id: dm_id }; // La resource sur laquelle l'utilisateur veut agir

    const query = await oso.authorizeLocal(actor, action, resource);
    const result = await query.execute();
    if (!result.allowed) {
      res.status(401).send(`${user_id} is not authorized for this resource`);
      return;
    }
    res.status(200).json({ authorized: true, dm_id });
  });

  app.listen(ipPort, console.log(`Listening to ${ipAddress}:${ipPort} !!!`));
}

start();
