import { apiQuery } from 'next-dato-utils/api';
import { AllProjectsDocument, ProjectByIdDocument } from '@/graphql';
import { notFound } from 'next/navigation';
import Slide from '@/components/slides';

export type ProjectPageProps = {
	params: Promise<{ id: string }>;
};

export const dynamic = 'force-dynamic';

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { id }: { id: string } = await params;
	const { project } = await apiQuery<ProjectByIdQuery, ProjectByIdQueryVariables>(ProjectByIdDocument, {
		variables: { id },
		revalidate: 0,
	});

	if (!project) return notFound();

	return <Slide project={project} single={true} clean={true} />;
}
