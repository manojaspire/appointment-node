import { useState } from "react";
import "./RegisterDoctor.css";

const RegisterDoctor = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    password_hash: "",
    role: "DOCTOR",
    specialization: "",
    experience: "",
    consultation_fee: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          password_hash: formData.password_hash,
          role: "DOCTOR",
          specialization: formData.specialization,
          experience: Number(formData.experience),
          consultation_fee: Number(formData.consultation_fee),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Doctor registration failed.");
      }

      alert(data.message || "Doctor registered successfully!");

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        phone: "",
        password_hash: "",
        role: "DOCTOR",
        specialization: "",
        experience: "",
        consultation_fee: "",
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-page">
      <div className="doctor-card">
        <h2>Register Doctor</h2>

        <form className="doctor-form" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter first name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Enter last name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password_hash"
              placeholder="Enter password"
              value={formData.password_hash}
              onChange={handleChange}
              required
            />
          </div>

          {/* Specialization */}
          <div className="form-group">
            <label>Specialization</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            >
              <option value="">Select Specialization</option>
              <option value="General Physician">General Physician</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Dentist">Dentist</option>
              <option value="Orthopedic">Orthopedic</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Psychiatrist">Psychiatrist</option>
              <option value="ENT Specialist">ENT Specialist</option>
              <option value="Ophthalmologist">Ophthalmologist</option>
            </select>
          </div>

          {/* Experience */}
          <div className="form-group">
            <label>Experience (Years)</label>
            <input
              type="number"
              name="experience"
              placeholder="Enter years of experience"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          {/* Consultation Fee */}
          <div className="form-group">
            <label>Consultation Fee (₹)</label>
            <input
              type="number"
              name="consultation_fee"
              placeholder="Enter consultation fee"
              value={formData.consultation_fee}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          {/* Hidden Role */}
          <input
            type="hidden"
            name="role"
            value={formData.role}
          />

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Registering..." : "Register Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterDoctor;