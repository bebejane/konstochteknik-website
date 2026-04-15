'use client';

import s from './Intro.module.scss';
import { useEffect, useRef, useState } from 'react';

type Props = {
	intro: IntroQuery['intro'];
};

export default function Intro({ intro }: Props) {
	const [loader, setLoader] = useState<IntroQuery['intro']['loader'][number]>(intro.loader[0]);
	const [show, setShow] = useState(true);
	const interval = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		interval.current = setInterval(() => {
			setLoader((loader) => {
				const index = intro.loader.findIndex((l) => l.id === loader.id);
				return index + 1 > intro.loader.length - 1 ? intro.loader[0] : intro.loader[index + 1];
			});
		}, intro.speed);

		setTimeout(() => {
			clearInterval(interval.current);
			setShow(false);
		}, intro.duration);

		return () => clearInterval(interval.current);
	}, [intro]);

	if (!show) return null;
	return (
		<div className={s.intro} onClick={() => setShow(false)}>
			<h1 className='big'>
				<span className={s.title}>{loader.title}</span>
				<span className={s.and}>
					<i>&</i>
				</span>
				<span className={s.subtitle}>{loader.subtitle}</span>
			</h1>
			<h2>
				<i>Loading...</i>
			</h2>
		</div>
	);
}
