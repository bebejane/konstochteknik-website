import { apiQuery } from 'next-dato-utils/api';
import { AllProjectsDocument } from '@/graphql';
import { DraftMode } from 'next-dato-utils/components';
import Gallery from '@/components/Gallery';
import Thumbnails from '@/components/Thumbnails';

export default async function Home({ index = 0 }: { index?: number }) {
	const { allProjects, draftUrl } = await apiQuery(AllProjectsDocument, { all: true });

	return (
		<>
			<Gallery allProjects={allProjects} index={index} />
			<Thumbnails allProjects={allProjects} index={index} />
			<DraftMode url={draftUrl} path='/' />
		</>
	);
}
