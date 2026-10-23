import type { Chapter as ChapterData, FigureKind } from "@/content/profile";
import { RichText } from "./RichText";
import { AppleCacheFigure } from "./figures/AppleCacheFigure";
import { ZoofiOnboardingFigure } from "./figures/ZoofiOnboardingFigure";
import { ClearoThreadFigure } from "./figures/ClearoThreadFigure";
import { ValidateLlmFigure } from "./figures/ValidateLlmFigure";

const figures: Record<FigureKind, () => React.ReactNode> = {
  "apple-cache": AppleCacheFigure,
  "zoofi-onboarding": ZoofiOnboardingFigure,
  "clearo-thread": ClearoThreadFigure,
  "validate-llm": ValidateLlmFigure,
};

export function Chapter({ chapter }: { chapter: ChapterData }) {
  const Figure = figures[chapter.figure];
  const titleId = `${chapter.id}-title`;
  return (
    <section className="chapter" id={chapter.id} aria-labelledby={titleId}>
      <div className="chapter-text">
        <h2 id={titleId}>{chapter.title}</h2>
        {chapter.body.map((paragraph, i) => (
          <p key={i}>
            <RichText spans={paragraph} />
          </p>
        ))}
        <p className="meta">{chapter.meta}</p>
      </div>
      <figure className="plate" data-figure={chapter.figure}>
        <div className="plate-body">
          <Figure />
        </div>
        <figcaption>{chapter.caption}</figcaption>
      </figure>
    </section>
  );
}
