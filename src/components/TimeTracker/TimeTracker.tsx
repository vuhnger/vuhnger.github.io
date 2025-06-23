import { useRef, useState, useEffect } from 'react';
import './TimeTracker.css';

const TIME_INTERVALS = Array.from({ length: 96 }, (_, i) => {
  const hours = Math.floor(i / 4);
  const minutes = (i % 4) * 15;
  return {
    value: i,
    label: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  };
});

// Lunch break in minutes
const LUNCH_BREAK = 30;

export default function TimeTracker() {
  const [startTime, setStartTime] = useState(32); // 8:00 AM default
  const [endTime, setEndTime] = useState(68); // 5:00 PM default
  const [isDragging, setIsDragging] = useState<{ wheel: 'start' | 'end', initialY: number, initialValue: number } | null>(null);
  
  const startWheelRef = useRef<HTMLDivElement>(null);
  const endWheelRef = useRef<HTMLDivElement>(null);

  // Calculate total hours worked with lunch break subtracted
  const calculateHours = () => {
    const startMinutes = Math.floor(startTime / 4) * 60 + (startTime % 4) * 15;
    const endMinutes = Math.floor(endTime / 4) * 60 + (endTime % 4) * 15;
    
    let diffMinutes = endMinutes - startMinutes;
    if (diffMinutes < 0) diffMinutes += 24 * 60; // Handle overnight shifts
    
    // Subtract lunch break
    diffMinutes = Math.max(0, diffMinutes - LUNCH_BREAK);
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return { hours, minutes };
  };

  const { hours, minutes } = calculateHours();
  const totalHours = `${hours}:${minutes.toString().padStart(2, '0')}`;

  // Handle wheel rotation
  const handleWheelScroll = (wheel: 'start' | 'end', direction: 'up' | 'down') => {
    const increment = direction === 'up' ? 1 : -1;
    if (wheel === 'start') {
      const newValue = (startTime + increment + TIME_INTERVALS.length) % TIME_INTERVALS.length;
      setStartTime(newValue);
    } else {
      const newValue = (endTime + increment + TIME_INTERVALS.length) % TIME_INTERVALS.length;
      setEndTime(newValue);
    }
  };

  // Handle mouse/touch events for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaY = e.clientY - isDragging.initialY;
      const sensitivity = 10; // Pixels per step
      const steps = Math.round(deltaY / sensitivity);
      
      if (steps !== 0) {
        const newValue = (isDragging.initialValue - steps + TIME_INTERVALS.length) % TIME_INTERVALS.length;
        
        if (isDragging.wheel === 'start') {
          setStartTime(newValue);
        } else {
          setEndTime(newValue);
        }
        
        setIsDragging({
          ...isDragging,
          initialY: e.clientY,
          initialValue: newValue
        });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(null);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove as unknown as EventListener);
      document.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove as unknown as EventListener);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  // Render time options for the wheel
  const renderWheelOptions = (currentTime: number) => {
    const items = [];
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentTime + i + TIME_INTERVALS.length) % TIME_INTERVALS.length;
      const time = TIME_INTERVALS[index];
      const isActive = i === 0;
      
      items.push(
        <div 
          key={time.value}
          className={`time-option ${isActive ? 'active' : ''}`}
          style={{ 
            transform: `translateY(${i * 50}px)`,
            opacity: 1 - Math.abs(i) * 0.2
          }}
        >
          {time.label}
        </div>
      );
    }
    
    return items;
  };

  return (
    <div className="hour-calculator">
      <h1>Timekalkulator</h1>
      
      <div className="calculator-container">
        <div className="time-wheels">
          <div className="time-wheel-container">
            <h3>Kom på jobb</h3>
            <div 
              className="time-wheel"
              ref={startWheelRef}
              onWheel={(e) => handleWheelScroll('start', e.deltaY > 0 ? 'down' : 'up')}
              onMouseDown={(e) => setIsDragging({ wheel: 'start', initialY: e.clientY, initialValue: startTime })}
              onTouchStart={(e) => setIsDragging({ wheel: 'start', initialY: e.touches[0].clientY, initialValue: startTime })}
            >
              <div className="wheel-overlay"></div>
              {renderWheelOptions(startTime)}
            </div>
          </div>
          
          <div className="time-wheel-container">
            <h3>Dro fra jobb</h3>
            <div 
              className="time-wheel"
              ref={endWheelRef}
              onWheel={(e) => handleWheelScroll('end', e.deltaY > 0 ? 'down' : 'up')}
              onMouseDown={(e) => setIsDragging({ wheel: 'end', initialY: e.clientY, initialValue: endTime })}
              onTouchStart={(e) => setIsDragging({ wheel: 'end', initialY: e.touches[0].clientY, initialValue: endTime })}
            >
              <div className="wheel-overlay"></div>
              {renderWheelOptions(endTime)}
            </div>
          </div>
        </div>
        
        <div className="result-container">
          <h2>Du jobbet timer:</h2>
          <div className="total-hours">{totalHours}</div>
          <div className="lunch-note">- 30min lunsj</div>
        </div>
      </div>
    </div>
  );
}