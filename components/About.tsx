'use client';

import s from './About.module.scss';
import cn from 'classnames';
import { Markdown } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import Link from 'next/link';
import { useShallow, useStore } from '@/lib/store';
import { useEffect } from 'react';

type AboutProps = AboutQuery & {
	modal?: boolean;
};

export default function About({ about, allCommisioners, modal = true }: AboutProps) {
	const [showAbout, setShowAbout] = useStore(
		useShallow((state) => [state.showAbout, state.setShowAbout]),
	);

	useEffect(() => {
		const main = document.querySelector('main');
		main.classList.toggle('hide', showAbout);
	}, [showAbout]);

	return (
		<div id='about' className={cn(s.about, (showAbout || !modal) && s.show)}>
			<Image data={about.image?.responsiveImage} objectFit='cover' />
			<div className={s.content}>
				<Markdown content={about.intro} />
				<h2>Or reach out to one of us directly</h2>
				<ul className={s.contact}>
					<li>
						Mattias Jakobsson
						<br />
						<a href='mailto:mattias@konst-teknik.se'>
							<em>mattias@konst-teknik.se</em>
						</a>
						<br />
						+46 702 644 238

					</li>
					<li>
						<a href='http://www.haraldpeter.se' target='_blank'>
							Peter Ström
						</a>
						<br />
						<a href='mailto:peter@konst-teknik.se'>
							<em>peter@konst-teknik.se</em>
						</a>
						<br />
						+46 706 531 175
					</li>
					<li>
						<a href='http://www.haraldpeter.se' target='_blank'>
							Björn Berglund
						</a>
						<br />
						<a href='mailto:peter@konst-teknik.se'>
							<em>bjorn@konst-teknik.se</em>
						</a>
						<br />
						+46 706 531 175

					</li>
				</ul>
				<p>
					Visitors and post are welcome to Konst & Teknik, <a href='http://www.rutgerfuchsgatan9.se' target='_blank' rel='noreferrer'>Rutger Fuchsgatan 9
					</a>
					, 11667 Stockholm, Sweden
				</p>
				<h2 className={s.headcom}>A selection of our commissioners</h2>
				<ul className={s.commissioners}>
					{allCommisioners?.map((commisioner, i) => (
						<li key={i}>{commisioner.name}</li>
					))}
				</ul>

				<div className={s.internships}><i>Interships</i> We do unfortunately not offer any internships. </div>
			</div>
			<Link
				href='/'
				className={s.close}
				replace={true}
				onClick={(e) => {
					if (!modal) return;
					e.preventDefault();
					setShowAbout(false);
				}}
			>
				<button>Close</button>
			</Link>
		</div>
	);
}
