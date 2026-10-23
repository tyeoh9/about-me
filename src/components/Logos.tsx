import type { CSSProperties } from "react";
import type { Logo } from "@/content/profile";

/** Affiliation logos, each a local SVG used as a mask over one warm gray. */
export function Logos({ logos }: { logos: Logo[] }) {
  return (
    <ul className="logos" aria-label="Affiliations">
      {logos.map((logo) => (
        <li key={logo.name}>
          <span
            className="logo"
            role="img"
            aria-label={logo.name}
            style={
              {
                "--logo-src": `url(${logo.src})`,
                height: `${logo.height}px`,
                width: `${Math.round(logo.height * logo.aspect)}px`,
              } as CSSProperties
            }
          />
        </li>
      ))}
    </ul>
  );
}
