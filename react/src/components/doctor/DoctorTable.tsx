import "./DoctorTable.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const DoctorTable = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/doctors");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch doctors");
      }

      // If your API returns:
      // { success: true, data: [...] }
      setDoctors(data || []);

      // If your API returns only an array:
      // setDoctors(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Doctors</h2>

        <button
          className="add-btn"
          onClick={() => navigate("/doctor-register")}
        >
          + Add Doctor
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Phone</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Fee</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
<td colSpan={7}>Loading...</td>
              </tr>
            ) : doctors.length === 0 ? (
              <tr>
                <td colSpan={7}>No Doctors Found</td>
              </tr>
            ) : (
              doctors.map((doctor, index) => (
                <tr key={doctor.id}>
                  <td>{index + 1}</td>

                  <td>
                    Dr. {doctor.first_name} {doctor.last_name}
                  </td>

                  <td>{doctor.phone}</td>

                  <td>{doctor.specialization}</td>

                  <td>{doctor.experience} Years</td>

                  <td>₹{doctor.consultation_fee}</td>

                  <td className="actions">
                    <button className="edit-btn">
                      Edit
                    </button>

                    <button className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorTable;