import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const apiURL = process.env.REACT_APP_API_URL;

const EditRecommandationScreen = () => {
    const { recommandationId } = useParams(); 
    const navigate = useNavigate(); 
    const [recommandation, setRecommandation] = useState({
        contenu: '',
        pays_id: ''
      });
  
    const getRecommandation = async () => {
      try {
        const response = await fetch(`${apiURL}/recommandation/${recommandationId}`);
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        const data = await response.json();
        setRecommandation(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };
  
    const handleInputChange = (name, value) => {
      setRecommandation(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleUpdate = async () => {
      try {
        const response = await fetch(`${apiURL}/recommandations/${recommandationId}`, {
          method: 'PATCH', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recommandation),
        });
        
        if (response.ok) {
          console.log('Recommandation mise à jour avec succès.');
          navigate(-1);
        } else {
          console.error('Échec de la mise à jour de la recommandation.');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la recommandation :', error);
      }
    };  

  useEffect(() => {
    getRecommandation();
  }, [recommandationId]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>Modifier la recommandation</h2>
      </div>
      <div style={styles.card}>
        <div style={styles.cardBody}>
          <label style={styles.label}>Contenu</label>
          <input
            style={styles.input}
            value={recommandation.contenu}
            onChange={(e) => handleInputChange('contenu', e.target.value)}
            placeholder="Contenu"
          />
          <label style={styles.label}>Pays ID</label>
          <input
            style={styles.input}
            type="number"
            value={recommandation.pays_id}
            onChange={(e) => handleInputChange('pays_id', e.target.value)}
            placeholder="Pays ID"
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

  export default EditRecommandationScreen
