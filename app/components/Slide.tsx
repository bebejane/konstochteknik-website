'use client'

import { useState } from "react";
import Link from "next/link";
import s from "./Slide.module.scss";
import cn from 'classnames'
import { Markdown } from "next-dato-utils/components";

type Props = {
  active: boolean
  project: AllProjectsQuery['allProjects'][0]
  children: React.ReactNode | React.ReactNode[]
}

export default function Slide({ children, active, project }: Props) {

  return (
    <div
      key={project.id}
      style={{ backgroundColor: project?.background?.hex }}
      className={s.slide}
    >
      {children}
      {active &&
        <h2
          className={cn(s[project.captionStyle], s.caption, 'color-transition')}
          style={{ color: project?.color?.hex }}
        //transition:fade={{ duration: 800 }}
        >
          <Markdown content={project.caption} />
        </h2>
      }
    </div>
  )
}