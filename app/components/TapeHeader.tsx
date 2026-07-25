import React from "react";
import "../css/tape-header.css";

export type TapeHeaderSize = "medium" | "large" | "extraLarge";

/* left is a counter-clockwise tilt, right is a clockwise tilt, straight is no rotation */
export type TapeHeaderAngle = "left" | "straight" | "right";

export type TapeHeaderEdge = "default" | "subtle";

export type TapeHeaderProps = {
  /* title text */
  children: React.ReactNode;
  /* tape fill color */
  tapeColor: string;
  /* text color */
  textColor: string;
  /* how big the header is */
  size?: TapeHeaderSize;
  /* tape rotation */
  angle?: TapeHeaderAngle;
  /* torn-edge depth: subtle for wide headlines */
  edge?: TapeHeaderEdge;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "div" | "span";
};

const sizeToClass: Record<TapeHeaderSize, string> = {
  medium: "tape-header--medium",
  large: "tape-header--large",
  extraLarge: "tape-header--xl",
};

const angleToClass: Record<TapeHeaderAngle, string> = {
  left: "tape-header--angle-left",
  straight: "tape-header--angle-straight",
  right: "tape-header--angle-right",
};

export function TapeHeader({
  children,
  tapeColor,
  textColor,
  size = "large",
  angle = "left",
  edge = "default",
  className = "",
  as: Tag = "h2",
}: TapeHeaderProps): React.ReactElement {
  const sizeClass = sizeToClass[size];
  const angleClass = angleToClass[angle];
  const edgeClass = edge === "subtle" ? "tape-silhouette--subtle" : "";
  const merged = ["tape-header", "tape-silhouette", edgeClass, sizeClass, angleClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      className={merged}
      style={{ backgroundColor: tapeColor, color: textColor }}
    >
      {children}
    </Tag>
  );
}
