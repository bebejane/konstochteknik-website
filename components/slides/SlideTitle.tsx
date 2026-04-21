"use client";

import s from "./SlideTitle.module.scss";
import cn from "classnames";
import { Markdown } from "next-dato-utils/components";
import { useShallow, useStore } from "@/lib/store";

type Props = {
  clean?: boolean;
};

export default function SlideTitle({}: Props) {
  const [project] = useStore(useShallow((s) => [s.project]));
  const active = true;
  const color = project.color?.hex ?? "var(--black)";

  return (
    <h2
      key={`${project.id}-${active}`}
      className={cn(s.title, s[project.captionStyle], "color-transition")}
      style={{ color }}
      onClick={(e) => e.stopPropagation()}
    >
      <Markdown content={project.caption!} />
    </h2>
  );
}
