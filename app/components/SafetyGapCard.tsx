"use client";

import React, { useCallback, useState } from "react";

export type SafetyGapItem = {
  title: string;
  description: string;
  backTitle: string;
  backDescription: string;
};

type SafetyGapCardProps = {
  item: SafetyGapItem;
  index: number;
};

export const SafetyGapCard = ({
  item,
  index,
}: SafetyGapCardProps): React.ReactElement => {
  const [flipped, setFlipped] = useState(false);

  const toggle = useCallback(() => {
    setFlipped((f) => !f);
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  return (
    <li className="safety-gap-card-li">
      <div
        className="safety-gap-flip-scene"
        onClick={toggle}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${item.title}. ${flipped ? "Showing details. Activate to show summary." : "Activate to flip and read more."}`}
      >
        <div
          className={
            flipped
              ? "safety-gap-flip-inner is-flipped"
              : "safety-gap-flip-inner"
          }
        >
          <div className="safety-gap-flip-face safety-gap-flip-face--front">
            <span
              className="tape-silhouette tape-silhouette--tag safety-gap-card-index"
              aria-hidden
            >
              {index + 1}
            </span>
            <h3 className="safety-gap-card-title">{item.title}</h3>
            <p className="safety-gap-card-body">{item.description}</p>
            <span className="safety-gap-flip-hint">Click to flip</span>
          </div>
          <div className="safety-gap-flip-face safety-gap-flip-face--back">
            <span
              className="tape-silhouette tape-silhouette--tag safety-gap-flip-back-label"
            >
              Palana&apos;s solution
            </span>
            <h3 className="safety-gap-card-title safety-gap-card-title--back">
              {item.backTitle}
            </h3>
            <p className="safety-gap-card-body">{item.backDescription}</p>
            <span className="safety-gap-flip-hint">Click to flip back</span>
          </div>
        </div>
      </div>
    </li>
  );
};
