import React from 'react';
import logo from './logo.png';
import './App.css';
import WelcomeScreen from './WelcomeScreen'; 
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import UserDashboardScreen from './UserDashboardScreen';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Supprimez BrowserRouter ici
import CountryDetailsScreen from './CountryDetailsScreen';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="*" element={<h1>Page not found</h1>} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/user-dashboard" element={<UserDashboardScreen />} />
        <Route path="/countrydetails/:countryName" element={<CountryDetailsScreen />} />
      </Routes>
    </div>
  );
}

export default App;
