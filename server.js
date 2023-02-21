const express = require("express");
const app = express();
const { Restaurant } = require("./models/index");
const { sequelize } = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below:
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findByPk(id)
    .then((restaurant) => {
      res.json(restaurant);
    })
    .catch((error) => {
      // handle error
    });
});

app.listen(port, () => {
  sequelize.sync();
  console.log("Your server is listening on port " + port);
});
