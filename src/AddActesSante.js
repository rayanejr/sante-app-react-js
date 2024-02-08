import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const apiURL = process.env.REACT_APP_API_URL;


const AddActesSanteScreen = () => {
  const navigate = useNavigate(); 
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [pays_id, setPays] = useState('');

  const handleSave = async () => {
    try {
      const newActeSante = {
        nom,
        description,
        prix,
        pays_id
      };

      const response = await fetch(`${apiURL}/actesante`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActeSante),
      });

      if (response.ok) {
        navigate(-1); 
        console.log('Acte de santé ajouté avec succès.');
      } else {
        console.error('Échec de l\'ajout de l\'acte de santé.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'acte de santé :', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Ajouter un Nouvel Acte de santé</h1>
      </div>
      <div style={styles.card}>
        <div style={styles.cardBody}>
          <div>
            <label style={styles.label}>Nom</label>
            <input
              style={styles.input}
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom de l'acte de santé"
            />
            <label style={styles.label}>Description</label>
            <input
              style={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <label style={styles.label}>Prix</label>
            <input
              style={styles.input}
              type="number"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              placeholder="Prix"
            />
            <label style={styles.label}>Pays ID</label>
            <input
              style={styles.input}
              type="number"
              value={pays_id}
              onChange={(e) => setPays(e.target.value)}
              placeholder="Pays"
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

export default AddActesSanteScreen;


