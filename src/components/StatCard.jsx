import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

function AnimatedNumberCard({
  title,
  targetNumber,
  duration = 2500,
  isMoney = false,
}) {
  const [displayNumber, setDisplayNumber] = useState(0); 

  useEffect(() => {
    const startTime = performance.now(); 

   
    const customEaseOut = (t) => {
      if (t < 0.9) {
        return 1 - Math.pow(1 - t, 3); 
      } else {
        return 1 - Math.pow(1 - t, 6); 
      }
    };

   
    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); 

     
      const easedProgress = customEaseOut(progress);
      const currentNumber = easedProgress * targetNumber;

      
      setDisplayNumber(
        isMoney ? currentNumber.toFixed(2) : Math.ceil(currentNumber)
      );

     
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

   
    requestAnimationFrame(animate);

    
    return () => cancelAnimationFrame(animate);
  }, [targetNumber, duration, isMoney]); 

  return (
    <Card className="text-center mb-4 h-100">
      <Card.Body>
        <Card.Title className="mt-5">{title}</Card.Title>
       
          <h1>{isMoney ? `$ ${displayNumber}` : displayNumber}</h1>
       
      </Card.Body>
    </Card>
  );
}

export default AnimatedNumberCard;
