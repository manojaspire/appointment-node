const express = require("express");

const { registerDoctor, getDoctors} = require("../controllers/doctor");

const router = express.Router();

router.post("/", registerDoctor);
router.get("/",getDoctors)

module.exports = router; 

