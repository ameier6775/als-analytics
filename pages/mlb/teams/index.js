/* eslint-disable react/jsx-key */
import TeamCard from '../../../components/mlb/TeamCard';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import axios from 'axios';
import { data } from 'autoprefixer';

export default function Teams() {
  const [teams, setTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('../../api/mlb/teams')
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        setLoading(false);
      });
  }, []);

  var handleInputChange = (inputValue) => {
    setSelectedTeam(inputValue);
  };

  console.log(teams);

  if (isLoading) return <p>Loading...</p>;
  if (!teams) return <p>No teams data</p>;

  return (
    <div>
      <h1>MLB Teams</h1>
      <Select options={teams} onChange={handleInputChange} />
      {selectedTeam ? <TeamCard team={selectedTeam}></TeamCard> : <p></p>}
    </div>
  );
}
