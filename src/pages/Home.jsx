import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const quotes = [
  "The only bad workout is the one that didn’t happen.",
  "Push yourself because no one else is going to do it for you.",
  "Fitness is not about being better than someone else. It’s about being better than you used to be.",
  "Don’t limit your challenges, challenge your limits.",
  "Sweat is fat crying.",
  "Take care of your body. It’s the only place you have to live.",
];

const Home = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Pick a random quote when page loads
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Fitness Tracker</h1>
      <p>Track workouts, nutrition, yoga sessions, and find expert trainers!</p>

      <div style={{ margin: "20px 0", display: "flex", gap: "15px" }}>
        <Link to="/trainers">Meet Our Trainers</Link>
        <Link to="/workouts">Start Workouts</Link>
        <Link to="/nutrition">Nutrition Plan</Link>
        <Link to="/yoga">Yoga Sessions</Link>
      </div>

      <div style={{ margin: "20px 0" }}>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Personalized Workouts</li>
          <li>Nutrition Tracking</li>
          <li>Expert Trainers & Yoga Guidance</li>
        </ul>
      </div>

      <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#f2f2f2", borderRadius: "10px" }}>
        <h2></h2>
        <p style={{ fontStyle: "italic", fontSize: "18px" }}>"{quote}"</p>
      </div>
    </div>
  );
};

export default Home;
