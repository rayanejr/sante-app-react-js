import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const CountryDetails = () => {
  const { countryName } = useParams();
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

  const ip = "10.192.5.233";
  const apiURL = `http://${ip}:8888/api`;

  const getStoredUserId = async () => {
    try {
      const userId = localStorage.getItem('userId');
      return userId;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur:', error);
      return null;
    }
  };

  const getActesSante = useCallback(async () => {
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
      await getRecommandations(paysIdValue);
    } catch (error) {
      console.error("Erreur lors de la récupération des actes de santé:", error);
    }
  }, [countryName, apiURL]);

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

  const getCountriesByName = useCallback(async () => {
    try {
      const response = await fetch(`${apiURL}/pays/names`);
      if (!response.ok) {
        throw new Error('Erreur réseau lors de la récupération des noms de pays');
      }
      const data = await response.json();
      setDepartureCountries(data);  
    } catch (error) {
      console.error("Erreur lors de la récupération des noms de pays:", error);
    }
  }, [apiURL]);

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
          getRecommandations(paysId); // Refresh recommendations
        } else {
          console.error('Erreur lors de la création de la recommandation:', data.message);
        }
      } else {
        console.error('Erreur lors de la création de la recommandation:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la création de la recommandation:', error);
    }
  };

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
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du trajet:', error);
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
        setSelectedCountryId(data.id);
        return data.nom_anglais;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des noms de pays:", error);
      return null;
    }
  };
  
  const handleEstimateCarbonFootprint = async (departureCountry, selectedCountry) => {
     const getCapital = async (countryNameInEnglish) => {
      const formattedCountryName = formatCountryName(countryName); 
      const apiUrl = `https://restcountries.com/v3.1/name/${encodeURIComponent(formattedCountryName)}`;
  
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Capitale non trouvée pour le pays : ${formattedCountryName}`);
        }
        const data = await response.json();
        return data[0].capital[0];
      } catch (error) {
        console.error('Erreur lors de la récupération de la capitale:', error);
        return null;
      }
    };
    const formatCountryName = (countryName) => {
      const countryNameMap = {
        "Tunisie": "Tunisia",
        "Afghanistan": "Afghanistan",
        "Afrique du Sud": "South Africa",
        "Albanie": "Albania",
        "Algérie": "Algeria",
        "Allemagne": "Germany",
        "Andorre": "Andorra",
        "Angola": "Angola",
        "Antigua-et-Barbuda": "Antigua and Barbuda",
        "Arabie Saoudite": "Saudi Arabia",
        "Argentine": "Argentina",
        "Arménie": "Armenia",
        "Australie": "Australia",
        "Autriche": "Austria",
        "Azerbaïdjan": "Azerbaijan",
        "Bahamas": "Bahamas",
        "Bahreïn": "Bahrain",
        "Bangladesh": "Bangladesh",
        "Barbade": "Barbados",
        "Belgique": "Belgium",
        "Belize": "Belize",
        "Bénin": "Benin",
        "Bhoutan": "Bhutan",
        "Biélorussie": "Belarus",
        "Birmanie": "Myanmar",
        "Bolivie": "Bolivia",
        "Bosnie-Herzégovine": "Bosnia and Herzegovina",
        "Botswana": "Botswana",
        "Brésil": "Brazil",
        "Brunei": "Brunei",
        "Bulgarie": "Bulgaria",
        "Burkina Faso": "Burkina Faso",
        "Burundi": "Burundi",
        "Cambodge": "Cambodia",
        "Cameroun": "Cameroon",
        "Canada": "Canada",
        "Cap-Vert": "Cape Verde",
        "Chili": "Chile",
        "Chine": "China",
        "Chypre": "Cyprus",
        "Colombie": "Colombia",
        "Comores": "Comoros",
        "Congo": "Congo",
        "Corée du Nord": "North Korea",
        "Corée du Sud": "South Korea",
        "Costa Rica": "Costa Rica",
        "Côte d'Ivoire": "Ivory Coast",
        "Croatie": "Croatia",
        "Cuba": "Cuba",
        "Danemark": "Denmark",
        "Djibouti": "Djibouti",
        "Dominique": "Dominica",
        "Égypte": "Egypt",
        "Émirats Arabes Unis": "United Arab Emirates",
        "Équateur": "Ecuador",
        "Érythrée": "Eritrea",
        "Espagne": "Spain",
        "Estonie": "Estonia",
        "Eswatini": "Eswatini",
        "États-Unis d'Amérique": "United States of America",
        "Éthiopie": "Ethiopia",
        "Fidji": "Fiji",
        "Finlande": "Finland",
        "France": "France",
        "Gabon": "Gabon",
        "Gambie": "Gambia",
        "Géorgie": "Georgia",
        "Ghana": "Ghana",
        "Grèce": "Greece",
        "Grenade": "Grenada",
        "Guatemala": "Guatemala",
        "Guinée": "Guinea",
        "Guinée-Bissau": "Guinea-Bissau",
        "Guinée équatoriale": "Equatorial Guinea",
        "Guyana": "Guyana",
        "Haïti": "Haiti",
        "Honduras": "Honduras",
        "Hongrie": "Hungary",
        "Îles Marshall": "Marshall Islands",
        "Îles Salomon": "Solomon Islands",
        "Inde": "India",
        "Indonésie": "Indonesia",
        "Irak": "Iraq",
        "Iran": "Iran",
        "Irlande": "Ireland",
        "Islande": "Iceland",
        "Palestine": "Palestine",
        "Italie": "Italy",
        "Jamaïque": "Jamaica",
        "Japon": "Japan",
        "Jordanie": "Jordan",
        "Kazakhstan": "Kazakhstan",
        "Kenya": "Kenya",
        "Kirghizistan": "Kyrgyzstan",
        "Kiribati": "Kiribati",
        "Koweït": "Kuwait",
        "Laos": "Laos",
        "Lesotho": "Lesotho",
        "Lettonie": "Latvia",
        "Liban": "Lebanon",
        "Libéria": "Liberia",
        "Libye": "Libya",
        "Liechtenstein": "Liechtenstein",
        "Lituanie": "Lithuania",
        "Luxembourg": "Luxembourg",
        "Macédoine du Nord": "North Macedonia",
        "Madagascar": "Madagascar",
        "Malaisie": "Malaysia",
        "Malawi": "Malawi",
        "Maldives": "Maldives",
        "Mali": "Mali",
        "Malte": "Malta",
        "Maroc": "Morocco",
        "Maurice": "Mauritius",
        "Mauritanie": "Mauritania",
        "Mexique": "Mexico",
        "États fédérés de Micronésie": "Federal States of Micronesia",
        "Moldavie": "Moldova",
        "Monaco": "Monaco",
        "Mongolie": "Mongolia",
        "Monténégro": "Montenegro",
        "Mozambique": "Mozambique",
        "Namibie": "Namibia",
        "Nauru": "Nauru",
        "Népal": "Nepal",
        "Nicaragua": "Nicaragua",
        "Niger": "Niger",
        "Nigeria": "Nigeria",
        "Norvège": "Norway",
        "Nouvelle-Zélande": "New Zealand",
        "Oman": "Oman",
        "Ouganda": "Uganda",
        "Ouzbékistan": "Uzbekistan",
        "Pakistan": "Pakistan",
        "Palaos": "Palau",
        "Panama": "Panama",
        "Papouasie-Nouvelle-Guinée": "Papua New Guinea",
        "Paraguay": "Paraguay",
        "Pays-Bas": "Netherlands",
        "Pérou": "Peru",
        "Philippines": "Philippines",
        "Pologne": "Poland",
        "Portugal": "Portugal",
        "Qatar": "Qatar",
        "République Centrafricaine": "Central African Republic",
        "République Dominicaine": "Dominican Republic",
        "République Démocratique du Congo": "Democratic Republic of the Congo",
        "République du Congo": "Republic of the Congo",
        "République Tchèque": "Czech Republic",
        "Roumanie": "Romania",
        "Royaume-Uni": "United Kingdom",
        "Russie": "Russia",
        "Rwanda": "Rwanda",
        "Saint-Christophe-et-Niévès": "Saint Kitts and Nevis",
        "Saint-Marin": "San Marino",
        "Saint-Vincent-et-les-Grenadines": "Saint Vincent and the Grenadines",
        "Sainte-Lucie": "Saint Lucia",
        "Salomon": "Solomon Islands",
        "Salvador": "El Salvador",
        "Samoa": "Samoa",
        "Sao Tomé-et-Principe": "Sao Tome and Principe",
        "Sénégal": "Senegal",
        "Serbie": "Serbia",
        "Seychelles": "Seychelles",
        "Sierra Leone": "Sierra Leone",
        "Singapour": "Singapore",
        "Slovaquie": "Slovakia",
        "Slovénie": "Slovenia",
        "Somalie": "Somalia",
        "Soudan": "Sudan",
        "Soudan du Sud": "South Sudan",
        "Sri Lanka": "Sri Lanka",
        "Suède": "Sweden",
        "Suisse": "Switzerland",
        "Suriname": "Suriname",
        "Syrie": "Syria",
        "Tadjikistan": "Tajikistan",
        "Tanzanie": "Tanzania",
        "Tchad": "Chad",
        "Thaïlande": "Thailand",
        "Timor oriental": "East Timor",
        "Togo": "Togo",
        "Tonga": "Tonga",
        "Trinité-et-Tobago": "Trinidad and Tobago",
        "Turkménistan": "Turkmenistan",
        "Turquie": "Turkey",
        "Tuvalu": "Tuvalu",
        "Ukraine": "Ukraine",
        "Uruguay": "Uruguay",
        "Vanuatu": "Vanuatu",
        "Vatican": "Vatican City",
        "Venezuela": "Venezuela",
        "Vietnam": "Vietnam",
        "Yémen": "Yemen",
        "Zambie": "Zambia",
        "Zimbabwe": "Zimbabwe"
      };
    
      return countryNameMap[countryName] || countryName;
    };
    
    
    const getLatLng = async (city) => {
      const apiKey = 'AIzaSyBJvL7tfCzIXc5w56h0xtbiF1_Lb5roxi4'; // Remplacez par votre clé API
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
    };
    const calculateEmissions = async () => {
      const departureCity = await getCapital(departureCountry);
      const selectedCity = await getCapital(selectedCountry);
  
      if (!departureCity || !selectedCity) {
        console.error("Impossible de récupérer les informations sur les capitales");
        return;
      }
  
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
    };
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const earthRadius = 6371; // Rayon de la Terre en km
      const latDelta = toRadians(lat2 - lat1);
      const lonDelta = toRadians(lon2 - lon1);
  
      const a = Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      return earthRadius * c;
    };
  
    const toRadians = (degrees) => {
      return degrees * (Math.PI / 180);
    };
  
    const calculateCarbonFootprint = (distance) => {
      return distance * (229.97 * 0.001); // Conversion en kgCO2e/km/personne
    };
  
    const departureCity = await getCapital(departureCountry);
    const selectedCity = await getCapital(selectedCountry);
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
    calculateEmissions();
  };
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  useEffect(() => {
    if (countryName) {
        getActesSante();
        getCountriesByName();
    }
  }, [countryName, getActesSante, getCountriesByName]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardHeaderText}>Actes de Santé en {countryName}</h2>
        </div>
        <div style={styles.cardBody}>
          {healthCareServices.map((service) => (
            <div key={service.id} style={styles.serviceCard}>
              <p style={styles.serviceText}>{service.service} - {service.prix}</p>
            </div>
          ))}

          <h3 style={styles.subtitle}>Recommandations pour {countryName}</h3>
          {recommendations.map((recommendation) => (
            <div key={recommendation.id} style={styles.recommendationCard}>
              <p>{recommendation.text}</p>
              <button style={styles.deleteButton} onClick={() => handleDeleteRecommendation(recommendation.id)}>
                Supprimer
              </button>
            </div>
          ))}

          <button style={styles.button} onClick={AddRecommendation}>
            Ajouter Recommandation
          </button>
          <input
            style={styles.input}
            onChange={(e) => setNewRecommendation(e.target.value)}
            value={newRecommendation}
            placeholder="Ajouter une recommandation"
          />
          
          <h3 style={styles.subtitle}>Estimation de l'Empreinte Carbone pour le Voyage</h3>
          <button onClick={() => setModalVisible(true)} style={styles.dropdown}>
            {selectedCountry}
          </button>

          <label htmlFor="countrySelect" style={styles.label}>Sélectionnez votre pays de départ :</label>
          <select id="countrySelect" style={styles.dropdown} value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Sélectionnez un pays</option>
            {departureCountries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

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
          {carbonFootprint ? (
            <button style={styles.button} onClick={() => addTrajet(paysId, selectedCountryId, carbonFootprint)}>
              Ajouter aux trajets sauvegardés
            </button>
          ) : null}
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
