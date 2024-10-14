import { Card } from 'react-bootstrap';
import { useState } from 'react';
import './CustomCard.css'; 

function CustomCard({ imageUrl, title, description, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false); 

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="custom-card-container h-100" onClick={onClick}>
      <Card className="h-100 box-shadow mx-auto my-1" style={{ width: '12rem' }}>
       
        {!imageLoaded && (
          <Card.Img 
            variant="top" 
            src="/assets/backside.png" 
            alt="Loading..."
          />
        )}

       
        <Card.Img 
          variant="top" 
          src={imageUrl} 
          alt={title} 
          onLoad={handleImageLoad} 
          style={{ display: imageLoaded ? 'block' : 'none' }} 
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
