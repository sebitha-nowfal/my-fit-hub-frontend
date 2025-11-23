import { useEffect, useState } from "react";
import NutritionCard from "../components/NutritionCard";
import { fetchNutrition } from "../services/api";

const Nutrition = () => {
  const [nutrition, setNutrition] = useState([]);
  const [search, setSearch] = useState("");
  const [filterMeal, setFilterMeal] = useState("");

  useEffect(() => {
    const getNutrition = async () => {
      const data = await fetchNutrition();
      setNutrition(data);
    };
    getNutrition();
  }, []);

  const filteredNutrition = nutrition.filter(item => 
    item.foodName.toLowerCase().includes(search.toLowerCase()) &&
    (filterMeal === "" || item.meal === filterMeal)
  );

  const totalCalories = filteredNutrition.reduce((sum, item) => sum + item.calories, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nutrition</h1>
      <p>Total Calories: {totalCalories} kcal</p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />

      {/* Filter by meal type */}
      <select
        value={filterMeal}
        onChange={e => setFilterMeal(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="">All Meals</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {filteredNutrition.map(item => <NutritionCard key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default Nutrition;
