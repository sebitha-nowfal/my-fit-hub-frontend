const NutritionCard = ({ item }) => {
  return (
    <div style={styles.card}>
      <h3>{item.foodName}</h3>
      <p>Calories: {item.calories}</p>
      <p>Protein: {item.protein}g | Carbs: {item.carbs}g | Fat: {item.fat}g</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    margin: "10px",
    width: "250px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  }
};

export default NutritionCard;
