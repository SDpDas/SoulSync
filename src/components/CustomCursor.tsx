import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .nav-link, .feature-card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full pointer-events-none z-50 transition-transform duration-150 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Trailing cursor */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-pink-400 rounded-full pointer-events-none z-40 transition-transform duration-300 ease-out opacity-60"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
        }}
      />
    </>
  );
};

export default CustomCursor;