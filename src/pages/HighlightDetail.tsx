import { Link, useParams } from "react-router-dom";
import { highlights } from "../data/highlights";

export default function HighlightDetail() {
  const { id } = useParams();

  const highlight = highlights.find((h) => h.id === id);

  if (!highlight) {
    return <div>Highlight tidak ditemukan</div>;
  }

  return (
    <div className="flex flex-col gap-10 items-center py-10 max-w-7xl mx-auto">
      <Link to="/" className="flex gap-2 items-center self-start">
        <img src="/icon/back.svg" alt="icon back" width={30} />
        Kembali
      </Link>

      <div className="flex flex-col gap-2 items-center">
        <p className="font-semibold text-5xl">{highlight.title}</p>
        <p className="text-sm">
          {highlight.location}, {highlight.date}
        </p>
      </div>

      <div className="content flex flex-col gap-10">
        <img
          src={`/banner/${highlight.id}.jpg`}
          alt={`banner ${highlight.title}`}
          className="rounded-2xl"
        />

        <div className="flex gap-10 items-center">
          <p className="text-3xl font-semibold">{highlight.subtitle}</p>
          <p className="text-sm max-w-2/3 leading-7">{highlight.narasi}</p>
        </div>

        {highlight.sections?.map((section, index) => {
          switch (section.type) {
            case "paragraph":
              return (
                <p key={index} className="text-md leading-10">
                  {section.text}
                </p>
              );

            case "stats":
              return (
                <div key={index} className="flex flex-col gap-5">
                  <div className={section.className ?? "flex gap-6"}>
                    {section.image ? (
                      <img
                        src={section.image}
                        alt={`data ${highlight.title}`}
                        className="rounded-2xl"
                      />
                    ) : null}

                    <p className="leading-10">{section?.text1}</p>

                    <ul
                      className={section.listClassName ?? "flex flex-col gap-4"}
                    >
                      {section.items?.map((item, i) => (
                        <li key={i}>
                          <p className="font-bold text-4xl">{item.value}</p>
                          <p className="text-sm">{item.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {section.text ? (
                    <p className="text-md leading-10">{section.text}</p>
                  ) : null}
                </div>
              );

            case "quote":
              return (
                <div key={index}>
                  <blockquote className="border-l-4 border-slate-400 pl-4 italic text-slate-600">
                    <p className="leading-10">{section.text}</p>

                    {section.list?.length ? (
                      <ul className="pl-5 mt-2 list-disc not-italic">
                        {section.list.map((item, i) => (
                          <li key={i}>
                            <p>{item}</p>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </blockquote>
                </div>
              );

            case "references":
              return (
                <div key={index}>
                  <div className="flex gap-2 justify-between">
                    {section.image?.map((src, i) => (
                      <img key={i} src={`${src}`} alt="" />
                    ))}
                  </div>

                  <p className="font-semibold mt-10">
                    Referensi:{" "}
                    <span className="text-sm font-normal">{section.title}</span>
                  </p>

                  <ul className="list-decimal pl-5 mt-2 leading-10">
                    {section.source.map((src, i) => (
                      <li key={i}>
                        <a href={src} target="_blank" rel="noopener noreferrer">
                          {src}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
