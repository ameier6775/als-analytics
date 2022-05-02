import { useRouter } from 'next/router';
import useSWR from 'swr';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Team() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/mlb/teams/${id}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <h1 className="font-mono ">
        {data.market} {data.name}
      </h1>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data.splits.hitting.overall[0].venue}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ab" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="h" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
