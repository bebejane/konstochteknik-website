import { apiQuery } from 'next-dato-utils/api';
import { AllProjectsDocument } from '@/graphql';
import { DraftMode } from 'next-dato-utils/components';
import Gallery from './components/Gallery';

export default async function Home() {
	const { allProjects, draftUrl } = await apiQuery<AllProjectsQuery>(AllProjectsDocument);

	return (
		<>
			<Gallery allProjects={allProjects} />
			<DraftMode url={draftUrl} path='/' />
		</>
	);
}
