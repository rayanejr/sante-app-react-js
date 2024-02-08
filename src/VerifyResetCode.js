import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const apiURL = process.env.REACT_APP_API_URL;

const VerifyResetCode = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialEmail = searchParams.get('email') || '';

  const [email, setEmail] = useState(initialEmail);
  const [resetCode, setResetCode] = useState('');

  const handleVerifyCode = async () => {
    try {
      const response = await fetch(`${apiURL}/password/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          reset_code: resetCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert('Erreur: ' + (data.message || 'Quelque chose a mal tourné'));
      } else {
        alert('Succès: Code de réinitialisation vérifié avec succès. Vous pouvez maintenant définir un nouveau mot de passe.');
        navigate(`/reset-password/${email}`);
      }
    } catch (error) {
      alert('Erreur: Impossible de se connecter au serveur');
    }
  };

    return (
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardHeaderText}>Vérifier le code de réinitialisation</h3>
            </div>
            <div style={styles.cardBody}>
              <input
                style={styles.input}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="E-mail"
                type="email"
              />
              <input
                style={styles.input}
                value={resetCode}
                onChange={e => setResetCode(e.target.value)}
                placeholder="Code de réinitialisation"
                type="number"
              />
    
              <button style={styles.button} onClick={handleVerifyCode}>
                Vérifier le code
              </button>
            </div>
          </div>
        </div>
    );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#fff',
      padding: '20px',
    },
    card: {
      borderRadius: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
      overflow: 'hidden',
    },
    cardHeader: {
      backgroundColor: '#6AC8FF',
      padding: '20px',
    },
    cardHeaderText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    cardBody: {
      backgroundColor: '#fff',
      padding: '40px',
    },
    input: {
      borderWidth: '1px',
      borderColor: '#ced4da',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '20px',
      fontSize: '16px',
      outline: 'none', 
    },
    button: {
      backgroundColor: '#3490dc',
      borderRadius: '20px',
      padding: '15px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: '16px',
    },
  };  
  
  export default VerifyResetCode;
  