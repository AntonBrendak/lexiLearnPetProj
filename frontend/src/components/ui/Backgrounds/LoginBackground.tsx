import React, { useEffect, useRef, useState } from "react";
import styles from "./LoginBackground.module.css";

const BUBBLE_IMAGES = ["/assets/bubbles.png"];

const Bubble = ({ src, left, size, duration, drift, id }: any) => (
  <img
    src={src}
    className={styles.bubbleImg}
    alt="bubble"
    style={{
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDuration: `${duration}s`,
      "--bubble-drift": drift + "px",
    } as React.CSSProperties}
    draggable={false}
    key={id}
  />
);

export const LoginBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bubbles, setBubbles] = useState<any[]>([]);
  const id = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const drift = getRandom(-70, 70);
      const duration = 17; // або будь-яке твоє значення
      const newBubble = {
        id: id.current++,
        src: BUBBLE_IMAGES[Math.floor(Math.random() * BUBBLE_IMAGES.length)],
        left: getRandom(8, 90),
        size: getRandom(38, 74),
        duration,
        drift,
      };
      setBubbles((prev) => [...prev, newBubble]);

      // Ставимо таймер видалення цієї бульбашки через duration секунд
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
      }, duration * 1000);
    }, getRandom(1200, 2200));

    
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let frame = 0;
     const waves = [
      { amplitude: 40, wavelength: 1500, speed: 0.02, color: '#19e9f5', offset: 0 },
      { amplitude: 60, wavelength: 2100, speed: 0.06, color: '#2bd7b4', offset: 100 },
      { amplitude: 80, wavelength: 3000, speed: 0.006, color: '#0a8ca6', offset: 200 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      waves.forEach((wave, i) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 10) {
          const y = height - 100 - wave.amplitude * Math.sin((x + frame * 60 * wave.speed + wave.offset) / wave.wavelength * Math.PI * 2);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.globalAlpha = 0.2 + i * 0.1;
        ctx.fill();
      });

      frame++;
      requestAnimationFrame(draw);
      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
      };
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

  }, []);

  return (
    <div className={styles.loginBgVisuals}>
          <img
            src="/assets/background.jpg"
            alt="background"
            className={styles.loginBgImg}
            draggable={false}
            style={{ opacity: 0.90 }} 
          />
          <canvas ref={canvasRef} className={styles.waveCanvas} />
          {bubbles.map((b) => (
            <Bubble key={b.id} {...b} />
          ))}
    </div>
  );
};

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}