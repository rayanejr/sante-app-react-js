import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const apiURL = process.env.REACT_APP_API_URL;

const VerifyMailCode = () => {
  const navigate = useNavigate();

  const { initialEmail } = useParams(); 

  const [email, setEmail] = useState(initialEmail);
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendCode = async () => {
    alert(email);
    try {
      const response = await fetch(`${apiURL}/login/resend-code`, {
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
        alert('Erreur: ' + (data.message || 'Quelque chose a mal tourné'));
      } else {
        alert('Succès: Un code vous a été envoyé pour vérifier votre adresse mail. Veuillez vérifier votre boite mail.');
      }
    } catch (error) {
      alert('Erreur: Impossible de se connecter au serveur');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch(`${apiURL}/login/code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          verification_code: verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert('Erreur: ' + (data.message || 'Quelque chose a mal tourné'));
      } else {
        alert('Succès: Votre mail a été vérifié avec succès. Vous pouvez maintenant vous connectez.');
        navigate('/login'); 
      }
    } catch (error) {
      alert('Erreur: Impossible de se connecter au serveur');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.cardHeaderText}>Vérifier votre mail</span>
        </div>
        <div style={styles.cardBody}>
          <input
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <input
            style={styles.input}
            type="number"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Code de vérification du mail"
          />
          <button style={styles.button} onClick={handleVerifyCode}>
            <span style={{color: '#fff'}}>Vérifier le code</span>
          </button>
          <div style={styles.resendCode}>
            <button style={{background: 'none', border: 'none', padding: 0, margin: 0}} onClick={handleSendCode}>
              <span style={styles.resendCodeText}>Vous voulez recevoir un nouveau code? Cliquez ici</span>
            </button>
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
      height: '100%', 
      backgroundColor: '#fff',
      padding: '20px',
    },
    card: {
      borderRadius: '20px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
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
      cursor: 'pointer', 
    },
    buttonText: {
      color: '#fff',
      fontSize: '16px',
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    resendCode: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
      marginTop: '10px',
    },
    resendCodeText: {
      color: '#3490dc',
      textDecoration: 'underline', 
      cursor: 'pointer', 
    },
  };
  
  export default VerifyMailCode;
  
