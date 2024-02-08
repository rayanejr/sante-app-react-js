import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const apiURL = process.env.REACT_APP_API_URL;

const EditDeplacementsScreen = () => {
    const { deplacementId } = useParams(); 
    const navigate = useNavigate(); 
    const [deplacement, setDeplacement] = useState({
        user_id: '',
        pays_id: '',
        pays_id2: '',
        empreinte_co2: ''    
      });
  
    const getDeplacement = async () => {
      try {
        const response = await fetch(`${apiURL}/deplacement/${deplacementId}`);
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        const data = await response.json();
        setDeplacement(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };
  
    const handleInputChange = (name, value) => {
      setDeplacement(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleUpdate = async () => {
      try {
        const response = await fetch(`${apiURL}/deplacement/${deplacementId}`, {
          method: 'PATCH', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(deplacement),
        });
        
        if (response.ok) {
          console.log('Déplacement mis à jour avec succès.');
          navigate(-1);
        } else {
          console.error('Échec de la mise à jour du déplacement.');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du déplacement :', error);
      }
    };  

  useEffect(() => {
    getDeplacement();
  }, [deplacementId]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>Modifier le déplacement</h2>
      </div>
      <div style={styles.card}>
        <div style={styles.cardBody}>
          <label style={styles.label}>User ID</label>
          <input
            style={styles.input}
            value={deplacement.user_id}
            type="number"
            onChange={(e) => handleInputChange('user_id', e.target.value)}
            placeholder="User ID"
          />
          <label style={styles.label}>Pays ID</label>
          <input
            style={styles.input}
            value={deplacement.pays_id}
            type="number"
            onChange={(e) => handleInputChange('pays_id', e.target.value)}
            placeholder="Pays ID"
          />
          <label style={styles.label}>Pays ID2</label>
          <input
            style={styles.input}
            type="number"
            value={deplacement.pays_id2}
            onChange={(e) => handleInputChange('pays_id2', e.target.value)}
            placeholder="Pays ID2"
          />
          <label style={styles.label}>Empreinte CO2</label>
          <input
            style={styles.input}
            type="number"
            value={deplacement.empreinte_co2}
            onChange={(e) => handleInputChange('empreinte_co2', e.target.value)}
            placeholder="Empreinte Carbone"
          />
          <button style={styles.button} onClick={handleUpdate}>Mettre à jour</button>
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
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    cardBody: {
      padding: '20px',
    },
    label: {
      fontSize: '16px',
      marginBottom: '5px',
    },
    input: {
      borderWidth: '1px',
      borderColor: '#ced4da',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '15px',
      fontSize: '16px',
      width: '100%', 
    },
    button: {
      backgroundColor: '#3490dc',
      padding: '10px',
      borderRadius: '5px',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      marginTop: '10px',
    },
    errorText: {
      fontSize: '18px',
      color: 'red',
      textAlign: 'center',
      marginTop: '20px',
    },
  };

  export default EditDeplacementsScreen
