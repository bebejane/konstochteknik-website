'use client';

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
	const [color, setColor, setProjectId, category, index] = useStore(
		useShallow((s) => [s.color, s.setColor, s.setProjectId, s.category, s.index]),
	);
	const buttonStyle = { color };
	const projects = allProjects.filter(({ category: cat }) => !category || cat === category);

	function swipeNext() {
		if (index === allProjects.length - 1) return;
		swiperRef.current?.slideNext();
	}

	function handleTransitionEnd({ activeIndex }: { activeIndex: number }) {
		requestAnimationFrame(() => {
			const project = projects[activeIndex];
			if (!project) return;
			const { color, id } = projects[activeIndex];
			setProjectId(id);
			setColor(color?.hex ?? null);
		});
	}

	useEffect(() => {
		if (!swiperRef.current) return;
		const speed = Math.min(Math.abs(swiperRef.current.realIndex - index) * 200, 1000);
		swiperRef.current.slideTo(index, speed);
	}, [index]);

	return (
		<>
			<SwiperReact
				key={`gallery-${category ?? ''}`}
				id='gallery'
				slidesPerView={1}
				spaceBetween={0}
				initialSlide={0}
				speed={500}
				loop={true}
				cssMode={true}
				wrapperClass={s.swiper}
				onTransitionEnd={handleTransitionEnd}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				onInit={() => console.log('init gallery')}
			>
				{projects.map((p, idx) => (
					<SwiperSlide
						key={`${p.id}-${idx}-${category ?? ''}`}
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
