const express = require("express");

const { registerDoctor, getDoctors, loginDoctor} = require("../controllers/doctor");

const router = express.Router();

router.post("/", registerDoctor);
router.get("/",getDoctors)
router.post("/login", loginDoctor);

module.exports = router; 

