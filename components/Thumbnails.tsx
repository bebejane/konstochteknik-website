'use client';

import 'swiper/css';
import s from './Thumbnails.module.scss';
import cn from 'classnames';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { useShallow, useStore } from '@/lib/store';
import Mixer from '@/lib/mixer/index';
import youngfolks from '@/lib/mixer/youngfolks';

Swiper.use([FreeMode, Mousewheel]);

type Props = {
	allProjects: AllProjectsQuery['allProjects'];
};

export default function Thumbnails({ allProjects }: Props) {
	const swiperRef = useRef<Swiper | null>(null);
	const mixerRef = useRef<Mixer | null>(null);
	const yfIndexRef = useRef<number>(-1);
	const [hover, setHover] = useState<string | null>(null);
	const [category, index, setIndex] = useStore(useShallow((s) => [s.category, s.index, s.setIndex]));
	const projects = allProjects.filter(({ category: cat }) => !category || cat === category);

	function initTone() {
		return;
		if (mixerRef.current) return;

		mixerRef.current = new Mixer();
	}

	function playNote() {
		return;
		return playYoungFolks();
	}
	function playYoungFolks() {
		return;
		yfIndexRef.current + 1 > youngfolks.length - 1 ? (yfIndexRef.current = 0) : (yfIndexRef.current += 1);
		mixerRef.current?.playNote(youngfolks[yfIndexRef.current], 5, 0.5);
	}
	function playShortNote() {
		return;
		yfIndexRef.current + 1 > youngfolks.length - 1 ? (yfIndexRef.current = 0) : (yfIndexRef.current += 1);
		const note = youngfolks[yfIndexRef.current].split('')[0];
		const octave = parseInt(youngfolks[yfIndexRef.current].split('')[1]);
		mixerRef.current?.playBass(`${note}${1}`, 0.2, 1);
	}

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
				onClick={() => initTone()}
				onMouseLeave={() => {
					yfIndexRef.current = -1;
					setHover(null);
				}}
				onTouchStart={() => {
					playNote();
				}}
			>
				{projects.map((p, idx) => (
					<SwiperSlide
						key={`${p.id}-${idx}-${category}`}
						className={cn(s.slide, idx === index && s.active, hover === p.id && s.hover)}
						onClick={async (e) => {
							e.stopPropagation();
							playNote();
							setIndex(idx);
							setHover(null);
						}}
						onMouseEnter={() => {
							playShortNote();
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
