import { Card } from 'react-bootstrap';
import { useState } from 'react';
import './CustomCard.css'; 

function CustomCard({ imageUrl, title, description }) {
  const [imageLoaded, setImageLoaded] = useState(false); // Track image load state

  const handleImageLoad = () => {
    setImageLoaded(true); // Image has finished loading
  };

  return (
    <div className="custom-card-container h-100">
      <Card className="h-100 box-shadow mx-auto my-1" style={{ width: '12rem' }}>
        {/* Placeholder Image (Pokémon card back) */}
        {!imageLoaded && (
          <Card.Img 
            variant="top" 
            src="/assets/backside.png" // Path to your Pokémon card back image
            alt="Loading..."
          />
        )}

        {/* Actual Card Image */}
        <Card.Img 
          variant="top" 
          src={imageUrl} 
          alt={title} 
          onLoad={handleImageLoad} 
          style={{ display: imageLoaded ? 'block' : 'none' }} // Hide until image is loaded
        />

        <Card.Body className="d-flex flex-column">
          <Card.Title>{title}</Card.Title>
          <hr />
          <Card.Text className="mt-auto">{description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CustomCard;
