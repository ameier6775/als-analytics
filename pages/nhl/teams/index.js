/* eslint-disable react/jsx-key */
import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import TeamCard from '../../../components/nhl/TeamCard';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Teams() {
  const { data, error } = useSWR('../api/nhl/teams/', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const teamData = data.dataMoneyPuck.filter((team) => team.situation === 'all');

  var teamCardArray = [];
  for (let i = 0; i < teamData.length; i++) {
    teamCardArray.push(teamData[i]);
  }

  // Adding fields to the array
  {
    teamCardArray
      ? teamCardArray.forEach((team) => {
          team.value = team.name;
          team.label = team.name;
          team.penaltyDifferential = team.penaltiesAgainst - team.penaltiesFor;
          team.faceoffPercentage = team.faceOffsWonFor / (team.faceOffsWonFor + team.faceOffsWonAgainst);
        })
      : teams;
  }

  return (
    <>
      <TeamCard teams={teamCardArray}></TeamCard>
    </>
  );
}
