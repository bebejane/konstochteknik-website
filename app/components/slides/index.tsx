'use client'

import s from "./index.module.scss";
import cn from 'classnames'
import { Markdown } from "next-dato-utils/components";
import ImageSlide from "./ImageSlide";
import VideoSlide from "./VideoSlide";
import { useStore } from "@lib/store";

type Props = {
  project: AllProjectsQuery['allProjects'][0]

}

export default function Slide({ project }: Props) {

  const [currentProject] = useStore((s) => [s.project]);
  const active = currentProject?.id === project.id

  return (
    <div
      key={project.id}
      style={{ backgroundColor: project?.background?.hex }}
      className={s.slide}
    >
      <>
        {project.slide[0].__typename === 'ImageSlideRecord' ?
          <ImageSlide data={project.slide[0] as ImageSlideRecord} active={active} />
          :
          project.slide[0].__typename === 'VideoSlideRecord' ?
            <VideoSlide data={project.slide[0] as VideoSlideRecord} active={active} />
            :
            null
        }
      </>
      {active &&
        <h2
          className={cn(s[project.captionStyle], 'color-transition')}
          style={{ color: project?.color?.hex }}
        >
          <Markdown content={project.caption} />
        </h2>
      }
    </div>
  )
}