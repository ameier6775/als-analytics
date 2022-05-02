import { useRouter } from 'next/router';
import useSWR from 'swr';
import TeamTable from '../../../components/TeamTable';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Team() {
  const router = useRouter();
  const teamId = router.asPath.replace('/teams/', '');

  const { data, error } = useSWR(`/api/nhl/teams/${teamId}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <h1 className="font-mono ">
        {data.market} {data.name}
      </h1>
      <TeamTable team={data}></TeamTable>
    </>
  );
}
