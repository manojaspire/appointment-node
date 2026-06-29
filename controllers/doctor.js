const pool = require("../config/db");

const registerDoctor = async (req, res) => {
    const {first_name,last_name,  phone,password_hash,specialization,experience,consultation_fee } = req.body;
    const client = await pool.connect();
     
    try {

        const role = 'DOCTOR'

  await client.query("BEGIN");


  const user = await client.query(
    `INSERT INTO users(phone, password_hash, role)
     VALUES($1, $2, $3)
     RETURNING id`,
    [phone, password_hash, role]
  );

  const userId = user.rows[0].id;

  const doctor = await client.query(
    `INSERT INTO doctors(
        user_id,
        first_name,
        last_name,
        specialization,
        experience,
        consultation_fee
     )
     VALUES($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      userId,
      first_name,
      last_name,
      specialization,
      experience,
      consultation_fee,
    ]
  );

  await client.query("COMMIT");

  res.status(201).json({
    message: "Doctor registered successfully",
    data: doctor.rows[0],
  });

} catch (err) {

  await client.query("ROLLBACK");

  res.status(500).json({
    message: err.message,
  });

} finally {

  client.release();

}
}

const getDoctors = async (req, res) => {
    try 
    {
        const result = await pool.query("SELECT * FROM doctors");
        res.json(result.rows);

    }catch(err){
        res.status(500).json({
            message: err.message,
          });
    }
}

module.exports = {
    registerDoctor,
    getDoctors
}
