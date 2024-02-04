import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

const DashboardScreen = () => {
    const navigate = useNavigate();

    const reverseGeocode = async (latitude, longitude) => {
      try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          const response = await fetch(url);
          const data = await response.json();

          if (data && data.address && data.address.country) {
              return data.address.country;
          } else {
              console.log("Aucun pays trouvé à ces coordonnées.");
              return null;
          }
      } catch (error) {
          console.error("Erreur lors de la requête de géocodage inversé : ", error);
          return null;
      }
  };

  const MapClickHandler = () => {
      useMapEvents({
          click: async (e) => {
              const countryName = await reverseGeocode(e.latlng.lat, e.latlng.lng);
              if (countryName) {
                  navigate(`/countrydetails/${countryName}`);
              }
          },
      });
      return null;
  };
    

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardHeaderText}>Bienvenue sur Sante-APP!</h2>
        </div>
        <div style={styles.cardBody}>
          <p style={styles.cardBodyText}>
            Découvrez une nouvelle ère de gestion de la santé avec Sante-APP - votre partenaire fiable pour une vie plus saine et heureuse. Notre application révolutionnaire offre une approche holistique pour gérer vos besoins de santé.
          </p>
          <MapContainer
            center={[37.78825, -122.4324]}
            zoom={13}
            scrollWheelZoom={true}
            style={styles.map}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <MapClickHandler />
          </MapContainer>
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
    backgroundColor: '#f5f5f5',
    padding: '40px',
    minHeight: '100vh',
  },
  card: {
    width: '80%',
    maxWidth: '800px',
    borderRadius: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardHeader: {
    backgroundColor: '#6AC8FF',
    padding: '30px',
    color: '#fff',
    textAlign: 'center',
  },
  cardHeaderText: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  cardBody: {
    padding: '30px',
  },
  cardBodyText: {
    color: '#333',
    fontSize: '16px',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  map: {
    height: '500px',
    width: '100%',
    marginTop: '20px',
  },
};

export default DashboardScreen;
