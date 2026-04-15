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
		indexChangeTimeout.current && clearTimeout(indexChangeTimeout.current);
		indexChangeTimeout.current = setTimeout(() => {
			const project = projects[realIndex];
			if (!project) return;

			setProject(project);
		}, 300);
	}

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
