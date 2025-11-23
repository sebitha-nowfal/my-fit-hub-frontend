import { useEffect, useState } from "react";
import TrainerCard from "../components/TrainerCard";
import { fetchTrainers } from "../services/api";

const Trainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("");

  useEffect(() => {
    const getTrainers = async () => {
      const data = await fetchTrainers();
      setTrainers(data);
    };
    getTrainers();
  }, []);

  const filteredTrainers = trainers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterSpecialization === "" || t.specialization === filterSpecialization)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Our Trainers</h1>

      <input
        type="text"
        placeholder="Search trainers..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />

      <select
        value={filterSpecialization}
        onChange={e => setFilterSpecialization(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="">All Specializations</option>
        <option value="Strength">Strength</option>
        <option value="Cardio">Cardio</option>
        <option value="Yoga">Yoga</option>
      </select>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {filteredTrainers.map(t => <TrainerCard key={t._id} trainer={t} />)}
      </div>
    </div>
  );
};

export default Trainer;
