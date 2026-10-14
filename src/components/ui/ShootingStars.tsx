"use client";

import React, { useEffect, useState, useRef } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  maxDistance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
}

/**
 * Aceternity-style Shooting Stars component.
 * Real mathematical trajectory, frame-by-frame animation, and natural interval scheduling.
 */
export function ShootingStars({
  minSpeed = 9,
  maxSpeed = 16,
  minDelay = 2800,
  maxDelay = 6000,
  starColor = "#f0dba8",
  trailColor = "rgba(217, 182, 108, 0)",
  starWidth = 140,
  starHeight = 2.2,
}: ShootingStarsProps) {
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;
    let starIdCounter = 0;

    const getRandomStartPoint = () => {
      const screenW = typeof window !== "undefined" ? window.innerWidth : 1400;
      const screenH = typeof window !== "undefined" ? window.innerHeight : 900;

      // Realistic celestial entry: meteorites streak across from top or right side
      const fromTop = Math.random() < 0.7;
      const x = fromTop
        ? Math.random() * screenW * 0.85 + screenW * 0.15
        : screenW + 30;
      const y = fromTop
        ? -30
        : Math.random() * screenH * 0.5;

      // Diagonal trajectory: 215 degrees +- 15 deg (downward-left across the night sky)
      const angle = 215 + (Math.random() - 0.5) * 18;

      return {
        id: ++starIdCounter,
        x,
        y,
        angle,
        scale: 0.85 + Math.random() * 0.55,
        speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
        distance: 0,
        maxDistance: Math.max(screenW, screenH) * 1.3,
      };
    };

    const scheduleNextStar = () => {
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeoutId = setTimeout(() => {
        setStars((prev) => [...prev, getRandomStartPoint()]);
        scheduleNextStar();
      }, delay);
    };

    // First meteor shoots right after load
    timeoutId = setTimeout(() => {
      setStars([getRandomStartPoint()]);
      scheduleNextStar();
    }, 500);

    // Frame-by-frame movement
    const updateStars = () => {
      setStars((prevStars) =>
        prevStars
          .map((star) => {
            const rad = (star.angle * Math.PI) / 180;
            const newX = star.x + star.speed * Math.cos(rad);
            const newY = star.y + star.speed * Math.sin(rad);
            const newDistance = star.distance + star.speed;

            return {
              ...star,
              x: newX,
              y: newY,
              distance: newDistance,
            };
          })
          .filter((star) => {
            const screenH = typeof window !== "undefined" ? window.innerHeight : 900;
            return (
              star.distance < star.maxDistance &&
              star.x > -300 &&
              star.y < screenH + 300
            );
          })
      );

      animationFrameId = requestAnimationFrame(updateStars);
    };

    animationFrameId = requestAnimationFrame(updateStars);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
    >
      <defs>
        <linearGradient id="aceternity-shooting-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={trailColor} stopOpacity="0" />
          <stop offset="60%" stopColor="#d9b66c" stopOpacity="0.5" />
          <stop offset="85%" stopColor={starColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>
        <filter id="aceternity-star-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {stars.map((star) => {
        const currentLength = starWidth * star.scale;
        const currentHeight = starHeight * star.scale;

        return (
          <g
            key={star.id}
            transform={`translate(${star.x}, ${star.y}) rotate(${star.angle})`}
            filter="url(#aceternity-star-glow)"
          >
            {/* Glowing tail trailing behind the head */}
            <rect
              x={-currentLength}
              y={-currentHeight / 2}
              width={currentLength}
              height={currentHeight}
              rx={currentHeight / 2}
              fill="url(#aceternity-shooting-star-gradient)"
            />
            {/* Glowing leading meteor nucleus */}
            <circle
              cx={0}
              cy={0}
              r={currentHeight * 1.5}
              fill="#ffffff"
            />
          </g>
        );
      })}
    </svg>
  );
}
