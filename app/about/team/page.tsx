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
  const [founders, mobileDevsRaw, uiux, webDevs, marketing, pastContributors] = await Promise.all([
    getFounders(),
    getTeam("Mobile Dev"),
    getTeam("UI/UX"),
    getTeam("Web Dev"),
    getTeam("Marketing"),
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
    if (r.includes("marketing")) return 4;
    return 5;
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

  const showRolesForTeam = (people: Person[]) =>
    new Set(people.map((person) => person.role?.trim()).filter(Boolean)).size > 1;

  const showFounderRoles = showRolesForTeam(founders);
  const showMobileRoles = showRolesForTeam(mobileDevs);
  const showUiuxRoles = showRolesForTeam(uiux);
  const showWebRoles = showRolesForTeam(webDevs);
  const showMarketingRoles = showRolesForTeam(marketing);

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

        {founders.length > 0 && (
          <div className="team-section">
            <h2 className="section-heading section-heading-founders">Founders</h2>
            <section className="team-grid">
              {founders.map((person) => (
                <div key={person.name} className="team-grid-item">
                  <PeopleCard person={person} showRole={showFounderRoles} />
                </div>
              ))}
            </section>
          </div>
        )}

        {mobileDevs.length > 0 && (
          <div className="team-section">
            <h2 className="section-heading section-heading-mobile">Mobile Application Developers</h2>
            <section className="team-grid">
              {mobileDevs.map((person) => (
                <div key={person.name} className="team-grid-item">
                  <PeopleCard
                    person={person}
                    showRole={showMobileRoles}
                    accentColor="#90BE88"
                  />
                </div>
              ))}
            </section>
          </div>
        )}

        {uiux.length > 0 && (
          <div className="team-section">
            <h2 className="section-heading section-heading-uiux">UI/UX Designers & Researchers</h2>
            <section className="team-grid">
              {uiux.map((person) => (
                <div key={person.name} className="team-grid-item">
                  <PeopleCard person={person} showRole={showUiuxRoles} accentColor="#7A54BF" />
                </div>
              ))}
            </section>
          </div>
        )}

        {webDevs.length > 0 && (
          <div className="team-section">
            <h2 className="section-heading section-heading-web">Website Developers</h2>
            <section className="team-grid">
              {webDevs.map((person) => (
                <div key={person.name} className="team-grid-item">
                  <PeopleCard person={person} showRole={showWebRoles} accentColor="#208AAE" />
                </div>
              ))}
            </section>
          </div>
        )}

        {marketing.length > 0 && (
          <div className="team-section">
            <h2 className="section-heading section-heading-marketing">Marketing</h2>
            <section className="team-grid">
              {marketing.map((person) => (
                <div key={person.name} className="team-grid-item">
                  <PeopleCard person={person} showRole={showMarketingRoles} accentColor="#F49E4C" />
                </div>
              ))}
            </section>
          </div>
        )}

        {pastContributorsSorted.length > 0 && (
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
        )}
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

interface FormerPerson {
  name: string;
  role: string;
  team: string;
}

function normalizeContributorName(name: string): string {
  return name.trim().toLowerCase();
}

async function getPastContributors(): Promise<PastContributor[]> {
  const [manualContributors, formerMembers] = await Promise.all([
    client.fetch<PastContributor[]>(`*[_type == "pastContributors"] | order(cohort asc, name asc) {
      name,
      role,
      cohort,
    }`),
    client.fetch<FormerPerson[]>(`*[_type == "people" && current == false] | order(name asc) {
      name,
      role,
      team,
    }`),
  ]);

  const contributorsByName = new Map<string, PastContributor>();

  for (const contributor of manualContributors) {
    contributorsByName.set(normalizeContributorName(contributor.name), contributor);
  }

  for (const person of formerMembers) {
    const key = normalizeContributorName(person.name);
    if (contributorsByName.has(key)) continue;

    contributorsByName.set(key, {
      name: person.name,
      role: person.role || person.team,
      cohort: "",
    });
  }

  return Array.from(contributorsByName.values());
}

