'use client';

import s from './Gallery.module.scss';
import cn from 'classnames';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import type { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';
import Slide from './slides';
import { useEffect, useRef, useState } from 'react';
import { useShallow, useStore } from '@/lib/store';

type Props = {
	allProjects: AllProjectsQuery['allProjects'];
};

export default function Gallery({ allProjects }: Props) {
	const swiperRef = useRef<Swiper | null>(null);
	const [showNavigation, setShowNavigation] = useState<string | null>(null);
	const [project, setProject, filter, index, setShowThumbnails] = useStore(
		useShallow((s) => [s.project, s.setProject, s.filter, s.index, s.setShowThumbnails]),
	);
	const color = project?.color?.hex ?? 'var(--black)';
	const buttonStyle = { color };
	const projects = allProjects.filter(({ category }) => !filter || filter === category);

	const indexChangeTimeout = useRef<NodeJS.Timeout | null>(null);

	function swipeNext() {
		swiperRef.current?.slideNext();
	}

	function handleIndexChange({ realIndex }: { realIndex: number }) {
		setShowThumbnails(false);
		indexChangeTimeout.current && clearTimeout(indexChangeTimeout.current);
		indexChangeTimeout.current = setTimeout(() => {
			const project = projects[realIndex];
			if (!project) return;
			console.log({ realIndex });
			setProject(project);
		}, 300);
	}

	const goToSlide = (targetIndex) => {
		const swiper = swiperRef.current;
		const loopedSlides = swiper.loopedSlides;
		const offset = loopedSlides; // slides added at start for loop
		const currentReal = swiper.realIndex;

		const total = loopedSlides;
		let diff = targetIndex - currentReal;
		if (diff > total / 2) diff -= total;
		if (diff < -total / 2) diff += total;

		// Get actual DOM index (current position in looped array + offset)
		const currentDom = swiper.activeIndex;
		const targetDom = currentDom + diff;

		swiper.slideTo(targetDom, 500);
	};

	useEffect(() => {
		if (!swiperRef.current) return;
		console.log({ index });
		const speed = Math.min(Math.abs(swiperRef.current.realIndex - index) * 200, 1000);
		swiperRef.current.slideToLoop(index, speed);
	}, [index]);

	useEffect(() => {
		setProject(projects[0]);
	}, [filter]);

	return (
		<>
			<SwiperReact
				key={`gallery-${filter ?? ''}`}
				id='gallery'
				slidesPerView={1}
				spaceBetween={0}
				initialSlide={0}
				speed={600}
				loop={true}
				cssMode={true}
				//noSwiping={true}
				wrapperClass={s.swiper}
				onRealIndexChange={handleIndexChange}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
			>
				{projects.map((p, idx) => (
					<SwiperSlide
						key={`${p.id}-${idx}-${filter ?? ''}`}
						className={s.slide}
						onClick={swipeNext}
					>
						<div className={s.slidewrap} style={{ backgroundColor: p.background?.hex }}>
							<Slide key={p.id} project={p} />
						</div>
					</SwiperSlide>
				))}
			</SwiperReact>

			<button
				className={cn(s.prev, showNavigation === 'prev' && s.show)}
				onMouseEnter={() => setShowNavigation('prev')}
				onMouseLeave={() => setShowNavigation(null)}
				onClick={() => swiperRef.current?.slidePrev()}
				style={buttonStyle}
			>
				←
			</button>

			<button
				className={cn(s.next, showNavigation === 'next' && s.show)}
				onMouseEnter={() => setShowNavigation('next')}
				onMouseLeave={() => setShowNavigation(null)}
				onClick={() => swiperRef.current?.slideNext()}
				style={buttonStyle}
			>
				→
			</button>
		</>
	);
}
