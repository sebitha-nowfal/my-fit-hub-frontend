import { useState, useEffect } from "react";
import axios from "axios";

export default function Workout() {
  const [formData, setFormData] = useState({
    workoutName: "",
    duration: "",
    caloriesBurned: "",
    notes: "",
  });

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all workouts
  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/workout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkouts(res.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Handle input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Submit workout
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/workout",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        workoutName: "",
        duration: "",
        caloriesBurned: "",
        notes: "",
      });

      fetchWorkouts();
    } catch (error) {
      console.error("Error adding workout:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete workout
  const deleteWorkout = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/workout/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Workout Tracker
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-lg mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">Add Workout</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="workoutName"
            placeholder="Workout Name"
            value={formData.workoutName}
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
            required
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
          className="mt-5 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Add Workout"}
        </button>
      </form>

      {/* Workout List */}
      <h2 className="text-2xl font-semibold mb-4">Your Workouts</h2>

      {workouts.length === 0 ? (
        <p className="text-center text-gray-500">No workouts added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {workouts.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg p-4 rounded-lg border"
            >
              <h3 className="text-lg font-bold">{item.workoutName}</h3>
              <p>⏱ Duration: {item.duration} min</p>
              <p>🔥 Calories Burned: {item.caloriesBurned}</p>
              {item.notes && <p className="italic">📝 {item.notes}</p>}

              <button
                onClick={() => deleteWorkout(item._id)}
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
