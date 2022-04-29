/* eslint-disable react/jsx-key */
import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import TeamDropdown from '../../../components/nhl/TeamDropdown';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Teams() {
  const { data, error } = useSWR('../api/mlb/teams/', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data);
  //   const teamData = data.dataMoneyPuck.filter((team) => team.situation === 'all');

  //   var teamCardArray = [];
  //   for (let i = 0; i < teamData.length; i++) {
  //     teamCardArray.push(teamData[i]);
  //   }

  //   {
  //     teamCardArray
  //       ? teamCardArray.forEach((team) => {
  //           team.value = team.name;
  //           team.label = team.name;
  //         })
  //       : teams;
  //   }

  //   console.log(teamCardArray);

  return (
    <>
      <h1>HERE</h1>
      {/* <TeamDropdown teams={teamCardArray}></TeamDropdown> */}
    </>
  );
}
