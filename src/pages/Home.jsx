// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css"; 
import AutoImage from "../components/AutoImage";


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
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="home-container">

      <h1 className="home-title">
        Welcome to <span>My Fit Hub</span>
      </h1>

      <p className="home-subtext">
        Track workouts, nutrition, yoga sessions, and find expert trainers!
      </p>

      {/* Auto-changing images */}
      <AutoImage />

      <div className="nav-buttons">
        <Link to="/trainers">Meet Our Trainers</Link>
        <Link to="/workouts">Start Workouts</Link>
        <Link to="/nutrition">Nutrition Plan</Link>
        <Link to="/yoga">Yoga Sessions</Link>
      </div>

      <div className="features">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Personalized Workouts</li>
          <li>Nutrition Tracking</li>
          <li>Expert Trainers & Yoga Guidance</li>
        </ul>
      </div>

      <div className="quote-box">
        <h2>Today's Motivation</h2>
        <p>"{quote}"</p>
      </div>

    </div>
  );
};

export default Home;
