import { apiQuery } from 'next-dato-utils/api';
import { AboutDocument, AllCommisionersDocument } from '@graphql';
import { DraftMode } from 'next-dato-utils/components';
import About from '../components/About';

export default async function AboutPage() {

  const [{ about, draftUrl }, { allCommisioners }] = await Promise.all([
    apiQuery<AboutQuery>(AboutDocument),
    apiQuery<AllCommisionersQuery>(AllCommisionersDocument)
  ])

  return (
    <article>
      <About allCommisioners={allCommisioners} about={about} show={true} />
      <DraftMode url={draftUrl} />
    </article>
  )
}
