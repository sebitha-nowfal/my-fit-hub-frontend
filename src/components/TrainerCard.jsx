const TrainerCard = ({ trainer }) => {
  return (
    <div style={styles.card}>
      <h3>{trainer.name}</h3>
      <p>Experience: {trainer.experience} years</p>
      <p>Specialization: {trainer.specialization}</p>
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

export default TrainerCard;
