const express = require("express");
const router = express.Router();
const BMIController = require("../controllers/bmi.controller");

router.post("/bmi", BMIController.calculateUserBMI);
router.get("/bmi", BMIController.getBmiData);



module.exports = router;
