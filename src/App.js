import React from 'react';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import './App.css';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

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

const AdminHeaderButtons = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate('/'); 
  };

  return (
    <div style={styles.rightHeader}>
      <button onClick={() => navigate('/admin-dashboard')} style={styles.rightHeaderButtons}>
        <span style={styles.rightHeaderButtonsText}>
          AdminDashboard
        </span>
      </button>
      <button onClick={() => navigate('/')} style={styles.rightHeaderButtons}>
        <span style={styles.rightHeaderButtonsText}>
          Déconnexion
        </span>
      </button>
    </div>
  );
};

const UserHeaderButtons = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.rightHeader}>
      <button onClick={() => navigate('/user-dashboard')} style={styles.rightHeaderButtons}>
        <span style={styles.rightHeaderButtonsText}>
          Carte
        </span>
      </button>
      <button onClick={() => navigate('/')} style={styles.rightHeaderButtons}>
        <span style={styles.rightHeaderButtonsText}>
          Déconnexion
        </span>
      </button>
    </div>
  );
};

const UnauthenticatedHeaderButtons = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.rightHeader}>
      <button onClick={() => navigate('/login')} style={styles.rightHeaderButtons}>
        <span style={styles.rightHeaderButtonsText}>
          Connexion
        </span>
      </button>
      <button onClick={() => navigate('/register')} style={styles.rightHeaderButtons}>
        <span style={styles.rightHeaderButtonsText}>
          Inscription
        </span>
      </button>
    </div>
  );
};

const LogoHeader = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
};

const LayoutAdminHeader = ({ children }) => {
  return (
    <>
      <LogoHeader />
      <AdminHeaderButtons />
      <div>{children}</div>
    </>
  );
};

const LayoutUserHeader = ({ children }) => {
  return (
    <>
      <LogoHeader />
      <UserHeaderButtons />
      <div>{children}</div>
    </>
  );
};

const LayoutUnauthenticatedHeader = ({ children }) => {
  return (
    <>
      <LogoHeader />
      <UnauthenticatedHeaderButtons />
      <div>{children}</div>
    </>
  );
};


function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutUnauthenticatedHeader><WelcomeScreen /></LayoutUnauthenticatedHeader>} />
        <Route path="/register" element={<LayoutUnauthenticatedHeader><RegisterScreen /></LayoutUnauthenticatedHeader>} />
        <Route path="*" element={<LayoutUnauthenticatedHeader><h1>Page not found</h1></LayoutUnauthenticatedHeader>} />
        <Route path="/login" element={<LayoutUnauthenticatedHeader><LoginScreen /></LayoutUnauthenticatedHeader>} />
        <Route path="/user-dashboard" element={<LayoutUserHeader><UserDashboardScreen /></LayoutUserHeader>} />
        <Route path="/admin-dashboard" element={<LayoutAdminHeader><AdminDashboardScreen /></LayoutAdminHeader>} />
        <Route path="/verify-mail-code/:email" element={<LayoutUnauthenticatedHeader><VerifyMailCodeScreen /></LayoutUnauthenticatedHeader>} />
        <Route path="/verify-reset-code" element={<LayoutUnauthenticatedHeader><VerifyResetCodeScreen /></LayoutUnauthenticatedHeader>} />
        <Route path="/confirm-password" element={<LayoutUnauthenticatedHeader><ConfirmPasswordScreen /></LayoutUnauthenticatedHeader>} />
        <Route path="/forgot-password" element={<LayoutUnauthenticatedHeader><ForgotPasswordScreen /></LayoutUnauthenticatedHeader>} />
        <Route path="/reset-password/:email" element={<LayoutUnauthenticatedHeader><ResetPasswordScreen /></LayoutUnauthenticatedHeader>} />
        <Route path="/countrydetails/:countryName" element={<LayoutUserHeader><CountryDetailsScreen /></LayoutUserHeader>} />
        <Route path="/admin-dashboard/actes-sante-list" element={<LayoutAdminHeader><ActesSanteListScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/deplacements-list" element={<LayoutAdminHeader><DeplacementsListScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/pays-list" element={<LayoutAdminHeader><PaysListScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/user-list" element={<LayoutAdminHeader><UserListScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/recommandation-list" element={<LayoutAdminHeader><RecommandationListScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/add-actes-sante" element={<LayoutAdminHeader><AddActesSanteScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/add-deplacements" element={<LayoutAdminHeader><AddDeplacementsScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/add-pays" element={<LayoutAdminHeader><AddPaysScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/add-recommandation" element={<LayoutAdminHeader><AddRecommandationScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/add-user" element={<LayoutAdminHeader><AddUserScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/edit-actes-sante/:acteSanteId" element={<LayoutAdminHeader><EditActesSanteScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/edit-deplacements/:deplacementId" element={<LayoutAdminHeader><EditDeplacementsScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/edit-pays/:paysId" element={<LayoutAdminHeader><EditPaysScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/edit-recommandation/:recommandationId" element={<LayoutAdminHeader><EditRecommandationScreen/></LayoutAdminHeader>}/>
        <Route path="/admin-dashboard/edit-user/:userId" element={<LayoutAdminHeader><EditUserScreen/></LayoutAdminHeader>}/>
      </Routes>
    </div>
  );
}

const styles = {
  logo: {
    width: '100px', 
    height: '40px', 
    objectFit: 'contain' 
  },
  rightHeader: {
    textAlign: 'center',
    marginTop: '10px',
  },
  rightHeaderButtons: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  rightHeaderButtonsText: {
    color: '#3490dc',
  },
};


export default App;
