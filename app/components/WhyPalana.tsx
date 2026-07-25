import React from "react";
import "../css/why-palana.css";
import TextBubble from "./TextBubble";
import { TapeHeader } from "./TapeHeader";

const texts = [
  "\"An Uber-like app for service drivers to keep track of ride requests and trip information.\""
]
export const WhyPalana = (): React.ReactElement => (
  <section id="features" className="why-palana-section">
    <div className="why-palana-container">
      <div className="why-palana-content">
        <div className="why-palana-title-wrapper">
          <div className="why-palana-bubble why-palana-bubble-bottom">
            <TextBubble text={texts[0]}/>
          </div>
          <img
            src="/bubble1.svg"
            alt=""
            className="why-palana-bubble why-palana-bubble-left"
          />
          <img
            src="/bubble2.svg"
            alt=""
            className="why-palana-bubble why-palana-bubble-right"
          />
          <h2 className="why-palana-title">What are people saying?</h2>
          <span className="why-palana-title-highlight" />
        </div>
      </div>
    </div>
    <img
      src="/megaphone.png"
      alt=""
      className="megaphone"
    />
  </section>
);
