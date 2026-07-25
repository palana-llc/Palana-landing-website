import React from "react";
import { ArrowRight } from "lucide-react";

export const DriverMission = (): React.ReactElement => {
  return (
    <section className="mission-driver-banner">
      <div className="mission-driver-content">
        <h2 className="mission-driver-title">Convenience for Dispatchers</h2>
        <p className="mission-driver-text">
          When a student schedules a ride, every second counts. 
          Palana gives dispatchers a simple form to enter a student's details and instantly connect them to a driver, 
          automatically keeping the student informed so dispatchers don't have to.
          Palana promises less back-and-forth, less time wasted, and an easier experience for everyone involved.
        </p>

        <a href="/getstarted" className="mission-driver-button">
          Check out Palana&apos;s Dispatcher Website
          <ArrowRight className="mission-school-button-arrow" aria-hidden />
        </a>
      </div>
      <div className="mission-driver-visual" aria-hidden="true">
        <img
          src="/mission-page/DispatchWebsite.png"
          alt=""
          className="mission-driver-image"
        />
      </div>
    </section>
  );
};

export default DriverMission;
