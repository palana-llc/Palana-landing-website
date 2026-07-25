import React from "react";
import { ArrowRight } from "lucide-react";
import {
  MissionPhoneCarousel,
  type MissionPhoneSlide,
} from "./MissionPhoneCarousel";

const DRIVER_PHONE_SLIDES: MissionPhoneSlide[] = [
  {
    src: "/mission-page/Driver Sees Ride Request.png",
    alt: "Driver view of an incoming ride request in the Palana app",
  },
  {
    src: "/mission-page/Driver Waiting to Pickup Student.png",
    alt: "Driver waiting at pickup location in the Palana app",
    size: "small",
  },
];

export const SchoolMission = (): React.ReactElement => {
  return (
    <section className="mission-school-banner">
      <div className="mission-school-visual">
        <MissionPhoneCarousel
          slides={DRIVER_PHONE_SLIDES}
          ariaLabel="Driver app screenshots"
        />
        <p className="mission-school-image-caption">Driver Perspective in the Palana App</p>
      </div>

      <div className="mission-school-content">
        <h2 className="mission-school-title">Simplicity for Schools</h2>
        <p className="mission-school-text">
          Campus safety services work hard to protect students every night.
          Palana gives their drivers the tools to do that job better with a clear, intuitive app that
          handles ride requests, routing, and student communication, so drivers can focus on what
          matters most:
          <br />
          <b>getting students home safe</b>.
        </p>
        <div className="mission-school-buttons">
          <a href="/contact#setup" className="mission-school-button mission-school-button--lead">
            See how to set up Palana for your university
            <ArrowRight className="mission-school-button-arrow" aria-hidden />
          </a>
          <a href="/getstarted" className="mission-school-button">
            Check out Palana&apos;s Driver Features
            <ArrowRight className="mission-school-button-arrow" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SchoolMission;
