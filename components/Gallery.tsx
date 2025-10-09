'use client';

import 'swiper/css';
import s from './Gallery.module.scss';
import cn from 'classnames';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper/modules';
import type { Swiper } from 'swiper';
import Slide from './slides';
import { useEffect, useRef, useState } from 'react';
import { useShallow, useStore } from '@/lib/store';

const customEffect = {
	setTranslate: function () {
		console.log('.');
		// Your code to animate the slides here,
		// using the 'progress' property for animation progress.
		const swiper = this; // 'this' refers to the swiper instance
		const slides = swiper.slides;
		const progress = swiper.progress;
		console.log(progress);
		slides.forEach(function (slide) {
			// Example: Adjust opacity based on progress
			const slideProgress = (slide.progress - swiper.activeIndex) * 0.7 + 0.3; // Simplified example
			slide.style.opacity = Math.max(0, Math.min(1, slideProgress));

			// Example: Apply a rotation based on progress
			slide.style.transform = `rotateY(${slide.progress * 45}deg)`;
		});
	},
	setTransition: function (duration) {
		console.log(duration);
		// Your code to animate the transition duration here.
		const swiper = this;
		swiper.slides.forEach(function (slide) {
			slide.style.transitionDuration = `${duration}ms`;
		});
	},
};

type Props = {
	allProjects: AllProjectsQuery['allProjects'];
};

export default function Gallery({ allProjects }: Props) {
	const swiperRef = useRef<Swiper | null>(null);

	const [showNavigation, setShowNavigation] = useState<string | null>(null);
	const [project, setProject, category, index, setIndex] = useStore(
		useShallow((s) => [s.project, s.setProject, s.category, s.index, s.setIndex])
	);
	const buttonStyle = { color: project?.color?.hex };
	const projects = allProjects.filter(({ category: cat }) => !category || cat === category);

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

		swiperRef.current?.slideTo(index);
		setTimeout(() => setProject(projects[index] as ProjectRecord), 200);
	}, [index]);

	useEffect(() => {
		//if (index === 0) return;
		//swiperRef.current.coverflowEffect = customEffect;
	}, [swiperRef]);

	return (
		<>
			<SwiperReact
				slidesPerView={1}
				spaceBetween={0}
				initialSlide={0}
				loop={true}
				wrapperClass={s.swiper}
				onRealIndexChange={({ realIndex }) => setIndex(realIndex)}
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
