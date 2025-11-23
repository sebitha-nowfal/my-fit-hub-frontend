import { useEffect, useState } from "react";
import WorkoutCard from "../components/WorkoutCard";
import { fetchWorkouts } from "../services/api";

// Modal Component
const Modal = ({ workout, onClose }) => {
  if (!workout) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>{workout.name}</h2>
        <p><strong>Type:</strong> {workout.type}</p>
        <p><strong>Duration:</strong> {workout.duration} mins</p>
        <p><strong>Difficulty:</strong> {workout.difficulty}</p>
        <p><strong>Description:</strong> {workout.description}</p>
        <button onClick={onClose} style={modalStyles.button}>Close</button>
      </div>
    </div>
  );
};

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    const getWorkouts = async () => {
      const data = await fetchWorkouts();
      setWorkouts(data);
    };
    getWorkouts();
  }, []);

  // Filter + Search
  const filteredWorkouts = workouts.filter(w => {
    return (
      w.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === "" || w.type === filterType)
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Workouts</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search workouts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />

      {/* Filter Dropdown */}
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="">All Types</option>
        <option value="Cardio">Cardio</option>
        <option value="Strength">Strength</option>
        <option value="Yoga">Yoga</option>
        <option value="Flexibility">Flexibility</option>
      </select>

      {/* Workouts Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {filteredWorkouts.map(w => (
          <div key={w._id} onClick={() => setSelectedWorkout(w)} style={{ cursor: "pointer" }}>
            <WorkoutCard workout={w} />
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal workout={selectedWorkout} onClose={() => setSelectedWorkout(null)} />
    </div>
  );
};

export default Workouts;

// Modal styles
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    maxHeight: "80vh",
    overflowY: "auto"
  },
  button: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};
