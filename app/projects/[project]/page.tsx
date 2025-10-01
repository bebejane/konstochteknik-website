import { apiQuery } from 'next-dato-utils/api';
import { AllProjectsDocument, ProjectDocument } from '@/graphql';
import { notFound } from 'next/navigation';
import Slide from '../../components/slides';
import { DraftMode } from 'next-dato-utils/components';

export default async function ProjectPage({ params }) {
	const { project: slug }: { project: string } = await params;
	const { project, draftUrl } = await apiQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, {
		variables: { slug },
	});

	if (!project) return notFound();

	return (
		<>
			<Slide project={project} single={true} />
			<DraftMode url={draftUrl} path={`/projects/${slug}`} />
		</>
	);
}

export async function generateStaticParams() {
	const { allProjects } = await apiQuery<AllProjectsQuery, AllProjectsQueryVariables>(AllProjectsDocument, {
		all: true,
		tags: ['project'],
	});
	return allProjects.map(({ slug: project }) => ({ project }));
}
