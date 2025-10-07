import { apiQuery } from 'next-dato-utils/api';
import { AllProjectsDocument } from '@/graphql';
import { DraftMode } from 'next-dato-utils/components';
import Gallery from '@/components/Gallery';
import Thumbnails from '@/components/Thumbnails';

export default async function Home() {
	const { allProjects, draftUrl } = await apiQuery<AllProjectsQuery>(AllProjectsDocument, { all: true });

	return (
		<>
			<Gallery allProjects={allProjects} />
			<Thumbnails allProjects={allProjects} />
			<DraftMode url={draftUrl} path='/' />
		</>
	);
}
