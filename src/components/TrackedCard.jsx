import { useState, useEffect } from 'react';
import { useLazyGetCardByIdQuery } from '../redux/cardApiSlice';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function TrackedCard({ cardId, cardImage, cardName, initialMarketPrice, intervalHours }) {
 
  const [trigger, { data: cardDetails, isFetching, error }] = useLazyGetCardByIdQuery();

  const savedInterval = JSON.parse(localStorage.getItem(`${cardId}_interval`)) || intervalHours;
  const savedTimeLeft = JSON.parse(localStorage.getItem(`${cardId}_timeLeft`)) || savedInterval * 60 * 60;

  const [userInterval, setUserInterval] = useState(savedInterval); 
  const [inputInterval, setInputInterval] = useState(savedInterval); 
  const [marketPrice, setMarketPrice] = useState(initialMarketPrice); 
  const [lastMarketPrice, setLastMarketPrice] = useState(null);
  const [timeLeft, setTimeLeft] = useState(savedTimeLeft); 

  useEffect(() => {
   
    trigger(cardId);

    
    const interval = setInterval(() => {
      trigger(cardId);
      setTimeLeft(userInterval * 60 * 60); 
    }, userInterval * 60 * 60 * 1000); 

    
    return () => clearInterval(interval);
  }, [cardId, userInterval, trigger]);


  useEffect(() => {
    localStorage.setItem(`${cardId}_interval`, JSON.stringify(userInterval));
    localStorage.setItem(`${cardId}_timeLeft`, JSON.stringify(timeLeft));
  }, [userInterval, timeLeft, cardId]);

  
  useEffect(() => {
    if (cardDetails) {
      const updatedPrice =
        cardDetails?.data?.tcgplayer?.prices?.holofoil?.market ||
        cardDetails?.data?.tcgplayer?.prices?.reverseHolofoil?.market ||
        initialMarketPrice;

    
      setLastMarketPrice(marketPrice);
      setMarketPrice(updatedPrice);
    }
  }, [cardDetails, initialMarketPrice, marketPrice]);

 
  useEffect(() => {
    if (timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); 

      return () => clearInterval(countdown); 
    }
  }, [timeLeft]);


  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSetInterval = () => {
    if (inputInterval > 0) {
      setUserInterval(inputInterval); 
      setTimeLeft(inputInterval * 60 * 60); 
    }
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching card data.</div>;
  }

  return (
    <Card className="p-3 mb-4" >
         <Card.Header as="h5">Tracked Card</Card.Header>
      <Card.Body>
        <Row>
        
          <Col md={4}>
            <Card.Img src={cardImage || cardDetails?.data?.images?.small} alt={cardName || cardDetails?.data?.name} />
          </Col>

          <Col md={8}>
            <Card.Title>{cardName || cardDetails?.data?.name}</Card.Title>
           
            <Card.Text>
              Current Market Price: 
              
                $ <span className="text-success fw-bold">${marketPrice.toFixed(2)}</span>
             
            </Card.Text>

            <Card.Text>
              Last Market Price: <span className="text-secondary fw-bold">${lastMarketPrice || 'N/A'}</span>
            </Card.Text>
           
            <Form.Group controlId="intervalInput" className="mt-3">
              <Form.Label>Set Tracker Interval (Hours)</Form.Label>
              <Form.Control
                type="number"
                value={inputInterval}
                onChange={(e) => setInputInterval(e.target.value)}
                min="1"
              />
            </Form.Group>
            <Button variant="danger" className="mt-3" onClick={handleSetInterval}>
              Set Tracker Interval
            </Button>

           
            <div className="mt-3">
              <h5>Next Update In: {formatTime(timeLeft)}</h5>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TrackedCard;
