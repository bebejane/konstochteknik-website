import { apiQuery } from 'next-dato-utils/api';
import { AllProjectsDocument, ProjectByIdDocument } from '@/graphql';
import { notFound } from 'next/navigation';
import Slide from '@/components/slides';

export type ProjectPageProps = {
	params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { id }: { id: string } = await params;
	console.log(id);
	const { project } = await apiQuery<ProjectByIdQuery, ProjectByIdQueryVariables>(ProjectByIdDocument, {
		variables: { id },
	});

	if (!project) return notFound();

	return <Slide project={project} single={true} clean={true} />;
}

export async function generateStaticParams() {
	const { allProjects } = await apiQuery<AllProjectsQuery, AllProjectsQueryVariables>(AllProjectsDocument, {
		all: true,
		tags: ['project'],
	});
	return allProjects.map(({ id }) => ({ id }));
}
