"use client";

import s from "./Thumbnails.module.scss";
import cn from "classnames";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import Swiper from "swiper";
import { FreeMode, Mousewheel } from "swiper/modules";
import { useEffect, useMemo, useRef, useState } from "react";
import { useShallow, useStore } from "@/lib/store";
import CSS from "csstype";
import { rInt } from "next-dato-utils/utils";

type Props = {
  allProjects: AllProjectsQuery["allProjects"];
};

export default function Thumbnails({ allProjects }: Props) {
  const swiperRef = useRef<Swiper | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [init, setInit] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [thumbLoadStyles, setThumbLoadStyles] = useState<
    Record<string, CSS.Properties>
  >({});
  const stylesInitialized = useRef(false);
  const [
    showThumbnails,
    setShowThumbnails,
    filter,
    index,
    setIndex,
    project,
    inIntro,
    setLoading,
  ] = useStore(
    useShallow((s) => [
      s.showThumbnails,
      s.setShowThumbnails,
      s.filter,
      s.index,
      s.setIndex,
      s.project,
      s.inIntro,
      s.setLoading,
    ]),
  );

  const width = 600;
  const showThumbnailsRef = useRef(showThumbnails);
  const filteredProjects = allProjects.filter(
    ({ category }) => !filter || filter === category,
  );
  const projects = useMemo(() => {
    const arr = [...filteredProjects];
    if (arr.length < 20) arr.push(...arr);
    return arr;
  }, [filteredProjects]);

  const allLoaded =
    projects.filter((p) => loaded[p.thumbnail.id]).length === projects.length;

  useEffect(() => {
    if (stylesInitialized.current) return;
    stylesInitialized.current = true;
    const styles: Record<string, CSS.Properties> = {};
    projects.forEach((p) => {
      styles[p.thumbnail.id] = { transitionDelay: `${rInt(100, 600)}ms` };
    });
    setThumbLoadStyles(styles);
  }, [projects]);

  function handleThumbRef(e: HTMLImageElement | null) {
    if (!e?.complete) return;
    const id = e.dataset.thumbId;
    if (id && typeof loaded[id] === "undefined")
      setLoaded((l) => ({ ...l, [id]: true }));
  }

  function handleLoad(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const id = e.currentTarget.dataset.thumbId;
    setLoaded((l) => ({ ...l, [id]: true }));
  }

  function centerSlide(index: number): void {
    swiperRef.current?.slideToLoop(index, 300, true);
  }

  useEffect(() => {
    showThumbnailsRef.current = showThumbnails;
  }, [showThumbnails]);

  useEffect(() => {
    if (!project || showThumbnailsRef.current) return;
    const index = projects.findIndex((p) => p.id === project?.id);
    centerSlide(index);
  }, [project?.id]);

  useEffect(() => {
    allLoaded && setLoading({ thumbs: false });
  }, [allLoaded]);

  return (
    <div
      onMouseEnter={() => setShowThumbnails(true)}
      onMouseLeave={() => setShowThumbnails(false)}
    >
      <SwiperReact
        id="thumbnails"
        key={`thumbnails-${filter ?? ""}`}
        slidesPerView={"auto"}
        spaceBetween={0}
        loop={true}
        centeredSlides={true}
        initialSlide={0}
        wrapperClass={cn(s.swiper, (!showThumbnails || !init) && s.hide)}
        direction={"horizontal"}
        modules={[FreeMode, Mousewheel]}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
          invert: false,
          sensitivity: 1,
        }}
        freeMode={{
          enabled: true,
          momentum: true,
          sticky: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onAfterInit={() => setInit(true)}
      >
        {projects
          .filter(({ thumbnail }) => thumbnail)
          .map((p, idx) => (
            <SwiperSlide
              key={`${p.id}-${idx}-${filter ?? ""}`}
              className={cn(
                s.slide,
                idx === index && s.active,
                hover === p.id && s.hover,
              )}
              onMouseEnter={() => setHover(p.id)}
              onWheel={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(idx);
              }}
            >
              <img
                ref={handleThumbRef}
                data-thumb-id={p.thumbnail.id}
                src={`${p.thumbnail.url}?w=${width}`}
                className={cn(
                  s.image,
                  hover === p.id && s.hover,
                  loaded[p.thumbnail.id] && !inIntro && s.show,
                )}
                style={!inIntro ? thumbLoadStyles[p.thumbnail.id] : {}}
                onLoad={handleLoad}
                onError={handleLoad}
              />
            </SwiperSlide>
          ))}
      </SwiperReact>
    </div>
  );
}
