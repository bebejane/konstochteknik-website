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
	const [project, showAbout, setShowAbout, category, setCategory, setProject, setH2Override] = useStore(
		useShallow((s) => [s.project, s.showAbout, s.setShowAbout, s.category, s.setCategory, s.setProject, s.setH2Override])
	);
	const color = showAbout ? 'var(--white)' : project?.color?.hex;

	function toggle(e: React.MouseEvent<HTMLButtonElement>) {
		const c =
			e.currentTarget.dataset.id === category ? undefined : (e.currentTarget.dataset.id as 'art' | 'tech' | undefined);
		setCategory(c);
		setProject(null);
	}

	return (
		<nav style={{ color }} className={cn(s.navbar)}>
			{/* [Added by assistant] Hover on Konst/Teknik temporarily overrides Gallery h2 text; mouse out restores original. */}
			<section className={s.logo}>
				<button
					onClick={toggle}
					data-enabled={category === 'art'}
					data-id='art'
					onMouseEnter={() => setH2Override('Filter works on design and printed matter.')}
					onMouseLeave={() => setH2Override(null)}
				>
					Konst
				</button>
				<button
					className={s.and}
					onClick={toggle}
					data-enabled={!category ? true : false}
					onMouseEnter={() => setH2Override('Show all selected works.')}
					onMouseLeave={() => setH2Override(null)}
				>
					&
				</button>
				<button
					onClick={toggle}
					data-enabled={category === 'tech'}
					data-id='tech'
					onMouseEnter={() => setH2Override('Filter works by interactive projects')}
					onMouseLeave={() => setH2Override(null)}
				>
					Teknik
				</button>
			</section>
			<section><button>About</button></section>
		</nav>
	);
}
