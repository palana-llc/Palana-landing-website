import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { TapeHeader } from "@/app/components/TapeHeader";
import { StudentMission } from "./components/StudentMission";
import { SchoolMission } from "./components/SchoolMission";
import { DriverMission } from "./components/DriverMission";
import { Story } from "./components/Story";
import { client } from "@/sanity/lib/client";

import "../css/mission.css";

export default async function About() {
  const timelineQuery = `*[_type == "timeline"] | order(year asc) {
    _id,
    year,
    quote,
    description,
    link,
    "imageUrl": image.asset->url
  }`;

  return (
    <>
      <Navbar />
      <main>
        <section className="mission-hero">
          <div className="mission-hero-inner">
            <div className="mission-title-wrapper">
              <TapeHeader
                as="h1"
                tapeColor="#f49e4c"
                textColor="#ffffff"
                size="large"
                angle="straight"
                edge="subtle"
                className="mission-hero-title-tape"
              >
                Palana&apos;s Mission
              </TapeHeader>
            </div>
            <section className="mission-body">
              {/* <p className="mission-body-text">
                Universities often rely on outdated systems to run their safety initiatives for students, with many universities lacking the resources to maintain them efficiently.
                Students and university staff should not have to worry about their safety while on campus or while leaving campus.
              </p> */}
              <p className="mission-body-text">
                Palana&apos;s mission is to enhance out-of-date campus safety transportation systems with modern technology. 
                Palana aims to put students and parents at ease and increasing the quality of safety in universities across the nation 
                by working closely with each institution to ensure that the saftey software they receive accurately reflects their community&apos;s needs.
              </p>
            </section>
          </div>
        </section>
        <Story />
        <StudentMission />
        <SchoolMission />
        <DriverMission />
      </main>
      <Footer />
    </>
  );
}
