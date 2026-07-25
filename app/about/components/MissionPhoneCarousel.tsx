"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type MissionPhoneSlide = {
  src: string;
  alt: string;
  size?: "default" | "small";
};

type MissionPhoneCarouselProps = {
  slides: MissionPhoneSlide[];
  ariaLabel: string;
  className?: string;
};

const MOBILE_CAROUSEL_QUERY = "(max-width: 1023px)";

export function MissionPhoneCarousel({
  slides,
  ariaLabel,
  className = "",
}: MissionPhoneCarouselProps): React.ReactElement | null {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCarouselMode, setIsCarouselMode] = useState(false);
  const slideCount = slides.length;

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_CAROUSEL_QUERY);
    const syncMode = (): void => setIsCarouselMode(mediaQuery.matches);
    syncMode();
    mediaQuery.addEventListener("change", syncMode);
    return () => mediaQuery.removeEventListener("change", syncMode);
  }, []);

  const goToSlide = useCallback(
    (nextIndex: number): void => {
      if (slideCount === 0) return;
      setActiveIndex(((nextIndex % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  if (slideCount === 0) return null;

  const trackStyle =
    isCarouselMode && slideCount > 1
      ? { transform: `translateX(-${activeIndex * 100}%)` }
      : undefined;

  const showCarouselControls = isCarouselMode && slideCount > 1;

  return (
    <div
      className={`mission-phone-carousel ${className}`.trim()}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        className={`mission-phone-carousel__stage${
          showCarouselControls ? " mission-phone-carousel__stage--with-arrows" : ""
        }`}
      >
        {showCarouselControls && (
          <button
            type="button"
            className="mission-phone-carousel__btn mission-phone-carousel__btn--prev"
            onClick={() => goToSlide(activeIndex - 1)}
            aria-label="Previous screenshot"
          >
            <ChevronLeft aria-hidden />
          </button>
        )}

        <div className="mission-phone-carousel__viewport">
          <ul className="mission-phone-carousel__track" style={trackStyle}>
            {slides.map((slide) => (
              <li key={slide.src} className="mission-phone-carousel__slide">
                <div className="mission-phone-carousel__slide-inner">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className={`mission-student-phone${
                      slide.size === "small" ? " mission-student-phone-small" : ""
                    }`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {showCarouselControls && (
          <button
            type="button"
            className="mission-phone-carousel__btn mission-phone-carousel__btn--next"
            onClick={() => goToSlide(activeIndex + 1)}
            aria-label="Next screenshot"
          >
            <ChevronRight aria-hidden />
          </button>
        )}
      </div>

      {showCarouselControls && (
        <div className="mission-phone-carousel__dots" role="tablist" aria-label="Choose screenshot">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              className={`mission-phone-carousel__dot${
                index === activeIndex ? " mission-phone-carousel__dot--active" : ""
              }`}
              aria-selected={index === activeIndex}
              aria-label={`Screenshot ${index + 1} of ${slideCount}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MissionPhoneCarousel;
