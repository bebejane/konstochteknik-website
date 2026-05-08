import { apiQuery } from 'next-dato-utils/api';
import { AllProjectsDocument, ProjectDocument } from '@/graphql';
import { notFound } from 'next/navigation';
import { DraftMode } from 'next-dato-utils/components';
import Home from '../../page';

export type ProjectPageProps = {
	params: Promise<{ project: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { project: slug }: { project: string } = await params;

	const { project, draftUrl } = await apiQuery(ProjectDocument, {
		variables: { slug },
	});

	if (!project) return notFound();

	return (
		<>
			<Home index={project.position} />
			<DraftMode url={draftUrl} path={`/projects/${slug}`} />
		</>
	);
}

export async function generateStaticParams() {
	const { allProjects } = await apiQuery(AllProjectsDocument, {
		all: true,
	});
	return allProjects.map(({ slug: project }) => ({ project }));
}
