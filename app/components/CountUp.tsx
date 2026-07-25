"use client";

import React, { useState } from "react";
import { MotionValue, useMotionValueEvent, animate } from "framer-motion";

interface CountUpProps {
  target: number;
  motionValue: MotionValue<number>;
  unit?: string;
}

export const CountUp = ({ target, motionValue, unit }: CountUpProps): React.ReactElement => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useMotionValueEvent(motionValue, "change", (latest) => {
    if (latest > 0 && !started) {
      setStarted(true);
      animate(0, target, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => setCount(Math.round(v)),
      });
    } else if (latest === 0 && started) {
      setStarted(false);
      setCount(0);
    }
  });

  return <p>{`${count.toLocaleString()}${unit ? unit : ""}`}</p>;
};
