const pool = require("../config/db");

const getEmployees = async (req, res) => {
  try {
    
// const createTable = await pool.query(`
//   CREATE TABLE IF NOT EXISTS employees (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     role VARCHAR(100) NOT NULL,
//     department VARCHAR(100) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );
// `);
    const result = await pool.query(
      "SELECT * FROM employees"
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, role , department} = req.body;

    const result = await pool.query(
      "INSERT INTO employees(name,role, department) VALUES($1,$2,$3) RETURNING *",
      [name, role, department]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
const {id} = req.params;
const result = await pool.query("DELETE FROM employees WHERE id = $1 RETURNING *",[id])
res.json(result.rows[0]);
  }catch(err){
    res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = {
  getEmployees,
  createEmployee,
  deleteEmployee
};