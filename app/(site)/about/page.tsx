import s from './page.module.scss';
import cn from 'classnames';
import { apiQuery } from 'next-dato-utils/api';
import { AboutDocument, AllCommisionersDocument } from '@/graphql';
import { DraftMode, Markdown } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import { CloseButton } from './CloseButton';

export default async function About(props: PageProps<'/about'>) {
	const [{ about, draftUrl }, { allCommisioners }] = await Promise.all([
		apiQuery<AboutQuery>(AboutDocument),
		apiQuery<AllCommisionersQuery>(AllCommisionersDocument),
	]);

	return (
		<>
			<div id='about' className={cn(s.about, s.show)}>
				<Image data={about.image?.responsiveImage} objectFit='cover' />
				<div className={s.content}>
					<Markdown content={about.intro} />
					<p>Or reach out to one of us directly:</p>
					<p>
						Mattias Jakobsson
						<br />
						<a href='mailto:mattias@konst-teknik.se'>
							<em>mattias@konst-teknik.se</em>
						</a>
						<br />
						+46 702 644 238
					</p>
					<p>
						<a href='http://www.haraldpeter.se' target='_blank'>
							Peter Ström
						</a>
						<br />
						<a href='mailto:peter@konst-teknik.se'>
							<em>peter@kon.st</em>
						</a>
						<br />
						+46 706 531 175
					</p>
					<p>
						Visitors and post are welcome to Konst & Teknik,
						<a href='http://www.rutgerfuchsgatan9.se' target='_blank' rel='noreferrer'>
							Rutger Fuchsgatan 9
						</a>
						, 11667 Stockholm, Sweden
					</p>
					<h3>A selection of our commissioners</h3>
					<ul>
						{allCommisioners?.map((commisioner, i) => (
							<li key={i}>{commisioner.name}</li>
						))}
					</ul>
				</div>
				<CloseButton />
			</div>
			<DraftMode url={draftUrl} path={`/about`} />
		</>
	);
}
