import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import PeopleCard from "./components/PeopleCard";
import PastContributor from "./components/PastContributor";
import { client } from "@/sanity/lib/client";

interface Person {
  name: string;
  image: unknown;
  founder: boolean;
  team: string;
  role: string;
  linkedin?: string;
}

export default async function Team() {
  const [founders, mobileDevsRaw, uiux, webDevs, pastContributors] = await Promise.all([
    getFounders(),
    getTeam("Mobile Dev"),
    getTeam("UI/UX"),
    getTeam("Web Dev"),
    getPastContributors(),
  ]);

  const mobileDevs = [...mobileDevsRaw].sort((a, b) => {
    const aIsEngineer = a.role === "Mobile Application Engineer" ? 0 : 1;
    const bIsEngineer = b.role === "Mobile Application Engineer" ? 0 : 1;
    if (aIsEngineer !== bIsEngineer) return aIsEngineer - bIsEngineer;
    return a.name.localeCompare(b.name);
  });

  const roleSortKey = (role: string): number => {
    const r = (role || "").toLowerCase();
    if (r.includes("mobile")) return 1;
    if (r.includes("ui") || r.includes("ux")) return 2;
    if (r.includes("web")) return 3;
    return 4;
  };
  const SEASON_ORDER: Record<string, number> = { WI: 1, SP: 2, SU: 3, AU: 4 };
  const cohortSortKey = (cohort: string): string => {
    const match = (cohort || "").toUpperCase().match(/^(WI|SP|SU|AU)(\d+)$/);
    if (!match) return "9999-0";
    const year = match[2].padStart(4, "20");
    const season = SEASON_ORDER[match[1]] ?? 0;
    return `${year}-${season}`;
  };
  const pastContributorsSorted = [...pastContributors].sort((a, b) => {
    const roleA = roleSortKey(a.role ?? "");
    const roleB = roleSortKey(b.role ?? "");
    if (roleA !== roleB) return roleA - roleB;
    const cohortA = cohortSortKey(a.cohort);
    const cohortB = cohortSortKey(b.cohort);
    if (cohortA !== cohortB) return cohortA.localeCompare(cohortB);
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <Navbar />
      <main className="team-page">
        <h1 className="team-title">
          <span className="title-wrap">
            <span className="title-highlight" />
            <span className="title-text">Palana&apos;s Team</span>
          </span>
        </h1>
        <p className="team-subtitle">
          Meet the team that is making Palana&apos;s mission a reality 
        </p>

        {/* founders section */}
        <div className="team-section">
          <h2 className="section-heading section-heading-founders">Founders</h2>
          <section className="team-grid">
            {founders.map((person) => (
              <div key={person.name} className="team-grid-item">
                <PeopleCard person={person} />
              </div>
            ))}
          </section>
        </div>

        {/* mobile dev section */}
        <div className="team-section">
          <h2 className="section-heading section-heading-mobile">Mobile Application Developers</h2>
          <section className="team-grid">
            {mobileDevs.map((person) => (
              <div key={person.name} className="team-grid-item">
                <PeopleCard
                  person={person}
                  showRole={person.role !== "Mobile Application Engineer"}
                  accentColor="#90BE88"
                />
              </div>
            ))}
          </section>
        </div>

        {/* ui/ux section */}
        <div className="team-section">
          <h2 className="section-heading section-heading-uiux">UI/UX Designers & Researchers</h2>
          <section className="team-grid">
            {uiux.map((person) => (
              <div key={person.name} className="team-grid-item">
                <PeopleCard person={person} accentColor="#7A54BF" />
              </div>
            ))}
          </section>
        </div>

        {/* web dev section */}
        <div className="team-section">
          <h2 className="section-heading section-heading-web">Website Developers</h2>
          <section className="team-grid">
            {webDevs.map((person) => (
              <div key={person.name} className="team-grid-item">
                <PeopleCard person={person} showRole={false} accentColor="#208AAE" />
              </div>
            ))}
          </section>
        </div>

        {/* past contributors section */}
        <div className="team-section">
          <h2 className="section-heading section-heading-past">
            <span className="title-wrap">
              <span className="title-highlight" />
              <span className="title-text">Past Contributors</span>
            </span>
          </h2>
          <section className="past-contributors-grid">
            {pastContributorsSorted.map((contributor) => (
              <div key={contributor.name}>
                <PastContributor contributor={contributor} />
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

async function getFounders(): Promise<Person[]> {
  const query = `*[_type == "people" && founder == true && current == true] | order(name asc) {
    image,
    name,
    founder,
    team,
    role,
    linkedin,
  }`;

  return client.fetch<Person[]>(query);
}

async function getTeam(teamValue: string): Promise<Person[]> {
  const query = `*[_type == "people" && founder != true && team == $teamValue && current == true] | order(name asc) {
    image,
    name,
    founder,
    team,
    role,
    linkedin,
  }`;

  return client.fetch<Person[]>(query, { teamValue });
}

interface PastContributor {
  name: string;
  role?: string;
  cohort: string;
}

async function getPastContributors(): Promise<PastContributor[]> {
  const query = `*[_type == "pastContributors"] | order(cohort asc, name asc) {
    name,
    role,
    cohort,
  }`;

  return client.fetch<PastContributor[]>(query);
}

