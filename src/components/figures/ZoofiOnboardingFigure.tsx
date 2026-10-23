const fields = [
  ["client", "Acme Holdings"],
  ["account", "•••• 4471"],
  ["entity", "LLC"],
  ["status", "ready to review"],
] as const;

/** An onboarding document, parsed into structured fields. */
export function ZoofiOnboardingFigure() {
  return (
    <div className="onboarding">
      <div className="doc" role="img" aria-label="An onboarding document with two highlighted passages">
        <span className="doc-title" />
        <span className="doc-line" />
        <span className="doc-line short" />
        <span className="doc-line" />
        <span className="doc-hit" />
        <span className="doc-line" />
        <span className="doc-line short" />
        <span className="doc-hit" />
      </div>
      <div className="parse" aria-hidden="true">
        <span className="label">parse</span>
        <svg viewBox="0 0 64 12" preserveAspectRatio="none">
          <path d="M0 6 H62 M56 1 L62 6 L56 11" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <dl className="fields" aria-label="Parsed fields">
        {fields.map(([name, value]) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
