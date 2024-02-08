import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedkit, faUserMd, faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';



const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };


  return (
    <div style={styles.container}>
      {/* Jumbotron */}
      <div style={styles.jumbotron}>
        <h1 style={styles.jumbotronTitle}>Bienvenue sur Sante-App!</h1>
        <h2 style={styles.jumbotronSubtitle}>Votre guide global pour le coût des soins de santé et le tourisme médical.</h2>
        <hr style={styles.separator} />
        <p style={styles.jumbotronText}>Explorez les coûts des soins de santé à l'échelle mondiale et prenez des décisions éclairées concernant votre santé.</p>
      </div>

      {/* Features */}
      <div style={styles.featuresContainer}>
        <div style={styles.feature}>
          <FontAwesomeIcon icon={faMedkit} size="2x" color="#3A8DFF" />
          <h3 style={styles.featureTitle}>Service de Qualité</h3>
          <p style={styles.featureText}>Accédez à des services de santé de haute qualité à des prix abordables.</p>
        </div>
        <div style={styles.feature}>
          <FontAwesomeIcon icon={faUserMd} size="2x" color="#3A8DFF" />
          <h3 style={styles.featureTitle}>Experts Qualifiés</h3>
          <p style={styles.featureText}>Consultez des spécialistes renommés dans chaque domaine médical.</p>
        </div>
        <div style={styles.feature}>
          <FontAwesomeIcon icon={faHeartbeat} size="2x" color="#3A8DFF" />
          <h3 style={styles.featureTitle}>Soins Personnalisés</h3>
          <p style={styles.featureText}>Recevez des soins et des traitements adaptés à vos besoins personnels.</p>
        </div>
      </div>

      {/* Testimonials */}
      <div style={styles.testimonialContainer}>
        <blockquote style={styles.testimonialQuote}>"Grâce à Sante-App, j'ai pu trouver une assurance santé qui correspond parfaitement à mes attentes et à mon budget."</blockquote>
        <cite style={styles.testimonialAuthor}>- Jeanne D., Utilisatrice de Sante-App</cite>
      </div>

      {/* CTA */}
      <div style={styles.ctaContainer}>
        <h2 style={styles.ctaTitle}>Prêt à découvrir votre solution santé ?</h2>
        <p style={styles.ctaText}>Inscrivez-vous dès maintenant et rejoignez les milliers d'utilisateurs qui ont optimisé leur couverture santé avec nous.</p>
        <button style={styles.ctaButton} onClick={handleRegister}>
          Inscription
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  jumbotron: {
    backgroundColor: '#6AC8FF',
    padding: '40px',
    borderRadius: '12px',
    margin: '20px',
    boxShadow: '0px 0px 6px 0px rgba(0,0,0,0.1)',
  },
  jumbotronTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '10px',
  },
  jumbotronSubtitle: {
    fontSize: '16px',
    color: '#fff',
    marginBottom: '20px',
  },
  separator: {
    borderBottom: '1px solid #fff',
    marginVertical: '10px',
  },
  jumbotronText: {
    fontSize: '16px',
    color: '#fff',
    marginBottom: '20px',
  },
  jumbotronButton: {
    backgroundColor: '#fff',
    padding: '8px 15px',
    borderRadius: '5px',
    color: '#3A8DFF',
    fontSize: '16px',
  },
  featuresContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '20px',
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginTop: '10px',
  },
  featureText: {
    textAlign: 'center',
    color: '#333',
    fontSize: '14px',
  },
  testimonialContainer: {
    backgroundColor: '#f0f0f0',
    padding: '30px',
    borderRadius: '8px',
    margin: '20px',
  },
  testimonialQuote: {
    fontSize: '16px',
    color: '#555',
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    fontWeight: 'bold',
    color: '#333',
    marginTop: '10px',
  },
  ctaContainer: {
    backgroundColor: '#4e73df',
    padding: '30px',
    borderRadius: '12px',
    margin: '20px',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
  },
  ctaText: {
    fontSize: '16px',
    color: '#fff',
    marginBottom: '20px',
  },
  ctaButton: {
    backgroundColor: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    color: '#4e73df',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default WelcomeScreen;
