import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Person {
  name: string;
  role: string;
  image: unknown;
  linkedin?: string;
}

interface PeopleCardProps {
  person: Person;
  showRole?: boolean;
  accentColor?: string;
}

export default function PeopleCard({ person, showRole = true, accentColor = "#355691" }: PeopleCardProps) {
  const tapeBg = `${accentColor}66`;
  const imageUrl = person.image ? urlFor(person.image).auto("format").url() : null;

  return (
    <div className="polaroid-card">
      {/* tape strip */}
      <div
        className="polaroid-tape tape-silhouette"
        style={{ backgroundColor: tapeBg }}
      />

      <div className="polaroid-photo">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={person.name}
            width={240}
            height={240}
            className="polaroid-photo-img"
          />
        ) : (
          <span className="polaroid-initial" aria-hidden="true">
            {person.name.charAt(0).toUpperCase() || "?"}
          </span>
        )}
        {person.linkedin && (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noreferrer"
            className="polaroid-linkedin"
            aria-label={`Open ${person.name}'s LinkedIn profile`}
          >
            in
          </a>
        )}
      </div>
      <div className="polaroid-info">
        <p className="polaroid-name" style={{ color: accentColor }}>
          {person.name || ""}
        </p>
        {showRole && (
          <p className="polaroid-role">
            {person.role}
          </p>
        )}
      </div>
    </div>
  );
}
