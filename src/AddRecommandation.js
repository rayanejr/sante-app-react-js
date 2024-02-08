import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const apiURL = process.env.REACT_APP_API_URL;


const AddRecommandationsScreen = () => {
  const navigate = useNavigate(); 
  const [contenu, setContenu] = useState('');
  const [pays_id, setPaysId] = useState('');

  const handleSave = async () => {
    try {
      const newRecommendation = {
        contenu,
        pays_id,
      };
  
      const response = await fetch(`${apiURL}/recommandations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecommendation),
      });
  
      if (response.ok) {
        navigate(-1); 
        console.log('Recommandation ajoutée avec succès.');
      } else {
        console.error('Échec de l\'ajout de la recommandation.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recommandation :', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Ajouter une Nouvelle Recommandation</h1>
      </div>
      <div style={styles.card}>
        <div style={styles.cardBody}>
          <div>
            <label style={styles.label}>Contenu</label>
            <input
              style={styles.input}
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              placeholder="Contenu"
            />
            <label style={styles.label}>Pays ID</label>
            <input
              style={styles.input}
              value={pays_id}
              onChange={(e) => setPaysId(e.target.value)}
              placeholder="Pays ID"
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

export default AddRecommandationsScreen;


