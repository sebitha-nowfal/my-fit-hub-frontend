import React, { useState, useEffect } from "react";
import "./Nutrition.css";
import axios from "axios";

const Nutrition = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    meal: "",
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    notes: "",
  });

  // -----------------------------
  // FETCH NUTRITION DATA
  // -----------------------------
  const fetchNutrition = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/nutrition", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setItems(res.data);
    } catch (err) {
      console.log("Fetch Error:", err.message);
    }
  };

  useEffect(() => {
    fetchNutrition();
  }, []);

  // -----------------------------
  // HANDLE INPUT CHANGE
  // -----------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -----------------------------
  // ADD NUTRITION DATA
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/nutrition", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setFormData({
        meal: "",
        foodName: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        notes: "",
      });

      fetchNutrition();
    } catch (err) {
      console.log("Add Error:", err.message);
    }
  };

  // -----------------------------
  // DELETE NUTRITION ITEM
  // -----------------------------
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/nutrition/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      fetchNutrition();
    } catch (err) {
      console.log("Delete Error:", err.message);
    }
  };

  // -----------------------------
  // CALCULATIONS
  // -----------------------------
  const total = {
    calories: items.reduce((a, b) => a + Number(b.calories || 0), 0),
    protein: items.reduce((a, b) => a + Number(b.protein || 0), 0),
    carbs: items.reduce((a, b) => a + Number(b.carbs || 0), 0),
    fat: items.reduce((a, b) => a + Number(b.fat || 0), 0),
  };

  return (
    <div className="nutrition-container">
      <h1 className="title">Nutrition Tracking</h1>

      {/* SUMMARY SECTION */}
      <div className="summary-box">
        <h2>Today's Total</h2>

        <div className="summary-grid">
          <div className="summary-card">
            <span className="label">Calories</span>
            <span className="value">{total.calories}</span>
          </div>

          <div className="summary-card">
            <span className="label">Protein (g)</span>
            <span className="value">{total.protein}</span>
          </div>

          <div className="summary-card">
            <span className="label">Carbs (g)</span>
            <span className="value">{total.carbs}</span>
          </div>

          <div className="summary-card">
            <span className="label">Fat (g)</span>
            <span className="value">{total.fat}</span>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form className="nutrition-form" onSubmit={handleSubmit}>
        <label>Meal Type</label>
        <select name="meal" value={formData.meal} onChange={handleChange}>
          <option value="">Select Meal</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Snacks">Snacks</option>
          <option value="Dinner">Dinner</option>
        </select>

        <label>Food Name</label>
        <input
          type="text"
          name="foodName"
          value={formData.foodName}
          onChange={handleChange}
          placeholder="Enter food name"
        />

        <div className="macro-grid">
          <input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            placeholder="Calories"
          />
          <input
            type="number"
            name="protein"
            value={formData.protein}
            onChange={handleChange}
            placeholder="Protein (g)"
          />
          <input
            type="number"
            name="carbs"
            value={formData.carbs}
            onChange={handleChange}
            placeholder="Carbs (g)"
          />
          <input
            type="number"
            name="fat"
            value={formData.fat}
            onChange={handleChange}
            placeholder="Fat (g)"
          />
        </div>

        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Extra notes..."
        />

        <button className="add-btn" type="submit">
          Add Nutrition
        </button>
      </form>

      <h2>Your Nutrition Logs</h2>
      <div className="nutrition-list">
        {items.map((item) => (
          <div className="nutrition-card" key={item._id}>
            <h3>{item.foodName}</h3>
            <p><strong>Meal:</strong> {item.meal}</p>
            <p><strong>Calories:</strong> {item.calories}</p>
            <p><strong>Protein:</strong> {item.protein} g</p>
            <p><strong>Carbs:</strong> {item.carbs} g</p>
            <p><strong>Fat:</strong> {item.fat} g</p>
            {item.notes && <p className="note">{item.notes}</p>}

            <button
              className="delete-btn"
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nutrition;
