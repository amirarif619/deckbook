import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

function AnimatedNumberCard({
  title,
  targetNumber,
  duration = 2500,
  className,
  isMoney = false,
}) {
  const [displayNumber, setDisplayNumber] = useState(0); // Start the number at 0

  useEffect(() => {
    const startTime = performance.now(); // Time the animation starts

    // Customized easing function for smoother and slower end
    const customEaseOut = (t) => {
      if (t < 0.9) {
        return 1 - Math.pow(1 - t, 3); // Faster deceleration until 90%
      } else {
        return 1 - Math.pow(1 - t, 6); // Significant slow down after 90%
      }
    };

    // Animation function
    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime; // Time since animation started
      const progress = Math.min(elapsedTime / duration, 1); // Progress from 0 to 1

      // Update the display number using custom easing function
      const easedProgress = customEaseOut(progress);
      const currentNumber = easedProgress * targetNumber;

      // Set the state with the current animated number (fixed to 2 decimals if it's money)
      setDisplayNumber(
        isMoney ? currentNumber.toFixed(2) : Math.ceil(currentNumber)
      );

      // If the animation is not complete, continue the animation
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Start the animation
    requestAnimationFrame(animate);

    // Cleanup if the component unmounts during animation
    return () => cancelAnimationFrame(animate);
  }, [targetNumber, duration, isMoney]); // Dependencies: targetNumber, duration, and isMoney

  return (
    <Card
      className={className}
      style={{ minHeight: '150px', textAlign: 'center', padding: '40px' }}
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
       
          <h1>{isMoney ? `$ ${displayNumber}` : displayNumber}</h1>
       
      </Card.Body>
    </Card>
  );
}

export default AnimatedNumberCard;
