import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const apiURL = process.env.REACT_APP_API_URL;

const CountryDetails = () => {
  const { countryName } = useParams();
  const [userId, setUserId] = useState('');
  const [healthCareServices, setHealthCareServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Sélectionnez votre pays de départ');
  const [recommendations, setRecommendations] = useState([]);
  const [newRecommendation, setNewRecommendation] = useState('');
  const [paysId, setPaysId] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [distance, setDistance] = useState(null);
  const [carbonFootprint, setCarbonFootprint] = useState(null);


  const [departureCountries, setDepartureCountries] = useState([]);


  const getStoredUserId = async () => {
    try {
      const userId = localStorage.getItem('userId');
      return userId;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur:', error);
      return null;
    }
  };
  
  
  const getActesSante = async () => {
    try {
      const response = await fetch(`${apiURL}/actesante/${countryName}`);
      if (!response.ok) {
        throw new Error('Erreur réseau lors de la récupération des données');
      }
      const data = await response.json();
      const paysIdValue = data.pays_id; 
      setPaysId(paysIdValue); 
      const actesSante = data.actesSante;
      const formattedData = actesSante.map(item => ({
        id: item.id.toString(),
        service: item.nom,
        prix: `${item.prix}€`
      }));
      setHealthCareServices(formattedData);
  
      // Attendre que setPaysId soit terminé avant d'appeler getRecommandations
      await getRecommandations(paysIdValue);
    } catch (error) {
      console.error("Erreur lors de la récupération des actes de santé:", error);
    }
  };
  

  const getRecommandations = async (paysId) => {
    try {
      const response = await fetch(`${apiURL}/recommandations/${paysId}`);
      if (!response.ok) {
        throw new Error('Erreur réseau lors de la récupération des recommandations');
      }
      const data = await response.json();
      const formattedData = data.recommandations.map(item => ({
        id: item.id.toString(),
        text: item.contenu
      }));
      setRecommendations(formattedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des recommandations:", error);
    }
  };

  const getCountriesByName = async () => {
    try {
      const response = await fetch(`${apiURL}/pays/names`);
      if (!response.ok) {
        throw new Error('Erreur réseau lors de la récupération des noms de pays');
      }
  
      const data = await response.json();

      // Mettez à jour l'état avec la liste des noms de pays
      setDepartureCountries(data);  
    } catch (error) {
      console.error("Erreur lors de la récupération des noms de pays:", error);
    }
  };

  const getCountryByEnglishName = async (countryName) => {
    try {
      const response = await fetch(`${apiURL}/pays/${countryName}`);
      if (!response.ok) {
        throw new Error('Erreur réseau lors de la récupération des noms de pays');
      }
  
      const data = await response.json();
  
      if (data != null) {
        // Vous pouvez récupérer l'ID du pays depuis la réponse de l'API
        setSelectedCountryId(data.id);
        return data.nom_anglais ;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des noms de pays:", error);
      return null;
    }
  };
  
  useEffect(() => {
    getActesSante();
    getCountriesByName();
  }, []);

  const addTrajet = async (paysId, selectedCountryId, carbonFootprint) => {
    try {
      const userId = await getStoredUserId();
      
      const requestData = {
        user_id: userId,
        pays_id: paysId,
        pays_id2: selectedCountryId, 
        empreinte_co2: carbonFootprint,
      };
  
      const response = await fetch(`${apiURL}/deplacement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.status === 201) {
        alert('Déplacement enregistré avec succès!');
      } else {
        console.error('Erreur lors de la création du déplacement:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du trajet:', error);
      return null;
    }
  };  
    const AddRecommendation = async () => {
      try {
        const response = await fetch(`${apiURL}/recommandations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contenu: newRecommendation,
            pays_id: paysId, 
          }),
        });
    
        if (response.ok) {
          const data = await response.json();
          if (data.recommandation) {
    
            setNewRecommendation('');
    
          } else {
            console.error('Erreur lors de la création de la recommandation:', data.message);
          }
        } else {
          console.error('Erreur lors de la création de la recommandation:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la création de la recommandation:', error);
      }
      getRecommandations(paysId);
    };  
    const handleDeleteRecommendation = async (recommendationId) => {
      try {
        const response = await fetch(`${apiURL}/recommandations/${recommendationId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Erreur réseau lors de la suppression de la recommandation');
        }
        
        setRecommendations(prevRecommendations =>
          prevRecommendations.filter(recommendation => recommendation.id !== recommendationId)
        );
      } catch (error) {
        console.error("Erreur lors de la suppression de la recommandation:", error);
      }
    };    
    
    const handleEstimateCarbonFootprint = async (departureCountry, selectedCountry) => {
      async function getCapital(countryName) {
        const apiUrl = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`;
        
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
      
          if (Array.isArray(data) && data.length > 0) {
            const capital = data[0].capital[0];
            return capital;
          } else {
            return null;
          }
        } catch (error) {
          console.error('Erreur lors de la récupération de la capitale:', error);
          return null;
        }
      }
            
      async function getLatLng(city) {
        const apiKey = 'AIzaSyBJvL7tfCzIXc5w56h0xtbiF1_Lb5roxi4';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${apiKey}`;
        
        try {
          const response = await fetch(url);
          const data = await response.json();
          
          if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            return { latitude: location.lat, longitude: location.lng };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des coordonnées:', error);
          return null;
        }
      }
    
      // Fonction pour calculer la distance entre deux points en utilisant la formule de la sphère
      function calculateDistance(lat1, lon1, lat2, lon2) {
        const earthRadius = 6371; // Rayon de la Terre en km
        const latDelta = toRadians(lat2 - lat1);
        const lonDelta = toRadians(lon2 - lon1);
    
        const a = Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
                  Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                  Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        return earthRadius * c;
      }
    
      // Fonction pour convertir des degrés en radians
      function toRadians(degrees) {
        return degrees * (Math.PI / 180);
      }
    
      // Fonction pour calculer l'empreinte carbone
      function calculateCarbonFootprint(distance) {
        return distance * (229.97 * 0.001); // Conversion en kgCO2e/km/personne
      }
    
      async function calculateEmissions(departureCountry, selectedCountry) {      
        const englishDepartureCountry = await getCountryByEnglishName(departureCountry);
        const englishSelectedCountry = await getCountryByEnglishName(selectedCountry);
        const selectedCity = await getCapital(englishDepartureCountry);
        const departureCity = await getCapital(englishSelectedCountry);
        const departureLoc = await getLatLng(departureCity);
        const selectedLoc = await getLatLng(selectedCity);
    
        if (departureLoc && selectedLoc) {
          const distance = calculateDistance(departureLoc.latitude, departureLoc.longitude, selectedLoc.latitude, selectedLoc.longitude);
          const carbonFootprint = calculateCarbonFootprint(distance);
          
          setDistance(distance.toFixed(2));
          setCarbonFootprint(carbonFootprint.toFixed(2));      
        } else {
          console.error("Erreur de calcul des émissions de carbone lors du trajet");
        }
      }
    
      calculateEmissions(departureCountry, selectedCountry);
      
    };

    useEffect(() => {
      getActesSante();
      getCountriesByName();
      (async () => {
        try {
          setUserId = await getStoredUserId(); // Attendez que la promesse soit résolue
          console.log(userId); // Maintenant, cela devrait correctement afficher la valeur de userId
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur:', error);
        }
      })();  
    }, []);

    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <p style={styles.cardHeaderText}>Actes de Santé en {countryName}</p>
          </div>
          <div style={styles.cardBody}>
            {healthCareServices.map((service) => (
              <div key={service.id} style={styles.serviceCard}>
                <p style={styles.serviceText}>{service.service} - {service.prix}</p>
              </div>
            ))}
  
            <p style={styles.subtitle}>Recommandations pour {countryName}</p>
            {recommendations.map((recommendation) => (
              <div key={recommendation.id} style={styles.recommendationCard}>
                <p>{recommendation.text}</p>
                {recommendation.id !== userId && (
                  <button style={styles.deleteButton} onClick={() => handleDeleteRecommendation(recommendation.id)}>
                    Supprimer
                  </button>
                )}
              </div>
            ))}
  
            <button style={styles.button} onClick={AddRecommendation}>Ajouter Recommandation</button>
            <input
              style={styles.input}
              onChange={(e) => setNewRecommendation(e.target.value)}
              value={newRecommendation}
              placeholder="Ajouter une recommandation"
            />
  
            <p style={styles.subtitle}>Estimation de l'Empreinte Carbone pour le Voyage</p>
            <button onClick={() => setModalVisible(true)} style={styles.dropdown}>
              {selectedCountry}
            </button>
  
            {modalVisible && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalContainer}>
                  <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                    <div style={styles.modalHeader}>
                      <button style={styles.closeButton} onClick={() => setModalVisible(false)}>X</button>
                    </div>
                    <div style={styles.modalBody}>
                      {departureCountries.map((country, index) => (
                        <button
                          key={index}
                          style={styles.countryOption}
                          onClick={() => {
                            setModalVisible(false);
                            setSelectedCountry(country);
                          }}>
                          {country}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedCountry !== "Sélectionnez votre pays de départ" && (
              <button style={styles.button} onClick={() => handleEstimateCarbonFootprint(countryName, selectedCountry)}>
                Calculer l'empreinte carbone
              </button>
            )}
            <div>
              {distance !== null && carbonFootprint !== null && (
                <div>
                  <p>Distance: {distance} km</p>
                  <p>Empreinte carbone: {carbonFootprint} kgCO2e/km/personne</p>
                </div>
              )}
            </div>
            {carbonFootprint && (
              <button style={styles.button} onClick={() => addTrajet(paysId, selectedCountryId, carbonFootprint)}>
                Ajouter aux trajets sauvegardés
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };  

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh', // Assure que le container prend au moins toute la hauteur de la vue
  },
  card: {
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    maxWidth: '800px', // Taille maximale pour une lecture confortable
    width: '100%', // S'adapte à la largeur de l'écran
    margin: '1rem',
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#0056b3', // Bleu profond pour un contraste élevé avec le texte blanc
    color: '#ffffff',
    padding: '1rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardHeaderText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: '1rem',
  },
  serviceCard: {
    borderBottom: '1px solid #eeeeee', // Ligne de séparation subtile
    paddingBottom: '0.5rem',
    marginBottom: '0.5rem',
  },
  serviceText: {
    fontSize: '1rem',
    color: '#333333', // Couleur foncée pour une meilleure lisibilité
  },
  subtitle: {
    fontWeight: 'bold',
    marginTop: '1rem',
    marginBottom: '0.5rem',
    fontSize: '1.2rem',
  },
  button: {
    backgroundColor: '#28a745', // Vert pour les actions positives
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0.5rem',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    ':hover': { // Pseudo-classe hover pour un feedback visuel
      backgroundColor: '#218838',
    }
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Rouge pour les actions de suppression
    ':hover': {
      backgroundColor: '#c82333',
    }
  },
  input: {
    width: '100%', // Utilise toute la largeur disponible pour une entrée facile
    padding: '10px',
    marginBottom: '1rem',
    border: '1px solid #cccccc',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    padding: 20,
    background: '#fff',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '80%',
    overflowY: 'auto',
  },
  modalContent: {
    // Style selon besoin
  },
  modalHeader: {
    // Style selon besoin
  },
  closeButton: {
    // Style selon besoin
  },
  modalBody: {
    overflowY: 'auto',
  },
  dropdown: {
    width: '100%',
    padding: '10px',
    marginBottom: '1rem',
    border: '1px solid #cccccc',
    borderRadius: '5px',
    background: '#ffffff',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  modalView: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000, // S'assure que la modale est bien au-dessus des autres éléments
    maxWidth: '600px',
    width: '90%',
  },
  countryOption: {
    padding: '10px',
    ':hover': {
      backgroundColor: '#f0f0f0',
    }
  },
};



// Exemple de composant avec liste déroulante pour les pays





export default CountryDetails;
