const express = require("express");
const app = express();
const { Restaurant } = require("./models/index");
const { sequelize } = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below:
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  sequelize.sync();
  console.log("Your server is listening on port " + port);
});
