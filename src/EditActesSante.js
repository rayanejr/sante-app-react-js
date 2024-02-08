import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const apiURL = process.env.REACT_APP_API_URL;

const EditActesSanteScreen = () => {
    const { acteSanteId } = useParams(); 
    const navigate = useNavigate(); 
    const [actesante, setActeSante] = useState({
        nom: '',
        description: '',
        prix: '',
        pays_id: ''
      });
  
    const getActeSante = async () => {
      try {
        const response = await fetch(`${apiURL}/actesantes/${acteSanteId}`);
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        const data = await response.json();
        setActeSante(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };
  
    const handleInputChange = (name, value) => {
      setActeSante(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleUpdate = async () => {
      try {
        const response = await fetch(`${apiURL}/actesante/${acteSanteId}`, {
          method: 'PATCH', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(actesante),
        });
        
        if (response.ok) {
          console.log('Acte de santé mis à jour avec succès.');
          navigate(-1);
        } else {
          console.error('Échec de la mise à jour de l\'acte de santé.');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'acte de santé :', error);
      }
    };  

  useEffect(() => {
    getActeSante();
  }, [acteSanteId]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>Modifier l'acte de santé</h2>
      </div>
      <div style={styles.card}>
        <div style={styles.cardBody}>
          <label style={styles.label}>Nom</label>
          <input
            style={styles.input}
            value={actesante.nom}
            onChange={(e) => handleInputChange('nom', e.target.value)}
            placeholder="Nom"
          />
          <label style={styles.label}>Description</label>
          <input
            style={styles.input}
            value={actesante.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Description"
          />
          <label style={styles.label}>Prix</label>
          <input
            style={styles.input}
            type="number"
            value={actesante.prix}
            onChange={(e) => handleInputChange('prix', e.target.value)}
            placeholder="Prix"
          />
          <label style={styles.label}>Pays ID</label>
          <input
            style={styles.input}
            type="number"
            value={actesante.pays_id}
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

  export default EditActesSanteScreen
