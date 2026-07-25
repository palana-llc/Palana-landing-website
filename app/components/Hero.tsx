"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Search, ChevronDown } from "lucide-react";
import PhoneScreen from "../getstarted/components/PhoneScreen";
import { TapeHeader } from "./TapeHeader";

// stars for the app store and google play ratings
  const renderStar = (_: unknown, i: number): React.ReactElement => (
    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  );

export const Hero = (): React.ReactElement => {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // const filtered = UNIVERSITIES.filter((u: string): boolean =>
  //   u.toLowerCase().includes(query.toLowerCase())
  // );

  // const subscribeClickOutside = (): (() => void) => {
  //   const handler = (e: MouseEvent): void => {
  //     if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   if (isOpen) {
  //     document.addEventListener("mousedown", handler);
  //     return (): void => document.removeEventListener("mousedown", handler);
  //   }
  //   return (): void => undefined;
  // };
  // useEffect(subscribeClickOutside, [isOpen]);

  // const makeSelectUniversity = (u: string) => (e: React.MouseEvent<HTMLButtonElement>): void =>
  //   (e.preventDefault(), setQuery(u), setIsOpen(false), undefined) as void;

  // const renderUniversityOption = (u: string): React.ReactElement => (
  //   <li key={u} role="option">
  //     <button
  //       type="button"
  //       onMouseDown={makeSelectUniversity(u)}
  //       className="w-full text-left px-4 py-3 text-base text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
  //     >
  //       {u}
  //     </button>
  //   </li>
  // );

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
  //   (setQuery(e.target.value), setIsOpen(true), undefined) as void;

  return (
    <section className="hero">
      <div className="nav-container">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-pill">
              Trusted by 500+ users
            </div>

            <h1 className="hero-title">
              Safer for{" "}
              <TapeHeader
                as="span"
                tapeColor="#9CF28E"
                textColor="#000000"
                size="extraLarge"
                className="hero-title-tape"
              >
                students
              </TapeHeader>
              <br />
              Simpler for{" "}
              <TapeHeader
                as="span"
                tapeColor="#65CBEB"
                textColor="#000000"
                size="extraLarge"
                angle="right"
                className="hero-title-tape"
              >
                schools
              </TapeHeader>
            </h1>

            {/* <p className="hero-subtitle">
              Where campus{" "}
              <span className="hero-subtitle-blue">security</span> drives{" "}
              <span className="hero-subtitle-green">students</span>{" "}
              home safely
            </p> */}
            <p className="hero-subtitle">
              Palana brings a seamless, user-friendly interface to current university safety systems through mobile apps and websites, giving their students and drivers real-time visibility and clear communication for nighttime travel.
              At the same time, Palana equips campus safety teams with tools to streamline ride tracking, manage inquiries and emergencies, and reduce operational workload.
            </p>
          </div>

          {/* phone image with police hat */}
          <div className="hero-right">
            <div className="hero-phone" aria-hidden>
              <PhoneScreen src={null} />
              <div className="hero-rating-badge" aria-label="App Store rating 4.9 out of 5">
                <div className="hero-rating-row">
                  <span className="hero-rating-score">5.0</span>
                  <div className="hero-rating-stars" aria-hidden>
                    {Array.from({ length: 5 }, renderStar)}
                  </div>
                </div>
                <div className="hero-rating-label">App Store</div>
              </div>
              <img
                src="/police-hat.svg"
                alt=""
                className="hero-hat"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
