import { apiQuery } from 'next-dato-utils/api';
import { ProjectDocument } from '@graphql';
import { notFound } from 'next/navigation';
import Slide from '../../components/slides';
import { DraftMode } from 'next-dato-utils/components';

export default async function ProjectPage({ params }) {

  const { project: slug }: { project: string } = await params
  const { project, draftUrl } = await apiQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, { variables: { slug } });

  if (!project) return notFound()

  return (
    <>
      <Slide project={project} />
      <DraftMode url={draftUrl} path={`/projects/${slug}`} />
    </>
  )
}