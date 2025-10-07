'use client';

import Link from 'next/link';
import s from './Navbar.module.scss';
import cn from 'classnames';
import { useStore, useShallow } from '@/lib/store';
import About from './About';
import { useState } from 'react';

type Props = {
	allCommisioners: AllCommisionersQuery['allCommisioners'];
	about: AboutQuery['about'];
};

export default function Navbar({ about, allCommisioners }: Props) {
	const [selected, setSelected] = useState<'art' | 'tech' | 'and' | null>(null);
	const [project, showAbout, setShowAbout] = useStore(useShallow((s) => [s.project, s.showAbout, s.setShowAbout]));
	const color = showAbout ? 'var(--white)' : project?.color?.hex;

	function toggle(e: React.MouseEvent<HTMLButtonElement>) {
		setSelected(
			e.currentTarget.dataset.id === selected ? null : (e.currentTarget.dataset.id as 'art' | 'tech' | 'and')
		);
	}

	return (
		<>
			<nav style={{ color }} className={cn(s.navbar)}>
				<button onClick={toggle} data-enabled={selected === 'art'} data-id='art'>
					Konst
				</button>
				<button className={s.round} onClick={toggle} data-enabled={selected === 'and'} data-id='and'>
					&
				</button>
				<button onClick={toggle} data-enabled={selected === 'tech'} data-id='tech'>
					Teknik
				</button>
			</nav>
			{/*<About allCommisioners={allCommisioners} about={about} show={showAbout} modal={true} />*/}
		</>
	);
}
