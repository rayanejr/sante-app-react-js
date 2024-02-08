import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const apiURL = process.env.REACT_APP_API_URL;


const AddDeplacementsScreen = () => {
  const navigate = useNavigate(); 
  const [user_id, setUserId] = useState('');
  const [pays_id, setPaysId] = useState('');
  const [pays_id2, setPaysId2] = useState('');
  const [empreinte_co2, setEmpreinteCO2] = useState('');

  const handleSave = async () => {
    try {
      const newDeplacement = {
        user_id,
        pays_id,
        pays_id2,
        empreinte_co2,
      };
  
      const response = await fetch(`${apiURL}/deplacement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDeplacement),
      });
  
      if (response.ok) {
        navigate(-1); 
        console.log('Déplacement ajouté avec succès.');
      } else {
        console.error('Échec de l\'ajout du déplacement.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du déplacement :', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Ajouter un Nouveau Déplacement</h1>
      </div>
      <div style={styles.card}>
        <div style={styles.cardBody}>
          <div>
            <label style={styles.label}>User ID</label>
            <input
              style={styles.input}
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Utilisateur du déplacement"
            />
            <label style={styles.label}>Pays ID</label>
            <input
              style={styles.input}
              value={pays_id}
              onChange={(e) => setPaysId(e.target.value)}
              placeholder="Pays de départ"
            />
            <label style={styles.label}>Pays ID2</label>
            <input
              style={styles.input}
              value={pays_id2}
              onChange={(e) => setPaysId2(e.target.value)}
              placeholder="Pays d'arrivée"
            />
            <label style={styles.label}>Empreinte carbone</label>
            <input
              style={styles.input}
              type="number"
              value={empreinte_co2}
              onChange={(e) => setEmpreinteCO2(e.target.value)}
              placeholder="Empreinte carbone"
            />
            <button style={styles.button} onClick={handleSave}>
              <span style={styles.buttonText}>Enregistrer</span>
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
      padding: '20px',
      backgroundColor: '#f8f9fa',
    },
    header: {
      marginBottom: '20px',
    },
    headerText: {
      color: '#000', 
    },
    card: {
      borderRadius: '20px',
      backgroundColor: 'white',
      marginBottom: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    },
    cardBody: {
      padding: '20px',
    },
    label: {
      fontSize: '16px',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      borderWidth: '1px',
      borderColor: '#ced4da',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '15px',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#3490dc',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: '16px',
    },
  };

export default AddDeplacementsScreen;


