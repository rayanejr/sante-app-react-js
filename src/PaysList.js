import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const apiURL = process.env.REACT_APP_API_URL;

const PaysListScreen = () => {
 const navigate = useNavigate();
  
 const navigateTo = (route) => {
    navigate(route);
 };  
  const [pays, setPays] = useState([]);

  const getPays = async () => {
    try {
      const response = await fetch(`${apiURL}/pays`);
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setPays(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données du pays :', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiURL}/pays/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPays((prevPays) => prevPays.filter((pays) => pays.id !== id));
        console.log('Pays supprimé avec succès.');
      } else {
        console.error('Échec de la suppression du pays.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du pays :', error);
    }
  };

  useEffect(() => {
    getPays();
  }, []);

  return (
    <div style={styles.container}>
      <div style={{...styles.header, ...(window.innerWidth < 768 ? styles.smallHeader : {})}}>
        <h1 style={{...styles.headerText, ...(window.innerWidth < 768 ? styles.smallHeaderText : {})}}>Liste des Pays</h1>
        <button style={{...styles.addButton, ...(window.innerWidth < 768 ? styles.smallAddButton : {})}}
                onClick={() => navigateTo('/admin-dashboard/add-pays')}>
          Ajouter un pays
        </button>
      </div>
      <div style={styles.content}>
        {pays.map((pay) => (
          <div key={pay.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardHeaderText}>Pays ID: {pay.id}</h2>
            </div>
            <div style={styles.cardBody}>
              <p>Nom: {pay.nom}</p>
              <p>Nom Anglais: {pay.nom_anglais}</p>
              <div style={styles.actions}>
                <button style={{...styles.actionButton, marginRight: '10px'}}
                        onClick={() => navigateTo(`/admin-dashboard/edit-pays/${pay.id}`)}>
                  Modifier
                </button>
                <button style={{...styles.actionButton, ...styles.actionButtonDanger}}
                        onClick={() => handleDelete(pay.id)}>
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

export default PaysListScreen;
