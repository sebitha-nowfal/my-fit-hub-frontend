import { useState, useEffect } from "react";
import axios from "axios";

export default function Yoga() {
  const [formData, setFormData] = useState({
    yogaType: "",
    duration: "",
    caloriesBurned: "",
    notes: "",
  });

  const [yogaList, setYogaList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Yoga Sessions
  const fetchYoga = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/yoga", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setYogaList(res.data);
    } catch (error) {
      console.error("Error fetching yoga:", error);
    }
  };

  useEffect(() => {
    fetchYoga();
  }, []);

  // Handle input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add Yoga Session
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/yoga", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear form
      setFormData({
        yogaType: "",
        duration: "",
        caloriesBurned: "",
        notes: "",
      });

      fetchYoga();
    } catch (error) {
      console.error("Error adding yoga:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Yoga Session
  const deleteYoga = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/yoga/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchYoga();
    } catch (error) {
      console.error("Error deleting yoga:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
        Yoga Tracker
      </h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-lg mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">Add Yoga Session</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="yogaType"
            placeholder="Yoga Type (e.g., Hatha, Vinyasa)"
            value={formData.yogaType}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          />

          <input
            type="number"
            name="duration"
            placeholder="Duration (min)"
            value={formData.duration}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          />

          <input
            type="number"
            name="caloriesBurned"
            placeholder="Calories Burned"
            value={formData.caloriesBurned}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          {loading ? "Saving..." : "Add Yoga Session"}
        </button>
      </form>

      {/* Yoga List */}
      <h2 className="text-2xl font-semibold mb-4">Your Yoga Sessions</h2>

      {yogaList.length === 0 ? (
        <p className="text-center text-gray-500">No yoga sessions added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {yogaList.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg p-4 rounded-lg border"
            >
              <h3 className="text-lg font-bold">{item.yogaType}</h3>
              <p>⏱ Duration: {item.duration} min</p>
              <p>🔥 Calories Burned: {item.caloriesBurned}</p>
              {item.notes && <p className="italic">📝 {item.notes}</p>}

              <button
                onClick={() => deleteYoga(item._id)}
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
