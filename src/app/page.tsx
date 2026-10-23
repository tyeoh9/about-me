import { alongTheWay, chapters, logos, profile, sayHello } from "@/content/profile";
import { Chapter } from "@/components/Chapter";
import { Logos } from "@/components/Logos";
import { RichText } from "@/components/RichText";

export default function Home() {
  return (
    <main className="page">
      <header className="intro">
        <h1 className="name">{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="statement">{profile.statement}</p>
        <Logos logos={logos} />
      </header>

      {chapters.map((chapter) => (
        <Chapter key={chapter.id} chapter={chapter} />
      ))}

      <section className="split" aria-labelledby="along-the-way">
        <h2 id="along-the-way">Along the way</h2>
        <dl className="along">
          {alongTheWay.map((row) => (
            <div key={row.name}>
              <dt>{row.name}</dt>
              <dd>
                <RichText spans={row.body} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="split hello" aria-labelledby="say-hello">
        <h2 id="say-hello">{sayHello.title}</h2>
        <div>
          <p className="pitch">{sayHello.pitch}</p>
          <p className="contacts">
            <RichText spans={sayHello.contacts} />
          </p>
        </div>
      </footer>
    </main>
  );
}
