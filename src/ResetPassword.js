import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const apiURL = process.env.REACT_APP_API_URL;

const ResetPasswordScreen = () => {
  const navigate = useNavigate();
  const { email } = useParams(); 

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    // Vérification que les mots de passe correspondent
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    
    try {
      // Envoi de la requête à l'API
      const response = await fetch(`${apiURL}/password/new-password`, {
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
  
      if (!response.ok) {
        // Gérer les erreurs venant de l'API
        alert(data.message || 'Quelque chose a mal tourné');
      } else {
        // Mot de passe mis à jour avec succès
        alert('Mot de passe mis à jour avec succès.');
        // Rediriger l'utilisateur vers l'écran de connexion
        navigate('/login'); // Assurez-vous que le chemin est correct
      }
    } catch (error) {
      // Gérer les erreurs de réseau / requête
      alert("Impossible de se connecter au serveur");
    }
  };

  return (
    <div style={styles.container}> {/* Remplacé ScrollView par div */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.cardHeaderText}>Réinitialisation du Mot de Passe</span> {/* Remplacé Text par span */}
        </div>
        <div style={styles.cardBody}>
          {/* Formulaire */}
          <input
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Nouveau mot de passe"
            type="password"
          />
          <input
            style={styles.input}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirmer le nouveau mot de passe"
            type="password"
          />
          <button style={styles.button} onClick={handleResetPassword}>
            <span style={styles.buttonText}>Réinitialiser le mot de passe</span> {/* Remplacé Text par span dans le button */}
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
      height: '100vh', // flex: 1 en React Native est utilisé pour remplir tout l'espace disponible, en web on utilise souvent 100vh pour la hauteur complète
      backgroundColor: '#fff',
      padding: '20px',
    },
    card: {
      borderRadius: '20px',
      boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.1)', // Converti shadowColor, shadowOffset, shadowOpacity, et shadowRadius en boxShadow CSS
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
      justifyContent: 'center',
      alignItems: 'center', // En CSS, alignItems est utilisé avec display: flex
    },
    buttonText: {
      color: '#fff',
      fontSize: '16px',
    },
  };

  export default ResetPasswordScreen;
