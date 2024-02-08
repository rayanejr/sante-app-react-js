import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_API_URL;

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(`${apiURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 201) {
        navigate(`/verify-mail-code`);
      } else {
        setErrorMessage(data.message || 'Erreur lors de l’inscription');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Une erreur réseau est survenue');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '20px',
      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '400px',
      padding: '20px',
    },
    cardHeader: {
      backgroundColor: '#6AC8FF',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
      padding: '20px',
      textAlign: 'center',
    },
    cardHeaderTitle: {
      color: '#fff',
      fontSize: '20px',
      fontWeight: '600',
    },
    cardBody: {
      padding: '20px',
    },
    inputContainer: {
      marginBottom: '15px',
    },
    input: {
      width: '100%',
      padding: '10px', 
      border: '1px solid #ced4da',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa',
    },
    buttonContainer: {
      marginBottom: '15px',
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#3490dc',
      border: 'none',
      borderRadius: '20px',
      padding: '15px',
      width: '100%',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '10px',
    },
    alreadyRegistered: {
      textAlign: 'center',
      marginTop: '10px',
    },
    alreadyRegisteredButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
    },
    alreadyRegisteredText: {
      color: '#3490dc',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardHeaderTitle}>Rejoignez-nous</h2>
        </div>
        <div style={styles.cardBody}>
          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              placeholder="Votre nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              placeholder="Créez un mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              placeholder="Confirmez votre mot de passe"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={handleRegister}>
              <span style={styles.buttonText}>S'inscrire</span>
            </button>
          </div>
          {errorMessage ? <p style={styles.errorText}>{errorMessage}</p> : null}
          <div style={styles.alreadyRegistered}>
            <button onClick={() => navigate('/login')} style={styles.alreadyRegisteredButton}>
              <span style={styles.alreadyRegisteredText}>
                Déjà inscrit ? Connectez-vous
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
