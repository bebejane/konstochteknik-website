'use client'

import "swiper/css";
import s from "./Gallery.module.scss";
import cn from 'classnames'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import type { Swiper } from 'swiper';
import Slide from './slides'
import { useRef, useState } from "react";
import { useStore } from "@lib/store";

type Props = {
  allProjects: AllProjectsQuery['allProjects']
}

export default function Gallery({ allProjects }: Props) {

  const swiperRef = useRef<Swiper | null>(null)
  const [index, setIndex] = useState(0)
  const [showNavigation, setShowNavigation] = useState<string | null>(null)
  const [setProject] = useStore((s) => [s.setProject]);
  const buttonStyle = { color: allProjects[index].color?.hex }

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
          <SwiperSlide key={`${p.id}-${idx}`} className={s.slide} onClick={() => swiperRef.current?.slideNext()}>
            <div className={s.slidewrap} style={{ backgroundColor: p?.background?.hex }}>
              <Slide project={p} />
            </div>
          </SwiperSlide>
        )}
      </SwiperReact>
      <button
        className={cn(s.prev, showNavigation === 'prev' && s.show)}
        onClick={() => swiperRef.current.slidePrev()}
        onMouseEnter={() => setShowNavigation('prev')}
        onMouseLeave={() => setShowNavigation(null)}
        style={buttonStyle}
      >←</button>

      <button
        id="next"
        className={cn(s.next, showNavigation === 'next' && s.show)}
        onMouseEnter={() => setShowNavigation('next')}
        onMouseLeave={() => setShowNavigation(null)}
        onClick={() => swiperRef.current.slideNext()}
        style={buttonStyle}
      >→</button>
    </>

  )
}