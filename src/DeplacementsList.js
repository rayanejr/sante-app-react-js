import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const apiURL = process.env.REACT_APP_API_URL;

const DeplacementsListScreen = () => {
 const navigate = useNavigate();
  
    // Fonction pour naviguer vers différentes routes
 const navigateTo = (route) => {
    navigate(route);
 };  
  const [deplacements, setDeplacements] = useState([]);

  const getDeplacements = async () => {
    try {
      const response = await fetch(`${apiURL}/deplacement`);
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setDeplacements(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données du déplacement :', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiURL}/deplacement/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDeplacements((prevDeplacements) => prevDeplacements.filter((deplacement) => deplacement.id !== id));
        console.log('Déplacement supprimé avec succès.');
      } else {
        console.error('Échec de la suppression du déplacement.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du déplacement :', error);
    }
  };

  useEffect(() => {
    getDeplacements();
  }, []);

  return (
    <div style={styles.container}>
      <div style={{...styles.header, ...(window.innerWidth < 768 ? styles.smallHeader : {})}}>
        <h1 style={{...styles.headerText, ...(window.innerWidth < 768 ? styles.smallHeaderText : {})}}>Liste des déplacements</h1>
        <button style={{...styles.addButton, ...(window.innerWidth < 768 ? styles.smallAddButton : {})}}
                onClick={() => navigateTo('/admin-dashboard/add-deplacements')}>
          Ajouter un déplacement
        </button>
      </div>
      <div style={styles.content}>
        {deplacements.map((deplacement) => (
          <div key={deplacement.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardHeaderText}>Déplacement ID: {deplacement.id}</h2>
            </div>
            <div style={styles.cardBody}>
              <p>User ID: {deplacement.user_id}</p>
              <p>Pays ID: {deplacement.pays_id}</p>
              <p>Pays ID 2: {deplacement.pays_id2}</p>
              <p>Empreinte CO2: {deplacement.empreinte_co2}</p>
              <div style={styles.actions}>
                <button style={{...styles.actionButton, marginRight: '10px'}}
                        onClick={() => navigateTo(`/admin-dashboard/edit-deplacements/${deplacement.id}`)}>
                  Modifier
                </button>
                <button style={{...styles.actionButton, ...styles.actionButtonDanger}}
                        onClick={() => handleDelete(deplacement.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    header: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    smallHeader: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    headerText: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
    },
    smallHeaderText: {
      fontSize: '18px',
      marginBottom: '10px',
    },
    addButton: {
      backgroundColor: '#4CAF50',
      padding: '10px',
      borderRadius: '5px',
    },
    smallAddButton: {
      padding: '8px',
      alignSelf: 'flex-start',
    },
    addButtonText: {
      color: 'white',
      fontSize: '16px',
    },
    smallAddButtonText: {
      fontSize: '14px',
    },
    content: {
      padding: '0 20px',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '20px',
      marginBottom: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    cardHeader: {
      backgroundColor: '#6AC8FF',
      padding: '20px',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
    },
    cardHeaderText: {
      color: 'white',
      fontSize: '18px',
    },
    cardBody: {
      padding: '20px',
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    actionButton: {
      backgroundColor: '#3490dc',
      padding: '10px',
      borderRadius: '5px',
      marginRight: '10px',
    },
    actionButtonText: {
      color: 'white',
    },
    actionButtonDanger: {
      backgroundColor: '#dc3545',
    },
  };  

export default DeplacementsListScreen;
