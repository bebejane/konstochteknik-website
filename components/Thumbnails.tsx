'use client';

import s from './Thumbnails.module.scss';
import cn from 'classnames';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useShallow, useStore } from '@/lib/store';

type Props = {
	allProjects: AllProjectsQuery['allProjects'];
};

export default function Thumbnails({ allProjects }: Props) {
	const swiperRef = useRef<Swiper | null>(null);
	const [hover, setHover] = useState<string | null>(null);
	const [showThumbnails, setShowThumbnails, filter, index, setIndex, project] = useStore(
		useShallow((s) => [
			s.showThumbnails,
			s.setShowThumbnails,
			s.filter,
			s.index,
			s.setIndex,
			s.project,
		]),
	);
	const projects = allProjects.filter(({ category }) => !filter || filter === category);
	const width = 400;
	const sharpness = 80;

	function centerSlide(swiper: Swiper, targetIndex: number): void {
		return;
		const slides = Array.from(swiper.slides);
		const targetSlide = slides.find(
			(slide) => (slide as any).getAttribute('data-swiper-slide-index') === String(targetIndex),
		);

		if (!targetSlide) return;

		const rect = targetSlide.getBoundingClientRect();
		const containerRect = swiper.el.getBoundingClientRect();
		const centerPos = rect.left - containerRect.left + rect.width / 2;

		swiper.setTranslate(-centerPos + swiper.width / 2);
	}

	useEffect(() => {
		console.log('change prject slide', hover);
		if (!project) return;
		const slideWidth = swiperRef.current.width;
		const index = projects.findIndex((p) => p.id === project?.id);
		centerSlide(swiperRef.current, index);
	}, [project?.id]);

	return (
		<>
			<SwiperReact
				id='thumbnails'
				key={`thumbnails-${filter ?? ''}`}
				slidesPerView={'auto'}
				spaceBetween={0}
				initialSlide={0}
				loop={true}
				wrapperClass={cn(s.swiper, !showThumbnails && s.hide)}
				direction={'horizontal'}
				centeredSlides={true}
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
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				onMouseLeave={() => setHover(null)}
			>
				{projects.map((p, idx) => (
					<SwiperSlide
						key={`${p.id}-${idx}-${filter ?? ''}`}
						className={cn(s.slide, idx === index && s.active, hover === p.id && s.hover)}
						onClick={async (e) => {
							e.stopPropagation();
							setIndex(idx);
							//setHover(null);
						}}
						onMouseEnter={() => {
							setHover(p.id);
						}}
						onWheel={() => {
							setHover(p.id);
						}}
						onMouseLeave={() => setHover(null)}
					>
						{p.thumbnail?.url && (
							<img
								src={`${p.thumbnail.url}?w=${width}&sharp=${sharpness}`}
								alt={p.title}
								className={cn(s.image, hover === p.id && s.hover)}
							/>
						)}
					</SwiperSlide>
				))}
			</SwiperReact>
		</>
	);
}
