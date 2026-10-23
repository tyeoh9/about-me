/** Two answers go to a judge model; the grounded one is sent, the made-up one blocked. */
export function ValidateLlmFigure() {
  return (
    <div
      className="judge"
      role="img"
      aria-label="Two answers go to a judge. &ldquo;Your refund was issued on March 3 to the card ending 4471&rdquo; is sent. &ldquo;Refunds always take 2 hours, guaranteed&rdquo; is blocked."
    >
      <p className="answer answer-1" aria-hidden="true">
        &ldquo;Your refund was issued on March&nbsp;3 to the card ending 4471.&rdquo;
      </p>
      <p className="answer answer-2" aria-hidden="true">
        &ldquo;Refunds always take 2&nbsp;hours, guaranteed.&rdquo;
      </p>
      <span className="wires wires-in" aria-hidden="true">
        <span className="wires-box">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 H50 V100 H0 M50 50 H100" vectorEffect="non-scaling-stroke" />
          </svg>
        </span>
      </span>
      <span className="judge-pill" aria-hidden="true">
        judge
      </span>
      <span className="wires wires-out" aria-hidden="true">
        <span className="wires-box">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 50 C60 50 40 0 100 0 M0 50 C60 50 40 100 100 100" vectorEffect="non-scaling-stroke" />
          </svg>
        </span>
      </span>
      <span className="verdict verdict-sent" aria-hidden="true">
        <svg viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8.5" />
          <path d="M6.5 10.2 L9 12.6 L13.6 7.6" />
        </svg>
        sent
      </span>
      <span className="verdict verdict-blocked" aria-hidden="true">
        <svg viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8.5" />
          <path d="M7 7 L13 13 M13 7 L7 13" />
        </svg>
        blocked
      </span>
    </div>
  );
}
