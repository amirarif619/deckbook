import { useState, useEffect } from 'react';
import { useLazyGetCardByIdQuery } from '../redux/cardApiSlice';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function TrackedCard({ cardId, cardImage, cardName, initialMarketPrice, intervalHours }) {
  // Lazy load the card by ID using RTK Query
  const [trigger, { data: cardDetails, isFetching, error }] = useLazyGetCardByIdQuery();

  const [userInterval, setUserInterval] = useState(intervalHours); // For tracking user-set interval
  const [inputInterval, setInputInterval] = useState(intervalHours); // For interval input
  const [marketPrice, setMarketPrice] = useState(initialMarketPrice); // State for current market price
  const [lastMarketPrice, setLastMarketPrice] = useState(null); // State for last market price
  const [timeLeft, setTimeLeft] = useState(userInterval * 60 * 60); // Time left for countdown in seconds

  useEffect(() => {
    // Fetch card data initially
    trigger(cardId);

    // Set up the interval for fetching the data
    const interval = setInterval(() => {
      trigger(cardId);
      setTimeLeft(userInterval * 60 * 60); // Reset the timer on each API call
    }, userInterval * 60 * 60 * 1000); // Convert hours to milliseconds

    // Cleanup the interval when component unmounts
    return () => clearInterval(interval);
  }, [cardId, userInterval, trigger]);

  // Update the market price and last market price after fetching new data
  useEffect(() => {
    if (cardDetails) {
      const updatedPrice =
        cardDetails?.data?.tcgplayer?.prices?.holofoil?.market ||
        cardDetails?.data?.tcgplayer?.prices?.reverseHolofoil?.market ||
        initialMarketPrice;

      // Update lastMarketPrice before updating marketPrice
      setLastMarketPrice(marketPrice);
      setMarketPrice(updatedPrice);
    }
  }, [cardDetails, initialMarketPrice, marketPrice]);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Update every second

      return () => clearInterval(countdown); // Cleanup interval on unmount
    }
  }, [timeLeft]);

  // Format the timeLeft in hours, minutes, and seconds
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
      setUserInterval(inputInterval); // Update the interval based on user input
      setTimeLeft(inputInterval * 60 * 60); // Reset the countdown timer
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
            {/* Input field for setting the interval */}
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

            {/* Display the countdown timer */}
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
