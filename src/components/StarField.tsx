import { useMemo } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  bright: boolean;
}

const StarField = ({ count = 60 }: { count?: number }) => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      bright: Math.random() > 0.7,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Nebula gradients */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(270 60% 75% / 0.5), transparent 70%)",
          top: "-10%",
          right: "-5%",
          animation: "nebula-drift 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]"
        style={{
          background: "radial-gradient(circle, hsl(330 50% 75% / 0.4), transparent 70%)",
          bottom: "0%",
          left: "-5%",
          animation: "nebula-drift 25s ease-in-out infinite reverse",
        }}
      />

      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
        >
          {/* Core dot */}
          <div
            className="rounded-full"
            style={{
              width: star.size,
              height: star.size,
              background: star.bright
                ? "radial-gradient(circle, hsl(0 0% 100%), hsl(270 30% 85%))"
                : "hsl(260 20% 80%)",
              animation: `sparkle-pulse ${star.duration}s ease-in-out ${star.delay}s infinite`,
              boxShadow: star.bright ? "0 0 4px 1px hsl(270 40% 85% / 0.5)" : "none",
            }}
          />
          {/* Cross sparkle on bright stars */}
          {star.bright && (
            <>
              <div
                className="absolute"
                style={{
                  width: 1,
                  height: star.size * 5,
                  background: "linear-gradient(transparent, hsl(0 0% 90% / 0.6), transparent)",
                  left: star.size / 2 - 0.5,
                  top: -(star.size * 2),
                  animation: `sparkle-cross ${star.duration}s ease-in-out ${star.delay}s infinite`,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: star.size * 5,
                  height: 1,
                  background: "linear-gradient(to right, transparent, hsl(0 0% 90% / 0.6), transparent)",
                  top: star.size / 2 - 0.5,
                  left: -(star.size * 2),
                  animation: `sparkle-cross ${star.duration}s ease-in-out ${star.delay + 0.5}s infinite`,
                }}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default StarField;
