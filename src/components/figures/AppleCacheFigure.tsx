/** Maps Search ⇄ Redis cache ┄ Ad service, with the numbers the cache produced. */
export function AppleCacheFigure() {
  return (
    <div
      className="cache"
      role="img"
      aria-label="Maps Search sends requests to a Redis cache, which answers 95% of them. Only 5% go through to the ad service: 36 million fewer calls a day and 37.5% faster ad delivery."
    >
      <div className="cache-flow" aria-hidden="true">
        <span className="node">Maps Search</span>
        <span className="cache-link">
          <span className="label">95% answered here</span>
          <svg className="arrows" viewBox="0 0 48 20" preserveAspectRatio="none">
            <path d="M0 6 H46 M41 2 L46 6 L41 10" vectorEffect="non-scaling-stroke" />
            <path d="M48 15 H2 M7 11 L2 15 L7 19" vectorEffect="non-scaling-stroke" />
          </svg>
          <svg className="arrows-v" viewBox="0 0 20 40">
            <path d="M6 0 V38 M2 33 L6 38 L10 33" />
            <path d="M15 40 V2 M11 7 L15 2 L19 7" />
          </svg>
        </span>
        <span className="node node-strong">Redis cache</span>
        <span className="cache-link">
          <span className="label">5% go through</span>
          <span className="dashed" />
        </span>
        <span className="node">Ad service</span>
      </div>
      <p className="cache-stats" aria-hidden="true">
        36 million fewer calls a day
        <br />
        37.5% faster ad delivery
      </p>
    </div>
  );
}
