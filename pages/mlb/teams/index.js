/* eslint-disable react/jsx-key */
import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import TeamCard from '../../../components/mlb/TeamCard';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Teams() {
  const { data, error } = useSWR('../api/mlb/teams/', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data);
  const teamData = data.data;

  var teamCardArray = [];
  for (let i = 0; i < teamData.length; i++) {
    teamCardArray.push(teamData[i]);
  }

  {
    teamCardArray
      ? teamCardArray.forEach((team) => {
          team.value = team.Team;
          team.label = team.Team;
        })
      : teams;
  }

  console.log(teamCardArray);

  return (
    <>
      <TeamCard teams={teamCardArray}></TeamCard>
    </>
  );
}
