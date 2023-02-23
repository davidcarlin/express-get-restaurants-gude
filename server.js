const express = require("express");
const app = express();
const { Restaurant } = require("./models/index");
const { sequelize } = require("./db");
const seedRestaurant = require("./seedData");

const port = 3000;

// //GET RESTAURANTS 2
// //TODO: Create your GET Request Route Below:
// app.get("/restaurants/:id", (req, res) => {
//   const id = req.params.id;
//   Restaurant.findByPk(id)
//     .then((restaurant) => {
//       res.json(restaurant);
//     })
//     .catch((error) => {
//       // handle error
//     });
// });

// app.listen(port, () => {
//   sequelize.sync();
//   console.log("Your server is listening on port " + port);
// });

//GET RESTAURANTS 3
// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//creating new restaurant
app.post("/restaurants", (req, res) => {
  const { name, location, cuisine } = req.body;
  Restaurant.create({
    name,
    location,
    cuisine,
  })
    .then((newRestaurant) => {
      res.status(201).json(newRestaurant);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error creating restaurant" });
    });
});

//updating existing restaurant
app.put("/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  const updatedRestaurant = req.body;
  try {
    const [numOfRowsUpdated, updatedRows] = await Restaurant.update(
      updatedRestaurant,
      {
        where: { id },
      }
    );
    if (numOfRowsUpdated === 0) {
      res.status(404).json({ message: "Restaurant not found" });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

//deleting restaurant
app.delete("/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const numOfRowsDeleted = await Restaurant.destroy({
      where: { id },
    });
    if (numOfRowsDeleted === 0) {
      res.status(404).json({ message: "Restaurant not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
