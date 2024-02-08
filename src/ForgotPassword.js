import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiURL = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 

  const handleSendCode = async () => {
    try {
      const response = await fetch(`${apiURL}/password/send-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Erreur: ${data.message || 'Quelque chose a mal tourné'}`);
      } else {
        alert('Succès: Le code a bien été envoyé. Veuillez vérifier votre boite mail.');
        navigate('/verify-reset-code', { state: { email: email } }); 
      }
    } catch (error) {
      alert('Erreur: Impossible de se connecter au serveur');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardHeaderText}>Réinitialisation du mot de passe</h2>
        </div>
        <div style={styles.cardBody}>
          <p style={styles.infoText}>
            Vous avez oublié votre mot de passe ? Pas de problème.
            Indiquez-nous simplement votre adresse e-mail et nous vous enverrons un code
            de réinitialisation de mot de passe qui vous permettra d'en choisir un nouveau.
          </p>
          <input
            style={styles.input}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
          />
          <button style={styles.button} onClick={handleSendCode}>Envoyer le lien de réinitialisation du mot de passe</button>
          <div style={styles.resetPassword}>
              <a href="/verify-reset-code" style={styles.resetPasswordText}>Vous avez déjà reçu un code ? Cliquez ici</a>
            </div>
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
      boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.1)', 
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
    infoText: {
      marginBottom: '20px',
      fontSize: '16px',
    },
    input: {
      borderWidth: '1px',
      borderColor: '#ced4da',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '20px',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#3490dc',
      borderRadius: '20px',
      padding: '15px',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: '16px',
    },
    resetPassword: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
      marginTop: '10px',
    },
    resetPasswordText: {
      color: '#3490dc',
    },
  };

  export default ForgotPassword;
