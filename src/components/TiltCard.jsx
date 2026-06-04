import { useState } from 'react';

export const TiltCard = ({ children, className = "", ...props }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    
    // Relative coordinates from center of the card
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Max rotation limits (12 degrees)
    const tiltX = (x / (box.width / 2)) * 12;
    const tiltY = -(y / (box.height / 2)) * 12;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className={`tilt-card perspective-container ${className}`}
      {...props}
    >
      <div style={{ transform: 'translateZ(25px)' }} className="h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
