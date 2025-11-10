"use client";
import { useEffect, useRef, useState } from "react";

const achievements = [
  {
    id: 1,
    number: 120,
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    id: 2,
    number: 80,
    suffix: "+",
    label: "Clients Served",
  },
  {
    id: 3,
    number: 25,
    suffix: "+",
    label: "Skilled Professionals",
  },
  {
    id: 4,
    number: 10,
    suffix: "+",
    label: "Years of Experience",
  },
];

function useCountAnimation(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration, isVisible]);

  return { count, setIsVisible };
}

function CounterCard({ achievement }: { achievement: typeof achievements[0] }) {
  const { count, setIsVisible } = useCountAnimation(achievement.number);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [setIsVisible]);

  return (
    <div ref={ref} className="text-center">
      <div className="mb-2 sm:mb-3">
        <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-[#4F46E5] to-[#EF3A61] bg-clip-text text-transparent">
          {count}{achievement.suffix}
        </span>
      </div>
      <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
        {achievement.label}
      </p>
    </div>
  );
}

export default function Achievements() {
  return (
    <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <p className="text-xs sm:text-sm bg-linear-to-r from-[#4F46E5] to-[#EF3A61] bg-clip-text text-transparent mb-2 tracking-[0.3em] sm:tracking-[0.5em] uppercase">
            Our Achievements
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4 sm:px-0">
            Building Trust Through Proven Success
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-0">
            At synctom, our journey is defined by dedication, innovation, and measurable impact.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {achievements.map((achievement) => (
            <CounterCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </section>
  );
}