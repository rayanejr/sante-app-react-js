import React from 'react';
import logo from './logo.png';
import './App.css';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Supprimez BrowserRouter ici

//Screens
import LoginScreen from './LoginScreen';
import UserListScreen from './UserList';
import WelcomeScreen from './WelcomeScreen';
import RegisterScreen from './RegisterScreen';
import AdminDashboardScreen from './AdminDashboardScreen';
import UserDashboardScreen from './UserDashboardScreen';
import CountryDetailsScreen from './CountryDetailsScreen';
import ConfirmPasswordScreen from './ConfirmPassword';
import ForgotPasswordScreen from './ForgotPassword';
import ResetPasswordScreen from './ResetPassword';
import EditUserScreen from './EditUser';
import AddUserScreen from './AddUser';
import RecommandationListScreen from './RecommandationList';
import AddRecommandationScreen from './AddRecommandation';
import EditRecommandationScreen from './EditRecommandation';
import DeplacementsListScreen from './DeplacementsList';
import ActesSanteListScreen from './ActesSanteList';
import PaysListScreen from './PaysList';
import EditDeplacementsScreen from './EditDeplacements';
import EditActesSanteScreen from './EditActesSante';
import AddDeplacementsScreen from './AddDeplacements';
import AddActesSanteScreen from './AddActesSante';
import EditPaysScreen from './EditPays';
import AddPaysScreen from './AddPays';
import VerifyResetCodeScreen from './VerifyResetCode';
import VerifyMailCodeScreen from './VerifyMailCode';



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
        <Route path="/admin-dashboard" element={<AdminDashboardScreen />} />
        <Route path="/verify-mail-code" element={<VerifyMailCodeScreen />} />
        <Route path="/verify-reset-code" element={<VerifyResetCodeScreen />} />
        <Route path="/confirm-password" element={<ConfirmPasswordScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/reset-password/:email" element={<ResetPasswordScreen />} />
        <Route path="/countrydetails/:countryName" element={<CountryDetailsScreen />} />
        <Route path="/admin-dashboard/actes-sante-list" element={<ActesSanteListScreen/>}/>
        <Route path="/admin-dashboard/deplacements-list" element={<DeplacementsListScreen/>}/>
        <Route path="/admin-dashboard/pays-list" element={<PaysListScreen/>}/>
        <Route path="/admin-dashboard/user-list" element={<UserListScreen/>}/>
        <Route path="/admin-dashboard/recommandation-list" element={<RecommandationListScreen/>}/>
        <Route path="/admin-dashboard/add-actes-sante" element={<AddActesSanteScreen/>}/>
        <Route path="/admin-dashboard/add-deplacements" element={<AddDeplacementsScreen/>}/>
        <Route path="/admin-dashboard/add-pays" element={<AddPaysScreen/>}/>
        <Route path="/admin-dashboard/add-recommandation" element={<AddRecommandationScreen/>}/>
        <Route path="/admin-dashboard/add-user" element={<AddUserScreen/>}/>
        <Route path="/admin-dashboard/edit-actes-sante/:acteSanteId" element={<EditActesSanteScreen/>}/>
        <Route path="/admin-dashboard/edit-deplacements/:deplacementId" element={<EditDeplacementsScreen/>}/>
        <Route path="/admin-dashboard/edit-pays/:paysId" element={<EditPaysScreen/>}/>
        <Route path="/admin-dashboard/edit-recommandation/:recommandationId" element={<EditRecommandationScreen/>}/>
        <Route path="/admin-dashboard/edit-user/:userId" element={<EditUserScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
