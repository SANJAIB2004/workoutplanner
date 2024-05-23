//routes/routines.js

const express = require("express");
const {
    createRoutine,
    deleteRoutine,
    getRoutines,
    updateRoutine,
} = require("../controllers/routine.js");


const router = express.Router();

router.post("/", createRoutine);
router.put("/:id", updateRoutine);
router.delete("/:id", deleteRoutine);
router.get("/:userId", getRoutines);
module.exports = router;

