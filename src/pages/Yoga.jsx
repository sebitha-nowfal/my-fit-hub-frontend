import { useEffect, useState } from "react";
import { fetchWorkouts } from "../services/api"; // filter type Yoga
import WorkoutCard from "../components/WorkoutCard";

const Yoga = () => {
  const [yogaSessions, setYogaSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  useEffect(() => {
    const getYogaSessions = async () => {
      const data = await fetchWorkouts(); // fetch all workouts
      const yogaData = data.filter(w => w.type === "Yoga");
      setYogaSessions(yogaData);
    };
    getYogaSessions();
  }, []);

  const filteredYoga = yogaSessions.filter(y =>
    y.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterDifficulty === "" || y.difficulty === filterDifficulty)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Yoga Sessions</h1>

      <input
        type="text"
        placeholder="Search yoga..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />

      <select
        value={filterDifficulty}
        onChange={e => setFilterDifficulty(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="">All Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {filteredYoga.map(y => (
          <WorkoutCard key={y._id} workout={y} />
        ))}
      </div>
    </div>
  );
};

export default Yoga;
