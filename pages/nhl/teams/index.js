/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import TeamCard from '../../../components/nhl/TeamCard';
import Select from 'react-select';

export default function Teams() {
  const [teams, setTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('../../api/nhl/teams')
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        setLoading(false);
      });
  }, []);

  var handleInputChange = (inputValue) => {
    setSelectedTeam(inputValue);
    // fetchTeam(inputValue.value);
  };

  // const fetchTeam = (team) => {
  //   fetch('../../api/nhl/teams', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       team: team,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

  if (isLoading) return <p>Loading...</p>;
  if (!teams) return <p>No teams data</p>;

  return (
    <div>
      <h1>Teams Page</h1>
      <Select options={teams} onChange={handleInputChange} />
      {selectedTeam ? <TeamCard team={selectedTeam}></TeamCard> : <p></p>}
    </div>
  );
}
