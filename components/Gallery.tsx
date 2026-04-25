'use client';

import s from './Gallery.module.scss';
import cn from 'classnames';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import type { Swiper } from 'swiper';
import Slide from './slides';
import { useEffect, useRef, useState } from 'react';
import { useShallow, useStore } from '@/lib/store';
import { useIsMobile } from '@/lib/hooks/useIsMobile';

type Props = {
	allProjects: AllProjectsQuery['allProjects'];
};

export default function Gallery({ allProjects }: Props) {
	const swiperRef = useRef<Swiper | null>(null);
	const speed = 600;
	const keyboardSwipingRef = useRef<boolean>(false);
	const isMobile = useIsMobile();
	const [showNavigation, setShowNavigation] = useState<string | null>(null);
	const [project, setProject, filter, index, setShowThumbnails, setLoading, inIntro] = useStore(
		useShallow((s) => [
			s.project,
			s.setProject,
			s.filter,
			s.index,
			s.setShowThumbnails,
			s.setLoading,
			s.inIntro,
		]),
	);
	const color = project?.color?.hex ?? 'var(--black)';
	const buttonStyle = { color };
	const projects = allProjects.filter(({ category }) => !filter || filter === category);
	if (projects.length < 20) projects.push.apply(projects, projects);

	const indexChangeTimeout = useRef<NodeJS.Timeout | null>(null);

	function swipeNext() {
		swiperRef.current?.slideNext();

		setShowThumbnails(isMobile ? true : false);
	}
	function swipePrev() {
		swiperRef.current?.slidePrev();
		setShowThumbnails(isMobile ? true : false);
	}

	function handleIndexChange({ realIndex }: { realIndex: number }) {
		indexChangeTimeout.current && clearTimeout(indexChangeTimeout.current);
		indexChangeTimeout.current = setTimeout(() => {
			const project = projects[realIndex];
			if (!project) return;
			setProject(project);
		}, 300);
	}

	useEffect(() => {
		if (!swiperRef.current) return;

		swiperRef.current.slideToLoop(index, 0, false);
	}, [index]);

	useEffect(() => {
		setProject(projects[0]);
	}, [filter]);

	useEffect(() => {
		if (!swiperRef.current || inIntro) return;

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

			if (keyboardSwipingRef.current) return;
			if (e.key === 'ArrowLeft') swipePrev();
			else if (e.key === 'ArrowRight') swipeNext();
			keyboardSwipingRef.current = true;
			setTimeout(() => (keyboardSwipingRef.current = false), speed);
		}
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [inIntro]);

	return (
		<>
			<SwiperReact
				key={`gallery-${filter ?? ''}`}
				id='gallery'
				slidesPerView={1}
				spaceBetween={0}
				initialSlide={0}
				speed={speed}
				loop={true}
				cssMode={true}
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
							<Slide
								key={p.id}
								project={p}
								index={idx}
								onLoad={() => idx === 0 && setLoading({ gallery: false })}
							/>
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
