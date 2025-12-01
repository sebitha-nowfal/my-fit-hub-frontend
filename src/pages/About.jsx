// src/components/About.jsx
import React from "react";
import "./About.css"; // We'll create this CSS file

const About = () => {
  return (
    <div className="about-container">
      <h1>About MyFitHub</h1>
      <p>
        Welcome to <strong>MyFitHub</strong>, your ultimate fitness companion! Our mission is to help you stay
        healthy, strong, and motivated through personalized workouts, nutrition tips, and expert guidance.
      </p>

      <h2>Our Features</h2>
      <ul>
        <li>Workout plans for all fitness levels</li>
        <li>Nutrition tracking and meal suggestions</li>
        <li>Professional trainers with experience in different domains</li>
        <li>Progress tracking and motivational tips</li>
      </ul>

      <h2>Our Mission</h2>
      <p>
        We aim to create a supportive environment where everyone can achieve their fitness goals, whether it’s
        building strength, improving flexibility, or staying active daily. Fitness is not just a routine—it’s a
        lifestyle!
      </p>
    </div>
  );
};

export default About;
