import React from "react";
import { ArrowRight } from "lucide-react";
import {
  MissionPhoneCarousel,
  type MissionPhoneSlide,
} from "./MissionPhoneCarousel";

const STUDENT_PHONE_SLIDES: MissionPhoneSlide[] = [
  {
    src: "/mission-page/Student Selecting Locations.png",
    alt: "Student selecting pickup and drop-off locations in the Palana app",
    size: "small",
  },
  {
    src: "/mission-page/Student Confirmation Ride Page.png",
    alt: "Student ride confirmation screen in the Palana app",
  },
];

export const StudentMission = (): React.ReactElement => {
  return (
    <section className="mission-student-banner">
      <div className="mission-student-copy">
        <h2 className="mission-student-title">Safety for Students</h2>
        <p className="mission-student-text">
          Palana aims to provide students with a user-friendly and reliable way to get home safely.
          Features like real-time ride tracking, secure driver communication, and live pickup guidance
          eliminate the uncertainty that leaves students waiting alone in the dark.
        </p>
        <a href="/getstarted" className="mission-student-button mission-student-cta">
          Check out Palana&apos;s Student Features
          <ArrowRight className="mission-school-button-arrow" aria-hidden />
        </a>
      </div>

      <div className="mission-student-visual">
        <MissionPhoneCarousel
          slides={STUDENT_PHONE_SLIDES}
          ariaLabel="Student app screenshots"
        />
      </div>
    </section>
  );
};

export default StudentMission;
