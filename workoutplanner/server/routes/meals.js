//routes/meals.js

const express = require("express");
const {
    createMeal,
    deleteMeal,
    getMeals,
    updateMeal,
} = require("../controllers/meal.js");


const router = express.Router();

router.post("/", createMeal);
router.put("/:id", updateMeal);
router.delete("/:id", deleteMeal);
router.get("/:userId", getMeals);

module.exports = router;

