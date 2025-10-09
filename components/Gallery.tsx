'use client';

import 'swiper/css';
import s from './Gallery.module.scss';
import cn from 'classnames';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import type { Swiper } from 'swiper';
import Slide from './slides';
import { useEffect, useRef, useState } from 'react';
import { useShallow, useStore } from '@/lib/store';

type Props = {
	allProjects: AllProjectsQuery['allProjects'];
};

export default function Gallery({ allProjects }: Props) {
	const swiperRef = useRef<Swiper | null>(null);

	const [showNavigation, setShowNavigation] = useState<string | null>(null);
	const [project, setProject, category] = useStore(useShallow((s) => [s.project, s.setProject, s.category]));
	const buttonStyle = { color: project?.color?.hex };
	const projects = allProjects.filter(({ category: cat }) => !category || cat === category);
	const index =
		projects.findIndex((p) => p.id === project?.id) > -1 ? projects.findIndex((p) => p.id === project?.id) : 0;

	function swipeNext() {
		if (index === allProjects.length - 1) return;
		swiperRef.current?.slideTo(index + 1);
	}

	function swipePrev() {
		if (index === 0) return;
		swiperRef.current?.slideTo(index - 1);
	}

	useEffect(() => {
		//window.history.pushState(null, '', index === 0 ? '/' : `/projects/${allProjects[index].slug}`);
		if (index === 0) swiperRef.current?.slideTo(0);
		else swiperRef.current?.slideTo(index);
	}, [project]);

	return (
		<>
			<SwiperReact
				slidesPerView={1}
				spaceBetween={0}
				initialSlide={0}
				loop={true}
				wrapperClass={s.swiper}
				onRealIndexChange={(swiper) => setProject(projects[swiper.realIndex] as ProjectRecord)}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
			>
				{projects.map((p, idx) => (
					<SwiperSlide key={`${p.id}-${idx}-${category}`} className={s.slide} onClick={swipeNext}>
						<div className={s.slidewrap} style={{ backgroundColor: p?.background?.hex }}>
							<Slide project={p} />
						</div>
					</SwiperSlide>
				))}
			</SwiperReact>

			<button
				className={cn(s.prev, showNavigation === 'prev' && s.show)}
				onMouseEnter={() => setShowNavigation('prev')}
				onMouseLeave={() => setShowNavigation(null)}
				onClick={swipePrev}
				style={buttonStyle}
			>
				←
			</button>

			<button
				className={cn(s.next, showNavigation === 'next' && s.show)}
				onMouseEnter={() => setShowNavigation('next')}
				onMouseLeave={() => setShowNavigation(null)}
				onClick={swipeNext}
				style={buttonStyle}
			>
				→
			</button>
		</>
	);
}
