import React from "react";
import { useMediaQuery } from "react-responsive";

export default function BlockSkills({ title, skill }) {
  const isPrint = useMediaQuery({ query: "print" }); // Detect print mode

  if (isPrint) {
    return (
      <article className="skills prose-sm">
        <h3 className="headline border-b-2 text-sm">{title}</h3>
        <ul className="not-prose p-0 m-0 flex list-none flex-row flex-wrap gap-1">
          {skill.map((i, id) => (
            <li
              className="rounded-sm p-0 text-xs text-gray-500 border-b-2"
              key={id}
            >
              {i}
            </li>
          ))}
        </ul>
      </article>
    );
  }

  return (
    <article className="skills prose prose-sm mb-2 md:mb-0 order-3 md:prose-md lg:prose-lg xl:prose-lg">
      <h3 className="headline border-b-2 text-lg">{title}</h3>
      <ul className="not-prose p-0 flex list-none flex-row flex-wrap gap-1">
        {skill.map((i, id) => (
          <li
            className="rounded-lg hover:animate-[wiggle_1s_ease-in-out_infinite] bg-gray-100 py-[4px] px-[8px] text-xs text-black"
            key={id}
          >
            {i}
          </li>
        ))}
      </ul>
    </article>
  );
}
