"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CountUp } from "./CountUp";

export const Growth = (): React.ReactElement => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 60%", "start 20%"],
  });
  const rectOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const rectY = useTransform(scrollYProgress, [0, 1], [-200, 0]);


  return (
    <section ref={sectionRef} id="impact" className="growth-section">

      <div className="growth-text">
        <h2 className="growth-heading">
          How Far We&apos;ve Come
        </h2>
        <p className="growth-subheading">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget tortor rutrum, tristique nunc in, luctus leo.
        </p>
      </div>

      <svg className="growth-svg" viewBox="0 0 4000 2500" fill="none" preserveAspectRatio="none">
        <motion.path
          d="M3600 0 C4000 2500 0 400 141.5 2500"
          stroke="#1C2C50"
          strokeWidth="230"
          fill="none"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>

      <motion.div className="growth-rect" 
        style={{ 
          opacity: rectOpacity,
          y: rectY,
          top: "55%",
          right: "38%",
        }}>
        <CountUp target={90} motionValue={rectOpacity} unit="%"/>
        <p style={{marginTop: 30, marginBottom: -20, fontSize: 25, color: '#1C2C50' }}>
          Users report feeling safer
        </p>
      </motion.div>

      <motion.div className="growth-rect" 
        style={{ 
          opacity: rectOpacity,
          y: rectY,
          top: "34%",
          left: "22%",
        }}>
        <CountUp target={20} motionValue={rectOpacity} unit="+"/>
        <p style={{marginTop: 30, marginBottom: -20, fontSize: 25, color: '#1C2C50' }}>
          Partnering campuses
        </p>
      </motion.div>

      <motion.div className="growth-rect" 
        style={{ 
          opacity: rectOpacity,
          y: rectY,
          top: "28%",
          right: "30%",
        }}>
        <CountUp target={50000} motionValue={rectOpacity} unit="+"/>
        <p style={{marginTop: 30, marginBottom: -20, fontSize: 25, color: '#1C2C50' }}>
          Downloads on the app store
        </p>
      </motion.div>

      <div className="growth-path-text">
        Launched 2025
      </div>
      <div className="growth-path-text" style={{ left: '10%', top: '75%' }}>
        Today
      </div>

    </section>
  );
};
