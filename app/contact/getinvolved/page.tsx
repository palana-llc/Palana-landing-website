import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

import "../../css/mission.css";
import "../../css/getinvolved.css";

export default function GetInvolvedPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="mission-hero">
          <div className="mission-hero-inner">
            <div className="mission-title-wrapper">
              <h1 className="mission-title">Get Involved</h1>
              <span className="mission-title-highlight" />
            </div>
            <section className="mission-body">
              <p className="mission-body-text">
                Palana grows through students, universities, and partners who
                care about campus safety. If you want to bring Palana to your
                school, explore a collaboration, or help spread the word, we
                would love to connect.
              </p>
              <p className="mission-body-text">
                Reach out through our{" "}
                <Link href="/contact" className="getinvolved-inline-link">
                  contact page
                </Link>{" "}
                and tell us how you&apos;d like to get involved.
              </p>
            </section>
          </div>
        </section>
        <section className="getinvolved-positions" id="positions">
          <div className="mission-body">
            <h2 className="getinvolved-section-title">Open positions</h2>
            <p className="mission-body-text">
              We post roles here when they open. Check back soon, or use the{" "}
              <Link href="/contact" className="getinvolved-inline-link">
                contact page
              </Link>{" "}
              if you want to express interest in working with Palana.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
