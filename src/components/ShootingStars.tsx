import { useEffect, useState } from "react";

interface ShootingStar {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  angle: number;
}

export const ShootingStars = () => {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const generateShootingStar = () => {
      const newStar: ShootingStar = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        top: Math.random() * 50, // Keep them in upper half
        delay: 0,
        duration: 1 + Math.random() * 2,
        angle: 45 + Math.random() * 20, // Angle variation
      };

      setStars((prev) => [...prev, newStar]);

      // Remove star after animation
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== newStar.id));
      }, (newStar.duration + 1) * 1000);
    };

    // Generate shooting stars at intervals
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every interval
        generateShootingStar();
      }
    }, 2000);

    // Initial stars
    for (let i = 0; i < 3; i++) {
      setTimeout(generateShootingStar, i * 1000);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animation: `shooting-star ${star.duration}s linear forwards`,
            animationDelay: `${star.delay}s`,
            transform: `rotate(${star.angle}deg)`,
          }}
        >
          <div className="relative">
            {/* Star head */}
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            {/* Tail */}
            <div 
              className="absolute top-1/2 left-0 h-px bg-gradient-to-r from-white to-transparent"
              style={{ width: "80px", transform: "translateY(-50%)" }}
            />
          </div>
        </div>
      ))}
      <style>{`
        @keyframes shooting-star {
          0% {
            transform: rotate(var(--angle, 45deg)) translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(var(--angle, 45deg)) translateX(300px) translateY(300px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
