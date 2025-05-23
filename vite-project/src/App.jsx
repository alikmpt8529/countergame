import { useState, useRef } from 'react'
import './App.css'

const DOT_SIZE = 20;
const DOT_MARGIN = 5;
const MAX_DOTS = 15;

function App() {
  const [dots, setDots] = useState([]);
  const [dotCount, setDotCount] = useState(0);
  const [stopped, setStopped] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    setDots([]);
    setDotCount(0);
    setStopped(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDots(prev => [...prev, prev.length]);
      setDotCount(prev => {
        const next = prev + 1;
        if (next === MAX_DOTS) {
          clearInterval(intervalRef.current);
          if (!stopped) {
            alert("ざんねん！");
          }
        }
        return next;
      });
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStopped(true);
    setDots([]);
    setDotCount(0);
    if (dotCount === 10) {
      alert("おめでとう！");
    } else {
      alert("ざんねん！");
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <button onClick={start}>スタート</button>
      <button onClick={stop} style={{ marginLeft: 8 }}>ストップ</button>
      <div
        id="dot-container"
        style={{
          position: "relative",
          width: 400,
          height: 50,
          border: "1px solid #ccc",
          marginTop: 20,
        }}
      >
        {dots.map((n, i) => (
          <div
            key={i}
            className={i === 9 ? "special-dot" : "dot"}
            style={{
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: i === 9 ? 0 : "50%",
              background: i === 9 ? "#e74c3c" : "#3498db",
              position: "absolute",
              left: i * (DOT_SIZE + DOT_MARGIN),
              top: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;