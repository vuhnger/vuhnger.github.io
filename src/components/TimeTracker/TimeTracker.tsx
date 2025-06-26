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
  const [focusedWheel, setFocusedWheel] = useState<'start' | 'end' | null>(null);
  
  // For scroll sensitivity control
  const lastScrollTime = useRef<Record<'start' | 'end', number>>({ start: 0, end: 0 });
  const scrollThreshold = useRef<Record<'start' | 'end', number>>({ start: 0, end: 0 });
  
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
    const rawDecimal = hours + minutes / 60;

    // Rund til nærmeste kvarter
    const rounded = Math.round(rawDecimal * 4) / 4;

    // Fjern .0 hvis det er et helt tall
    const totalHours = `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded} t`;

  // Handle wheel rotation with reduced sensitivity
  const handleWheelScroll = (wheel: 'start' | 'end', e: React.WheelEvent) => {
    e.preventDefault(); // Prevent page scrolling
    
    const now = Date.now();
    const timeSinceLastScroll = now - lastScrollTime.current[wheel];
    
    // Accumulate scroll delta
    scrollThreshold.current[wheel] += Math.abs(e.deltaY);
    
    // Debounce: Only allow changes every 150ms
    if (timeSinceLastScroll < 150) {
      return;
    }
    
    // Require a minimum threshold of wheel movement
    if (scrollThreshold.current[wheel] < 50) {
      return;
    }
    
    // Reset threshold
    scrollThreshold.current[wheel] = 0;
    
    // Update last scroll time
    lastScrollTime.current[wheel] = now;
    
    // Determine direction
    const direction = e.deltaY > 0 ? 'down' : 'up';
    const increment = direction === 'up' ? 1 : -1;
    
    if (wheel === 'start') {
      const newValue = (startTime + increment + TIME_INTERVALS.length) % TIME_INTERVALS.length;
      setStartTime(newValue);
    } else {
      const newValue = (endTime + increment + TIME_INTERVALS.length) % TIME_INTERVALS.length;
      setEndTime(newValue);
    }
  };

  // Handle keyboard events for arrow up/down
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!focusedWheel) return;
      
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const increment = 1;
        if (focusedWheel === 'start') {
          const newValue = (startTime + increment + TIME_INTERVALS.length) % TIME_INTERVALS.length;
          setStartTime(newValue);
        } else {
          const newValue = (endTime + increment + TIME_INTERVALS.length) % TIME_INTERVALS.length;
          setEndTime(newValue);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const increment = -1;
        if (focusedWheel === 'start') {
          const newValue = (startTime + increment + TIME_INTERVALS.length) % TIME_INTERVALS.length;
          setStartTime(newValue);
        } else {
          const newValue = (endTime + increment + TIME_INTERVALS.length) % TIME_INTERVALS.length;
          setEndTime(newValue);
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedWheel, startTime, endTime]);

  // Handle mouse/touch events for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaY = e.clientY - isDragging.initialY;
      const sensitivity = 30; // Reduced sensitivity (was 10)
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
              className={`time-wheel ${focusedWheel === 'start' ? 'focused' : ''}`}
              ref={startWheelRef}
              onWheel={(e) => handleWheelScroll('start', e)}
              onMouseDown={(e) => setIsDragging({ wheel: 'start', initialY: e.clientY, initialValue: startTime })}
              onTouchStart={(e) => setIsDragging({ wheel: 'start', initialY: e.touches[0].clientY, initialValue: startTime })}
              onFocus={() => setFocusedWheel('start')}
              onBlur={() => setFocusedWheel(null)}
              tabIndex={0}
              role="slider"
              aria-label="Kom på jobb tid"
              aria-valuetext={TIME_INTERVALS[startTime].label}
            >
              <div className="wheel-overlay"></div>
              {renderWheelOptions(startTime)}
            </div>
          </div>
          
          <div className="time-wheel-container">
            <h3>Dro fra jobb</h3>
            <div 
              className={`time-wheel ${focusedWheel === 'end' ? 'focused' : ''}`}
              ref={endWheelRef}
              onWheel={(e) => handleWheelScroll('end', e)}
              onMouseDown={(e) => setIsDragging({ wheel: 'end', initialY: e.clientY, initialValue: endTime })}
              onTouchStart={(e) => setIsDragging({ wheel: 'end', initialY: e.touches[0].clientY, initialValue: endTime })}
              onFocus={() => setFocusedWheel('end')}
              onBlur={() => setFocusedWheel(null)}
              tabIndex={0}
              role="slider"
              aria-label="Dro fra jobb tid"
              aria-valuetext={TIME_INTERVALS[endTime].label}
            >
              <div className="wheel-overlay"></div>
              {renderWheelOptions(endTime)}
            </div>
          </div>
        </div>
        
        <div className="result-container">
          <h2>Du jobbet:</h2>
          <div className="total-hours">{totalHours}</div>
          <div className="lunch-note">- 30min lunsj</div>
        </div>
      </div>
      
      <div className="instruction-text">
        <p>Bruk piltaster ↑/↓ eller mushjul for å justere tidene</p>
      </div>

      <WorkTimeReverseCalculator/>
    </div>
  );
}

function WorkTimeReverseCalculator() {
  const [mode, setMode] = useState<'start' | 'end'>('start');
  const [selectedTime, setSelectedTime] = useState(32); // 08:00
  const [workHours, setWorkHours] = useState(7.5); // f.eks. 7.5 timer

  const calculateOtherTime = () => {
    const totalMinutes = Math.round(workHours * 60 + LUNCH_BREAK);

    const minutes = Math.floor(selectedTime / 4) * 60 + (selectedTime % 4) * 15;
    let resultMinutes = mode === 'start' ? minutes + totalMinutes : minutes - totalMinutes;
    if (resultMinutes < 0) resultMinutes += 24 * 60;
    resultMinutes %= 24 * 60;

    const hours = Math.floor(resultMinutes / 60);
    const mins = resultMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <div className="reverse-calculator">
      <h2>Jobbtid-kalkulator</h2>

      <div className="mode-selector">
        <label>
          <input
            type="radio"
            value="start"
            checked={mode === 'start'}
            onChange={() => setMode('start')}
          />
          Jeg vet når jeg begynner
        </label>
        <label>
          <input
            type="radio"
            value="end"
            checked={mode === 'end'}
            onChange={() => setMode('end')}
          />
          Jeg vet når jeg slutter
        </label>
      </div>

      <div className="time-picker">
        <label>
          {mode === 'start' ? 'Starttid' : 'Sluttid'}:
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(Number(e.target.value))}
          >
            {TIME_INTERVALS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="work-hours-input">
        <label>
          Hvor mange timer skal du jobbe (inkl. 30 min lunsj)?
          <input
            type="number"
            step="0.25"
            min="0"
            value={workHours}
            onChange={(e) => setWorkHours(parseFloat(e.target.value))}
          />
        </label>
      </div>

      <div className="result-display">
        <strong>
          {mode === 'start' ? 'Du må gå kl' : 'Du må møte kl'}: {calculateOtherTime()}
        </strong>
      </div>
    </div>
  );
}