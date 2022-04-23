/* eslint-disable react/jsx-key */
import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import StandingsCard from '../../components/nhl/StandingsCard';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Teams() {
  const { data, error } = useSWR(`/api/nhl/teams`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  var teamCardArray = [];
  for (let i = 0; i < data.dataMoneyPuck.length; i++) {
    teamCardArray.push(data.dataMoneyPuck[i]);
  }

  {
    teamCardArray
      ? teamCardArray.forEach((team) => {
          team.value = team.name;
          team.label = team.name;
        })
      : teams;
  }

  console.log(teamCardArray);

  return (
    <>
      {/* <div className="sideBySide">
        <h2 className="font-mono">{central.name}</h2>
        {data ? central.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>) : <p>Loading</p>}
      </div>

      <div className="sideBySide">
        <h2 className="font-mono">{pacific.name}</h2>
        {data ? pacific.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>) : <p>Loading</p>}
      </div>
      <div className="sideBySide">
        <h2 className="font-mono">{atlantic.name}</h2>
        {data ? (
          atlantic.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>)
        ) : (
          <p>Loading</p>
        )}
      </div>

      <div className="sideBySide">
        <h2 className="font-mono">{metro.name}</h2>
        {data ? metro.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>) : <p>Loading</p>}
      </div> */}
    </>
  );
}
