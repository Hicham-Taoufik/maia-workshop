'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2025-12-20T09:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white border-2 border-primary-200 rounded-lg p-4 min-w-[80px] shadow-soft">
        <div className="text-3xl font-bold text-primary-700 font-display">
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <div className="text-sm font-medium text-neutral-600 mt-2 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-4">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-2xl text-neutral-400 font-bold">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-2xl text-neutral-400 font-bold">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span className="text-2xl text-neutral-400 font-bold">:</span>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}

