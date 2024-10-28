import { apiQuery } from 'next-dato-utils/api';
import { AllCommisionersDocument, AllProjectsDocument, AboutDocument } from '@graphql';
import Gallery from './components/Gallery';

export default async function Home() {

  const [{ allCommisioners }, { allProjects }, { about }] = await Promise.all([
    apiQuery<AllCommisionersQuery>(AllCommisionersDocument),
    apiQuery<AllProjectsQuery>(AllProjectsDocument),
    apiQuery<AboutQuery>(AboutDocument)
  ])

  return (
    <>
      <article>
        <Gallery allProjects={allProjects} />
      </article>
    </>
  )
}