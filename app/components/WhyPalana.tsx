import React from "react";
import "../css/why-palana.css";
import TextBubble from "./TextBubble";
import { TapeHeader } from "./TapeHeader";

const texts = [
  "\"An Uber-like app for service drivers to keep track of ride requests and trip information.\"",
  "\"I told my friend, I feel like there needs to be a better way to know when drivers are coming.\"",
  "\"I stopped using the Husky SafeTrip service because it felt more inconvenient to wait outside for however long than walk 20 minutes\"",
];
export const WhyPalana = (): React.ReactElement => (
  <section id="features" className="why-palana-section">
    <div className="why-palana-container">
      <div className="why-palana-content">
        <div className="why-palana-title-wrapper">
          <div className="why-palana-bubble why-palana-bubble-bottom">
            <TextBubble text={texts[0]}/>
          </div>
          <div className="why-palana-bubble why-palana-bubble-left">
            <TextBubble text={texts[1]} />
          </div>
          <div className="why-palana-bubble why-palana-bubble-right">
            <TextBubble text={texts[2]} />
          </div>
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
