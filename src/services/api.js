import axios from "axios";

export const API_URL = "http://localhost:5000";


export const fetchTrainers = async () => (await axios.get(`${API_URL}/trainers`)).data;
export const fetchWorkouts = async () => (await axios.get(`${API_URL}/workouts`)).data;
export const fetchNutrition = async () => (await axios.get(`${API_URL}/nutrition`)).data;
