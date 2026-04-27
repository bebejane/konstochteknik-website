'use client';

import s from './Intro.module.scss';
import cn from 'classnames';
import { useShallow, useStore } from '@/lib/store';

import { use, useEffect, useRef, useState } from 'react';
import { sleep } from 'next-dato-utils/utils';

type Props = {
	intro: IntroQuery['intro'];
	project: AllProjectsQuery['allProjects'][number];
};

export default function Intro({ intro, project }: Props) {
	const [inIntro, setInIntro, loading] = useStore(
		useShallow((s) => [s.inIntro, s.setInIntro, s.loading]),
	);
	const [loader, setLoader] = useState<IntroQuery['intro']['loader'][number]>(intro.loader[0]);
	const interval = useRef<NodeJS.Timeout | null>(null);
	const timeout = useRef<NodeJS.Timeout | null>(null);

	async function animate() {
		const title = document.getElementById('title');

		title.innerHTML = `<span class="${s.cursor}"></span>`;
		await sleep(2000);
		const speed = 0.7;

		for (let i = 0; i < typewriter.length; i++) {
			const { key, time, str, cursor } = typewriter[i];
			const last = typewriter[i - 1 > 0 ? i - 1 : 0].time;

			await sleep((time - last) * speed);

			title.innerHTML = str
				.split('')
				.map(
					(c, i) =>
						`<span class="${c === '\n' ? s.break : ''}">${c}</span>` +
						(i === cursor - 1 ? `<span class="${s.cursor}"></span>` : ''),
				)
				.join('');
		}
		await sleep(1000);
		setInIntro(false);
	}

	useEffect(() => {
		interval.current = setInterval(() => {
			setLoader((loader) => {
				const index = intro.loader.findIndex((l) => l.id === loader.id);
				return index + 1 > intro.loader.length - 1 ? intro.loader[0] : intro.loader[index + 1];
			});
		}, intro.speed);

		timeout.current = setTimeout(() => {
			clearInterval(interval.current);
			setInIntro(false);
			//}, intro.duration);
		}, 1000000);

		return () => {
			clearInterval(interval.current);
			clearTimeout(timeout.current);
		};
	}, [intro]);

	useEffect(() => {
		if (!loading.gallery) {
			//clearTimeout(timeout.current);
			clearInterval(interval.current);
			//setInIntro(false);
		}
	}, [loading]);

	useEffect(() => {
		animate();
	}, []);

	useEffect(() => {
		return;
		const meta = ['Escape', 'Shift', 'Backspace', 'LeftArrow', 'RightArrow', 'Backspace', 'Meta'];
		let keys: { key: string; time: number; str: string; cursor: number }[] = [];
		let str = '';
		let cursor = 0;
		let startTime = 0;

		function handleKeyDown(e: KeyboardEvent) {
			if (startTime === 0) startTime = Date.now();
			const time = Date.now() - startTime;
			if (e.key === 'Escape') {
				console.log(keys);
				keys = [];
				str = '';
				cursor = 0;
				startTime = 0;
				return;
			}

			if (['Meta', 'Shift', 'Control', 'Alt'].includes(e.key)) {
				return;
			}

			if (e.key === 'Backspace') {
				if (cursor > 0) {
					str = str.slice(0, cursor - 1) + str.slice(cursor);
					cursor--;
				}
			} else if (e.key === 'ArrowLeft') {
				cursor = Math.max(0, cursor - 1);
			} else if (e.key === 'ArrowRight') {
				cursor = Math.min(str.length, cursor + 1);
			} else if (e.key === 'Enter' || e.key.length === 1) {
				str = str.slice(0, cursor) + (e.key === 'Enter' ? '\n' : e.key) + str.slice(cursor);
				cursor++;
			}

			if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) {
				keys.push({ key: e.key, time, str, cursor });
			}
			console.log(str.slice(0, cursor) + '|' + str.slice(cursor));
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	if (!inIntro) return null;

	return (
		<div className={s.intro}>
			<h1 id='title' className='big'></h1>
		</div>
	);
}

const typewriter = [
	{
		key: 'P',
		time: 200,
		str: 'P',
		cursor: 1,
	},
	{
		key: 'e',
		time: 349,
		str: 'Pe',
		cursor: 2,
	},
	{
		key: 't',
		time: 510,
		str: 'Pet',
		cursor: 3,
	},
	{
		key: 'e',
		time: 669,
		str: 'Pete',
		cursor: 4,
	},
	{
		key: 'r',
		time: 734,
		str: 'Peter',
		cursor: 5,
	},
	{
		key: ',',
		time: 1031,
		str: 'Peter,',
		cursor: 6,
	},
	{
		key: ' ',
		time: 1097,
		str: 'Peter, ',
		cursor: 7,
	},
	{
		key: 'B',
		time: 1398,
		str: 'Peter, B',
		cursor: 8,
	},
	{
		key: 'j',
		time: 1561,
		str: 'Peter, Bj',
		cursor: 9,
	},
	{
		key: 'o',
		time: 1737,
		str: 'Peter, Bjo',
		cursor: 10,
	},
	{
		key: 'r',
		time: 1899,
		str: 'Peter, Bjor',
		cursor: 11,
	},
	{
		key: 'n',
		time: 2023,
		str: 'Peter, Bjorn',
		cursor: 12,
	},
	{
		key: 'Enter',
		time: 2535,
		str: 'Peter, Bjorn\n',
		cursor: 13,
	},
	{
		key: '&',
		time: 3057,
		str: 'Peter, Bjorn\n&',
		cursor: 14,
	},
	{
		key: 'Enter',
		time: 3286,
		str: 'Peter, Bjorn\n&\n',
		cursor: 15,
	},
	{
		key: 'J',
		time: 3787,
		str: 'Peter, Bjorn\n&\nJ',
		cursor: 16,
	},
	{
		key: 'o',
		time: 4067,
		str: 'Peter, Bjorn\n&\nJo',
		cursor: 17,
	},
	{
		key: 'h',
		time: 4410,
		str: 'Peter, Bjorn\n&\nJoh',
		cursor: 18,
	},
	{ key: 'ArrowLeft', time: 4610, str: 'Peter, Bjorn\n&\nJoh', cursor: 17 },
	{ key: 'ArrowLeft', time: 4810, str: 'Peter, Bjorn\n&\nJoh', cursor: 16 },
	{ key: 'ArrowLeft', time: 5010, str: 'Peter, Bjorn\n&\nJoh', cursor: 15 },
	{ key: 'ArrowLeft', time: 5210, str: 'Peter, Bjorn\n&\nJoh', cursor: 14 },
	{ key: 'ArrowLeft', time: 5410, str: 'Peter, Bjorn\n&\nJoh', cursor: 13 },
	{ key: 'ArrowLeft', time: 5610, str: 'Peter, Bjorn\n&\nJoh', cursor: 12 },
	{ key: 'ArrowLeft', time: 5810, str: 'Peter, Bjorn\n&\nJoh', cursor: 11 },
	{ key: 'ArrowLeft', time: 6010, str: 'Peter, Bjorn\n&\nJoh', cursor: 10 },
	{
		key: 'Backspace',
		time: 6310,
		str: 'Peter, Bjrn\n&\nJoh',
		cursor: 9,
	},
	{
		key: 'ö',
		time: 6610,
		str: 'Peter, Björn\n&\nJoh',
		cursor: 10,
	},
	{ key: 'ArrowRight', time: 6810, str: 'Peter, Björn\n&\nJoh', cursor: 11 },
	{ key: 'ArrowRight', time: 7010, str: 'Peter, Björn\n&\nJoh', cursor: 12 },
	{ key: 'ArrowRight', time: 7210, str: 'Peter, Björn\n&\nJoh', cursor: 13 },
	{ key: 'ArrowRight', time: 7410, str: 'Peter, Björn\n&\nJoh', cursor: 14 },
	{ key: 'ArrowRight', time: 7610, str: 'Peter, Björn\n&\nJoh', cursor: 15 },
	{ key: 'ArrowRight', time: 7810, str: 'Peter, Björn\n&\nJoh', cursor: 16 },
	{ key: 'ArrowRight', time: 8010, str: 'Peter, Björn\n&\nJoh', cursor: 17 },
	{
		key: 'Backspace',
		time: 8510,
		str: 'Peter, Björn\n&\nJo',
		cursor: 17,
	},
	{
		key: 'Backspace',
		time: 8710,
		str: 'Peter, Björn\n&\nJ',
		cursor: 16,
	},
	{
		key: 'Backspace',
		time: 8910,
		str: 'Peter, Björn\n&\n',
		cursor: 15,
	},
	{
		key: 'M',
		time: 9310,
		str: 'Peter, Björn\n&\nM',
		cursor: 16,
	},
	{
		key: 'a',
		time: 9510,
		str: 'Peter, Björn\n&\nMa',
		cursor: 17,
	},
	{
		key: 't',
		time: 9710,
		str: 'Peter, Björn\n&\nMat',
		cursor: 18,
	},
	{
		key: 't',
		time: 9910,
		str: 'Peter, Björn\n&\nMatt',
		cursor: 19,
	},
	{
		key: 'i',
		time: 10110,
		str: 'Peter, Björn\n&\nMatti',
		cursor: 20,
	},
	{
		key: 'a',
		time: 10310,
		str: 'Peter, Björn\n&\nMattia',
		cursor: 21,
	},
	{
		key: 's',
		time: 10510,
		str: 'Peter, Björn\n&\nMattias',
		cursor: 22,
	},
];
