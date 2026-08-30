import React from "react";
import { ArrowRight } from "lucide-react";
import "../css/dispatch.css";

export const Dispatch = (): React.ReactElement => {
  return (
    <section className="dispatch-banner">
      <div className="dispatch-visual" aria-hidden="true">
        <img 
          src="/chooselocation.svg"
          alt=""
          className="dispatch-image-secondary"/>
        <img
          src="/mission-page/DispatchWebsite.png"
          alt=""
          className="dispatch-image"
        />
      </div>
      <div className="hero-left">
        <h2 className="dispatch-title">Dispatch Website</h2>
        <p className="dispatch-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget tortor rutrum, tristique nunc in, luctus leo. 
        </p>
      </div>
    </section>
  );
};

export default Dispatch;
