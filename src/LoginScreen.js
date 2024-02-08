import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_API_URL;
  const storeUserId = (userId) => {
    try {
      localStorage.setItem('userId', userId.toString());
    } catch (error) {
      console.error('Erreur lors du stockage de l\'ID de l\'utilisateur:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        if (data.is_admin && data.email_verified_at) {
          navigate('/admin-dashboard'); // Navigation vers le tableau de bord administrateur
        } else {
          if (data.email_verified_at) {
            storeUserId(data.id);
            navigate('/user-dashboard'); // Navigation vers le tableau de bord utilisateur
          } else {
            alert("Vous n'avez pas encore validé votre compte! Vous allez être redirigé vers la page de vérification.");
            navigate(`/verify-mail-code/${email}`); // Navigation vers la page de vérification
          }
        }
      } else {
        setErrorMessage(data.message || 'Erreur de connexion');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Une erreur est survenue lors de la connexion');
    }
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.loginInfo}>
        <h2 style={styles.loginInfoTitle}>Bienvenue sur Santé-App</h2>
        <p style={styles.loginInfoText}>
          Rejoignez-nous et découvrez le moyen premium de vérifier votre état de santé, de gérer vos rendez-vous et de rester au courant de vos besoins médicaux en toute simplicité.
        </p>
        <p style={styles.loginInfoText}>
          Vous n'avez pas de compte ? <a href="/register" style={styles.linkText}>Inscrivez-vous maintenant</a>
        </p>
      </div>

      <div style={styles.loginForm}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardHeaderText}>Connectez-vous à votre compte</h2>
          </div>
          <div style={styles.cardBody}>
            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            <input style={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input style={styles.input} type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button style={styles.button} onClick={handleLogin}>
              <span style={styles.buttonText}>Se connecter</span>
            </button>
            <div style={styles.forgotPassword}>
              <a href="/forgot-password" style={styles.linkText}>Vous avez oublié votre mot de passe ?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
  },
  loginInfo: {
    flex: 1,
    marginRight: '50px',
  },
  loginInfoTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  loginInfoText: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  linkText: {
    color: '#3490dc',
    textDecoration: 'underline',
  },
  loginForm: {
    flex: 1,
  },
  card: {
    borderRadius: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#6AC8FF',
    padding: '20px',
    color: '#fff',
    textAlign: 'center',
  },
  cardHeaderText: {
    fontSize: '20px',
  },
  cardBody: {
    backgroundColor: '#fff',
    padding: '20px',
  },
  input: {
    width: '100%', 
    padding: '8px', 
    marginBottom: '10px',
    borderRadius: '10px',
    border: '1px solid #ced4da',
    fontSize: '14px', 
  },
  button: {
    backgroundColor: '#3490dc',
    padding: '8px', 
    borderRadius: '20px',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    cursor: 'pointer',
    fontSize: '14px', 
  },
  buttonText: {
    fontSize: '16px',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
  forgotPassword: {
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default LoginScreen;
