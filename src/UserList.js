import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const apiURL = process.env.REACT_APP_API_URL;

const UserListScreen = () => {
 const navigate = useNavigate();
  
    // Fonction pour naviguer vers différentes routes
 const navigateTo = (route) => {
    navigate(route);
 };  
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
      const response = await fetch(`${apiURL}/user`);
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiURL}/user/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers((prevUser) => prevUser.filter((user) => user.id !== id));
        console.log('Utilisateur supprimé avec succès.');
      } else {
        console.error('Échec de la suppression de l\'utilisateur.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div style={styles.container}>
      <div style={{...styles.header, ...(window.innerWidth < 768 ? styles.smallHeader : {})}}>
        <h1 style={{...styles.headerText, ...(window.innerWidth < 768 ? styles.smallHeaderText : {})}}>Liste des Actes de santé</h1>
        <button style={{...styles.addButton, ...(window.innerWidth < 768 ? styles.smallAddButton : {})}}
                onClick={() => navigateTo('/admin-dashboard/add-user')}>
          Ajouter un utilisateur
        </button>
      </div>
      <div style={styles.content}>
        {users.map((user) => (
          <div key={user.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardHeaderText}>Acte de santé ID: {user.id}</h2>
            </div>
            <div style={styles.cardBody}>
              <p>Nom: {user.name}</p>
              <p>Email: {user.email}</p>
              <div style={styles.actions}>
                <button style={{...styles.actionButton, marginRight: '10px'}}
                        onClick={() => navigateTo(`/admin-dashboard/edit-user/${user.id}`)}>
                  Modifier
                </button>
                <button style={{...styles.actionButton, ...styles.actionButtonDanger}}
                        onClick={() => handleDelete(user.id)}>
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

export default UserListScreen;
