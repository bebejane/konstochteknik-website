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
			const { key, time, str, cursor, duration } = typewriter[i];
			const last = typewriter[i - 1 > 0 ? i - 1 : 0].time;

			title.innerHTML = str
				.split('')
				.map(
					(c, i) =>
						`<span class="${c === '\n' ? s.break : ''}">${c}</span>` +
						(i === cursor - 1 ? `<span class="${s.cursor}"></span>` : ''),
				)
				.join('');
			await sleep(duration);
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
		const meta = ['Escape', 'Shift', 'Backspace', 'LeftArrow', 'RightArrow', 'Backspace', 'Meta'];
		let keys: { key: string; time: number; duration: number; str: string; cursor: number }[] = [];
		let str = '';
		let cursor = 0;
		let startTime = 0;

		function handleKeyDown(e: KeyboardEvent) {
			if (startTime === 0) startTime = Date.now();
			const title = document.getElementById('title');
			const time = Date.now() - startTime;
			const lastTime = keys.length > 0 ? keys[keys.length - 1].time : 0;
			const duration = time - lastTime;
			if (e.key === 'Escape') {
				console.log(keys);
				keys = [];
				str = '';
				cursor = 0;
				startTime = 0;
				title.innerHTML = '';
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
				keys.push({ key: e.key, time, str, cursor, duration });
			}

			title.innerHTML = str;
			//title.innerHTML = `<span class="${s.cursor}"></span>`;
			//console.log(str.slice(0, cursor) + '|' + str.slice(cursor));
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
		time: 128,
		str: 'P',
		cursor: 1,
		duration: 128,
	},
	{
		key: 'e',
		time: 239,
		str: 'Pe',
		cursor: 2,
		duration: 111,
	},
	{
		key: 't',
		time: 403,
		str: 'Pet',
		cursor: 3,
		duration: 164,
	},
	{
		key: 'e',
		time: 540,
		str: 'Pete',
		cursor: 4,
		duration: 137,
	},
	{
		key: 'r',
		time: 609,
		str: 'Peter',
		cursor: 5,
		duration: 69,
	},
	{
		key: ',',
		time: 772,
		str: 'Peter,',
		cursor: 6,
		duration: 163,
	},
	{
		key: ' ',
		time: 844,
		str: 'Peter, ',
		cursor: 7,
		duration: 72,
	},
	{
		key: 'B',
		time: 1155,
		str: 'Peter, B',
		cursor: 8,
		duration: 311,
	},
	{
		key: 'j',
		time: 1333,
		str: 'Peter, Bj',
		cursor: 9,
		duration: 178,
	},
	{
		key: 'o',
		time: 1619,
		str: 'Peter, Bjo',
		cursor: 10,
		duration: 286,
	},
	{
		key: 'Backspace',
		time: 2283,
		str: 'Peter, Bj',
		cursor: 9,
		duration: 364,
	},
	{
		key: 'ö',
		time: 2829,
		str: 'Peter, Bjö',
		cursor: 10,
		duration: 346,
	},
	{
		key: 'r',
		time: 3869,
		str: 'Peter, Björ',
		cursor: 11,
		duration: 540,
	},
	{
		key: 'n',
		time: 3942,
		str: 'Peter, Björn',
		cursor: 12,
		duration: 73,
	},
	{
		key: 'Enter',
		time: 4459,
		str: 'Peter, Björn\n',
		cursor: 13,
		duration: 317,
	},
	{
		key: '&',
		time: 5001,
		str: 'Peter, Björn\n&',
		cursor: 14,
		duration: 342,
	},
	{
		key: 'Enter',
		time: 5252,
		str: 'Peter, Björn\n&\n',
		cursor: 15,
		duration: 251,
	},
	{
		key: 'J',
		time: 5937,
		str: 'Peter, Björn\n&\nJ',
		cursor: 16,
		duration: 285,
	},
	{
		key: 'o',
		time: 6251,
		str: 'Peter, Björn\n&\nJo',
		cursor: 17,
		duration: 314,
	},
	{
		key: 'h',
		time: 6576,
		str: 'Peter, Björn\n&\nJoh',
		cursor: 18,
		duration: 325,
	},
	{
		key: 'Backspace',
		time: 7156,
		str: 'Peter, Björn\n&\nJo',
		cursor: 17,
		duration: 380,
	},
	{
		key: 'Backspace',
		time: 7321,
		str: 'Peter, Björn\n&\nJ',
		cursor: 16,
		duration: 165,
	},
	{
		key: 'Backspace',
		time: 7480,
		str: 'Peter, Björn\n&\n',
		cursor: 15,
		duration: 159,
	},
	{
		key: 'M',
		time: 7904,
		str: 'Peter, Björn\n&\nM',
		cursor: 16,
		duration: 424,
	},
	{
		key: 'a',
		time: 8068,
		str: 'Peter, Björn\n&\nMa',
		cursor: 17,
		duration: 164,
	},
	{
		key: 't',
		time: 8255,
		str: 'Peter, Björn\n&\nMat',
		cursor: 18,
		duration: 187,
	},
	{
		key: 't',
		time: 8422,
		str: 'Peter, Björn\n&\nMatt',
		cursor: 19,
		duration: 167,
	},
	{
		key: 'i',
		time: 8564,
		str: 'Peter, Björn\n&\nMatti',
		cursor: 20,
		duration: 142,
	},
	{
		key: 'a',
		time: 8699,
		str: 'Peter, Björn\n&\nMattia',
		cursor: 21,
		duration: 135,
	},
	{
		key: 's',
		time: 8844,
		str: 'Peter, Björn\n&\nMattias',
		cursor: 22,
		duration: 145,
	},
];
