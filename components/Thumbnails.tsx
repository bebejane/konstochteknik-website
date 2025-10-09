'use client';

import 'swiper/css';
import s from './Thumbnails.module.scss';
import cn from 'classnames';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { useShallow, useStore } from '@/lib/store';
import { Image } from 'react-datocms';
import * as Tone from 'tone';

Swiper.use([FreeMode, Mousewheel]);

type Props = {
	allProjects: AllProjectsQuery['allProjects'];
};

export default function Thumbnails({ allProjects }: Props) {
	const swiperRef = useRef<Swiper | null>(null);
	const toneRef = useRef<Tone.DuoSynth | null>(null);
	const [hover, setHover] = useState<string | null>(null);
	const [category, index, setIndex] = useStore(useShallow((s) => [s.category, s.index, s.setIndex]));
	const projects = allProjects.filter(({ category: cat }) => !category || cat === category);

	function initTone() {
		if (toneRef.current) return;
		console.log('initTone');
		const feedbackDelay = new Tone.FeedbackDelay('8n', 0.9).toDestination();
		const phaser = new Tone.Phaser(500, 3, 300).toDestination();

		feedbackDelay.wet.value = 0.5;
		phaser.wet.value = 0.5;

		toneRef.current = new Tone.DuoSynth({
			volume: 0.1,
			harmonicity: 0.5,
			vibratoAmount: 0.5,
			vibratoRate: 0.5,
			context: {
				latencyHint: 'interactive',
			},
		})
			.connect(feedbackDelay)
			.connect(phaser)

			.toDestination();

		//toneRef.current.volume.value = 0.5;
	}

	function playNote() {
		const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
		const octave = 5;
		const piano = notes.map((n, i) => `${n}${octave}`).concat(notes.map((n, i) => `${n}${octave + 1}`));
		const idx = Math.floor(projects.findIndex((p) => p.id === hover) % piano.length);

		toneRef.current?.triggerAttackRelease(piano[idx], 2, Tone.now(), 0.1);
		console.log('play note', piano[idx]);
	}

	useEffect(() => {
		//if (hover === null) return;
	}, [hover]);

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
			>
				{projects.map((p, idx) => (
					<SwiperSlide
						key={`${p.id}-${idx}-${category}`}
						className={cn(s.slide, idx === index && s.active, hover === p.id && s.hover)}
						onClick={(e) => {
							e.stopPropagation();
							playNote();
							setIndex(idx);
							setHover(p.id);
						}}
						onMouseEnter={() => setHover(p.id)}
						onMouseLeave={() => setHover(null)}
					>
						<Image
							data={{ ...p.thumbnail.responsiveImage, bgColor: p.background?.hex ?? undefined }}
							intersectionMargin={'0px 100% 0px 100%'}
							usePlaceholder={false}
						/>
					</SwiperSlide>
				))}
			</SwiperReact>
		</>
	);
}
