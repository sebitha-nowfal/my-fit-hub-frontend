const WorkoutCard = ({ workout }) => {
  return (
    <div style={styles.card}>
      <h3>{workout.name}</h3>
      <p>Duration: {workout.duration} mins</p>
      <p>Type: {workout.type}</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    margin: "10px",
    width: "200px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  }
};

export default WorkoutCard;
