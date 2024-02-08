import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardScreen = () => {
  const navigate = useNavigate();
  
  // Fonction pour naviguer vers différentes routes
  const navigateTo = (route) => {
    navigate(route);
  };

  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <div style={styles.sidebarWrapper}>
        <h2 style={styles.sidebarHeading}>Sante-APP</h2>
          <div onClick={() => navigateTo('/admin-dashboard/actes-sante-list')} style={styles.listGroupItem}>
            <span style={styles.listGroupItemText}>Actes de Santé</span>
          </div>
          <div onClick={() => navigateTo('/admin-dashboard/deplacements-list')} style={styles.listGroupItem}>
            <span style={styles.listGroupItemText}>Déplacements</span>
          </div>
          <div onClick={() => navigateTo('/admin-dashboard/pays-list')} style={styles.listGroupItem}>
            <span style={styles.listGroupItemText}>Pays</span>
          </div>
          <div onClick={() => navigateTo('/admin-dashboard/user-list')} style={styles.listGroupItem}>
            <span style={styles.listGroupItemText}>User</span>
          </div>
          <div onClick={() => navigateTo('/admin-dashboard/recommandation-list')} style={styles.listGroupItem}>
            <span style={styles.listGroupItemText}>Recommandation</span>
          </div>
      </div>

      {/* Main Content */}
      <div style={styles.pageContentWrapper}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Tableau de Bord</h1>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              Cartographie des Coûts des Actes de Santé à l'échelle Mondiale
            </div>
            <div style={styles.cardBody}>
              Une analyse détaillée des coûts des actes de santé dans différents pays, offrant une comparaison transparente pour les utilisateurs.
            </div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              Recommandations pour le Tourisme de Santé
            </div>
            <div style={styles.cardBody}>
              Conseils pratiques et recommandations pour ceux qui envisagent le tourisme de santé, incluant des informations sur les destinations les plus prisées et les aspects à considérer.
            </div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              Impact Environnemental : Trace Carbone des Déplacements en Tourisme de Santé
            </div>
            <div style={styles.cardBody}>
              Évaluation de l'empreinte carbone liée aux voyages internationaux pour des soins médicaux, soulignant l'importance d'une approche durable.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
  },
  sidebarWrapper: {
    width: '250px',
    backgroundColor: '#3490dc',
    padding: '20px',
    color: 'white',
    minHeight: '100vh', 
  },
  sidebarHeading: {
    textAlign: 'center',
    marginBottom: '15px',
  },
  listGroupItem: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  },
  listGroupItemText: {
    color: 'white',
    fontSize: 20, 
  },
  pageContentWrapper: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: '20px',
    minHeight: '100vh', 
  },
  container: {
    maxWidth: '1200px',
  },
  heading: {
    marginBottom: '15px',
    color: '#333',
  },
  card: {
    borderRadius: '15px',
    backgroundColor: 'white',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cardHeader: {
    backgroundColor: '#6AC8FF',
    padding: '15px',
    color: 'white',
  },
  cardBody: {
    padding: '15px',
  },
};

export default AdminDashboardScreen;
