import { useState, useEffect } from "react";
import axios from "axios";

export default function Trainer() {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
  });

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);

  const SPECIALIZATION_OPTIONS = [
    "Cardio",
    "Strength Training",
    "Yoga",
    "Zumba",
    "CrossFit",
    "Weight Loss",
    "Bodybuilding",
    "Rehabilitation",
  ];

  const EXPERIENCE_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15];

  // Fetch Trainers
  const fetchTrainers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/trainers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTrainers(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/trainers", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        name: "",
        specialization: "",
        experience: "",
      });

      fetchTrainers();
    } catch (error) {
      console.error("Error adding trainer:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTrainer = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/trainers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTrainers();
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">

      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Trainers
      </h1>

      {/* Add Trainer Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-lg mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Trainer</h2>

        <div className="grid md:grid-cols-2 gap-4">

          {/* Trainer Name */}
          <input
            type="text"
            name="name"
            placeholder="Trainer Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            required
          />

          {/* Specialization Dropdown */}
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            required
          >
            <option value="">Select Specialization</option>
            {SPECIALIZATION_OPTIONS.map((sp, index) => (
              <option key={index} value={sp}>
                {sp}
              </option>
            ))}
          </select>

          {/* Experience Dropdown */}
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            required
          >
            <option value="">Years of Experience</option>
            {EXPERIENCE_OPTIONS.map((exp, index) => (
              <option key={index} value={exp}>
                {exp} Years
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Add Trainer"}
        </button>
      </form>

      {/* Trainer List */}
      <h2 className="text-2xl font-semibold mb-4">Available Trainers</h2>

      {trainers.length === 0 ? (
        <p className="text-gray-500 text-center">No trainers added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {trainers.map((t) => (
            <div
              key={t._id}
              className="bg-white border shadow-md rounded-lg p-5"
            >
              <h3 className="text-xl font-bold text-blue-700">{t.name}</h3>
              <p className="mt-1">🏋 Specialization: {t.specialization}</p>
              <p>⏳ Experience: {t.experience} years</p>

              <button
                onClick={() => deleteTrainer(t._id)}
                className="mt-3 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
