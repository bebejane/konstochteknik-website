'use client'

import "swiper/css";
import s from "./Gallery.module.scss";
import cn from 'classnames'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import type { Swiper } from 'swiper';
import Slide from './Slide'
import VideoSlide from './VideoSlide';
import ImageSlide from './ImageSlide';
import { useRef, useState } from "react";
import { useStore } from "../../lib/store";
import { Markdown } from "next-dato-utils/components";

type Props = {
  allProjects: AllProjectsQuery['allProjects']
}

export default function Gallery({ allProjects }: Props) {

  const swiperRef = useRef<Swiper | null>(null)
  const [index, setIndex] = useState(0)
  const [showNavigation, setShowNavigation] = useState<string | null>(null)
  const [setProject] = useStore((s) => [s.setProject]);

  return (
    <>
      <SwiperReact
        slidesPerView={1}
        spaceBetween={0}
        initialSlide={0}
        loop={true}
        wrapperClass={s.swiper}
        onSlideChange={({ realIndex }) => {
          setIndex(realIndex)
          setProject(allProjects[realIndex] as ProjectRecord)
        }}
        onSwiper={(swiper) => swiperRef.current = swiper}
      >
        {allProjects?.map((p, idx) =>
          <SwiperSlide
            key={`${p.id}-${idx}`}
            className={s.slide}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <div className={s.slidewrap} style={{ backgroundColor: p?.background?.hex }}>
              <>
                {p.slide[0].__typename === 'ImageSlideRecord' ?
                  <ImageSlide data={p.slide[0] as ImageSlideRecord} active={index === idx} />
                  :
                  p.slide[0].__typename === 'VideoSlideRecord' ?
                    <VideoSlide data={p.slide[0] as VideoSlideRecord} active={index === idx} />
                    :
                    null
                }
              </>
              {index === idx &&
                <h2
                  className={cn(s[p.captionStyle], 'color-transition')}
                  style={{ color: p?.color?.hex }}
                >
                  <Markdown content={p.caption} />
                </h2>
              }
            </div>

          </SwiperSlide>
        )}
      </SwiperReact>
      <button
        className={cn(s.prev, showNavigation === "prev" && s.show)}
        //use:hoverAction
        //on:hover={handleNavigationHover}
        onClick={() => swiperRef.current.slidePrev()}
      //style:color={allProjects[index].color?.hex}
      >←</button>

      <button
        id="next"
        className={cn(s.next, showNavigation === "next" && s.show)}
        //use:hoverAction
        //on:hover={handleNavigationHover}
        onClick={() => swiperRef.current.slideNext()}
      //style:color={allProjects[index].color?.hex}
      >→</button>
    </>

  )
}