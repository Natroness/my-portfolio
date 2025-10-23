import React, { useState, useRef, useEffect } from 'react';
import './TrueFocus.css';

const TrueFocus = ({ 
  children, 
  blurAmount = 5, 
  borderColor = 'green', 
  glowColor = 'rgba(0,255,0,0.6)', 
  animationDuration = 0.4,
  manualMode = true 
}) => {
  const [activeWord, setActiveWord] = useState(null);
  const [focusFrame, setFocusFrame] = useState({ x: 0, y: 0, width: 0, height: 0, visible: false });
  const containerRef = useRef(null);
  const wordRefs = useRef([]);

  // Split text into words
  const words = children.split(' ');

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!manualMode || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      // Find which word is being hovered
      let hoveredWordIndex = -1;
      wordRefs.current.forEach((wordRef, index) => {
        if (wordRef) {
          const wordRect = wordRef.getBoundingClientRect();
          const relativeWordRect = {
            left: wordRect.left - containerRect.left,
            right: wordRect.right - containerRect.left,
            top: wordRect.top - containerRect.top,
            bottom: wordRect.bottom - containerRect.top
          };

          if (mouseX >= relativeWordRect.left && 
              mouseX <= relativeWordRect.right && 
              mouseY >= relativeWordRect.top && 
              mouseY <= relativeWordRect.bottom) {
            hoveredWordIndex = index;
          }
        }
      });

      if (hoveredWordIndex !== -1) {
        const wordRef = wordRefs.current[hoveredWordIndex];
        if (wordRef) {
          const wordRect = wordRef.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          
          setFocusFrame({
            x: wordRect.left - containerRect.left,
            y: wordRect.top - containerRect.top,
            width: wordRect.width,
            height: wordRect.height,
            visible: true
          });
          setActiveWord(hoveredWordIndex);
        }
      } else {
        setFocusFrame(prev => ({ ...prev, visible: false }));
        setActiveWord(null);
      }
    };

    const handleMouseLeave = () => {
      setFocusFrame(prev => ({ ...prev, visible: false }));
      setActiveWord(null);
    };

    if (manualMode) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [manualMode]);

  const handleWordHover = (index) => {
    if (!manualMode) {
      setActiveWord(index);
      const wordRef = wordRefs.current[index];
      if (wordRef && containerRef.current) {
        const wordRect = wordRef.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        setFocusFrame({
          x: wordRect.left - containerRect.left,
          y: wordRect.top - containerRect.top,
          width: wordRect.width,
          height: wordRect.height,
          visible: true
        });
      }
    }
  };

  const handleWordLeave = () => {
    if (!manualMode) {
      setActiveWord(null);
      setFocusFrame(prev => ({ ...prev, visible: false }));
    }
  };

  return (
    <div 
      ref={containerRef}
      className="truefocus-container"
      style={{
        '--blur-amount': `${blurAmount}px`,
        '--border-color': borderColor,
        '--glow-color': glowColor,
        '--animation-duration': `${animationDuration}s`
      }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => wordRefs.current[index] = el}
          className={`truefocus-word ${activeWord === index ? 'active' : ''}`}
          onMouseEnter={() => handleWordHover(index)}
          onMouseLeave={handleWordLeave}
        >
          {word}
          {index < words.length - 1 && ' '}
        </span>
      ))}
      
      {focusFrame.visible && (
        <div
          className="truefocus-frame"
          style={{
            left: `${focusFrame.x}px`,
            top: `${focusFrame.y}px`,
            width: `${focusFrame.width}px`,
            height: `${focusFrame.height}px`,
            transition: `all ${animationDuration}s ease-out`
          }}
        />
      )}
    </div>
  );
};

export default TrueFocus;
