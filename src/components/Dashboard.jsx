import React, { useState } from "react";
import axios from "axios";
import "./../styles.css";

function Dashboard() {
  const [formData, setFormData] = useState({ name: "", age: "", file: null });


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age);
    data.append("file", formData.file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/submit", data);
      alert(response.data.message);
      setFormData({ name: "", age: "", file: null }); 
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit data.");
    }
  };

  const ageOptions = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="dashboard">
      <h1>Healthcare Dashboard</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Age
            </option>
            {ageOptions.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>File Upload:</label>
          <input type="file" name="file" onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Dashboard;
