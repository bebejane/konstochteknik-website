import { apiQuery } from 'next-dato-utils/api';
import { AboutDocument } from '@/graphql';
import { DraftMode } from 'next-dato-utils/components';
import About from '@/components/About';

export default async function AboutPage(props: PageProps<'/about'>) {
	const { about, allCommisioners, draftUrl } = await apiQuery(AboutDocument);

	return (
		<>
			<About about={about} allCommisioners={allCommisioners} modal={false} />
			<DraftMode url={draftUrl} path={`/about`} />
		</>
	);
}
