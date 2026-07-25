const ROLE_COLORS: Record<string, string> = {
  founder: "#355691",
  "mobile": "#90BE88",
  "ui/ux": "#7A54BF",
  "web": "#208AAE",
  "project manager": "#FFC859",
};

function colorForRole(role: string): string {
  if (!role) return "#6b7280";
  const r = role.toLowerCase();
  if (r.includes("founder")) return ROLE_COLORS.founder;
  if (r.includes("mobile")) return ROLE_COLORS.mobile;
  if (r.includes("ui") || r.includes("ux")) return ROLE_COLORS["ui/ux"];
  if (r.includes("web")) return ROLE_COLORS.web;
  if (r.includes("project manager")) return ROLE_COLORS["project manager"];
  return "#6b7280";
}

interface PastContributorProps {
  contributor: { name: string; role?: string };
}

export default function PastContributor({ contributor }: PastContributorProps) {
  const accentColor = colorForRole(contributor.role ?? "");

  return (
    <div className="past-contributor">
      <p className="contributor-name" style={{ color: accentColor }}>
        {contributor.name}
      </p>
      {contributor.role && (
        <p className="contributor-role">
          {contributor.role}
        </p>
      )}
    </div>
  );
}