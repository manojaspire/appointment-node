const express = require('express');
const cors = require("cors");

const pool = require('./config/db');
const employeeRoutes = require("./router/employee");
const doctorRoutes = require("./router/doctor");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

async function connectionDB (){
  try {
       await pool.connect();
       console.log(">>>>>>>>> database connectected >>>>>>>>>");
  }catch(err){
       console.log(err);
  }
}

connectionDB();

app.use("/api/employees", employeeRoutes);
app.use("/api/doctors", doctorRoutes);

app.get('/', (req, res) => {
  res.send('>>>> Service is running >>>>');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});