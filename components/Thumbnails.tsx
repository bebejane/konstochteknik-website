'use client';

import 'swiper/css';
import s from './Thumbnails.module.scss';
import cn from 'classnames';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { useShallow, useStore } from '@/lib/store';

Swiper.use([FreeMode, Mousewheel]);

type Props = {
	allProjects: AllProjectsQuery['allProjects'];
};

export default function Thumbnails({ allProjects }: Props) {
	const swiperRef = useRef<Swiper | null>(null);
	const yfIndexRef = useRef<number>(-1);
	const [hover, setHover] = useState<string | null>(null);
	const [hide, setHide] = useState(false);
	const [category, index, setIndex] = useStore(
		useShallow((s) => [s.category, s.index, s.setIndex]),
	);
	const projects = allProjects.filter(({ category: cat }) => !category || cat === category);
	const width = 400;
	const sharpness = 80;

	return (
		<>
			<SwiperReact
				id='thumbnails'
				key={category}
				slidesPerView={'auto'}
				spaceBetween={0}
				initialSlide={0}
				loop={true}
				wrapperClass={cn(s.swiper, hide && s.hide)}
				direction={'horizontal'}
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
				onMouseLeave={() => {
					yfIndexRef.current = -1;
					setHover(null);
				}}
			>
				{projects.map((p, idx) => (
					<SwiperSlide
						key={`${p.id}-${idx}-${category}`}
						className={cn(s.slide, idx === index && s.active, hover === p.id && s.hover)}
						onClick={async (e) => {
							e.stopPropagation();
							setIndex(idx);
							setHover(null);
						}}
						onMouseEnter={() => {
							setHover(p.id);
							setHide(true);
						}}
						onWheel={() => {
							setHover(p.id);
							setHide(true);
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
