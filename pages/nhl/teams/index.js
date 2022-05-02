/* eslint-disable react/jsx-key */
import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import TeamCard from '../../../components/nhl/TeamCard';

const fetcher = (url) => fetch(url).then((res) => res.json());

// const COLORS = ['#FFADAD', '#CAFFBF', '#BDB2FF', '#FFD6A5', '#9BF6FF', '#FFC6FF', '#FDFFB6', '#A0C4FF', '#FFFFFC'];
// const ZONECOLORS = ['#fe2712', '#ff7e00', '#ffbe00'];
// const COMPARISONCOLORS = ['#ff1b6b', '#45caff'];

export default function Teams() {
  const { data, error } = useSWR('../api/nhl/teams/', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const teamData = data.dataMoneyPuck.filter((team) => team.situation === 'all');

  var teamCardArray = [];
  for (let i = 0; i < teamData.length; i++) {
    teamCardArray.push(teamData[i]);
  }

  {
    teamCardArray
      ? teamCardArray.forEach((team) => {
          team.value = team.name;
          team.label = team.name;
        })
      : teams;
  }

  return (
    <>
      <TeamCard teams={teamCardArray}></TeamCard>
    </>
  );
}
