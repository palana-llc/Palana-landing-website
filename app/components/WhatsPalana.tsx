"use client";

import '../css/WhatsPalana.css';
// import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import dynamic from 'next/dynamic';

const Xarrow = dynamic(() => import('react-xarrows'), { ssr: false });

export default function WhatsPalana() {
    const campusRef = useRef(null);
    const homeRef = useRef(null);
    const startRef = useRef(null);
    const startAnchorRef = useRef(null);

    const [windowWidth, setWindowWidth] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

  const widthForStroke = windowWidth || 1200;
  const dynamicStroke = Math.min(Math.max(0, widthForStroke * 0.02), 17);
  const showArrows = windowWidth === 0 || windowWidth > 767;

  return (
        <div className="wp-container">
            <div className="polaroid-box" ref={startRef} style={{left: "-5%", height: 300, width: 20, top: "30%"}}>
            </div>

            <div className="polaroid-box" style={{left: "7%"}}>
                <div className="polaroid-box-inner">
                    <img
                    src="/CampusPolaroid.png"
                    alt="Campus Polaroid"
                    className="wp-polaroid"
                    style={{left: "10%"}}
                    ref={campusRef}
                    >
                    </img>
                    <div className="anchor" ref={campusRef} style={{top: "18.5%"}}>
                    </div>

                    <div className="anchor" ref={startAnchorRef} style={{top: "17.7%", outline: "2px solid red", width: "20%", left: "31%"}}>
                    </div>
                </div>
            </div>

            <div className="polaroid-box" style={{right: "7%"}}>
                <div className="polaroid-box-inner">
                    <img
                    src="/HomePolaroid.png"
                    alt="Home Polaroid"
                    className="wp-polaroid"
                    >
                    </img>
                    <div className="anchor" ref={homeRef} style={{bottom: "10%"}}>
                    </div>
                </div>
            </div>

            <div className="wp-text">
                <div className="wp-header">
                    Don’t feel safe going home?
                </div>
                <div className="wp-content">
                    Palana lets campus security drive students home safely
                </div>
            </div>


            {showArrows ? (
              <>
                <Xarrow
                  start={startRef}
                  end={startAnchorRef}
                  startAnchor="left"
                  endAnchor="bottom"
                  path="smooth"
                  curveness={0.7}
                  strokeWidth={dynamicStroke}
                  color="#355691"
                  headSize={0}
                />

                <Xarrow
                  start={campusRef}
                  end={homeRef}
                  startAnchor="bottom"
                  endAnchor="left"
                  path="smooth"
                  curveness={0.7}
                  strokeWidth={dynamicStroke}
                  color="#355691"
                  headSize={4}
                />
              </>
            ) : null}
        </div>
    );
}