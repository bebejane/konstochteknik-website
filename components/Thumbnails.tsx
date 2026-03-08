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
	const [category, index, setIndex] = useStore(
		useShallow((s) => [s.category, s.index, s.setIndex]),
	);
	const projects = allProjects.filter(({ category: cat }) => !category || cat === category);

	return (
		<>
			<SwiperReact
				id='thumbnails'
				key={category}
				slidesPerView={'auto'}
				spaceBetween={0}
				initialSlide={0}
				loop={true}
				wrapperClass={s.swiper}
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
						}}
						onMouseLeave={() => setHover(null)}
					>
						<img src={`${p.thumbnail.url}?w=400`} alt={p.title} className={s.thumbnail} />
					</SwiperSlide>
				))}
			</SwiperReact>
		</>
	);
}
