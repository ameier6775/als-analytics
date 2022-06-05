/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import TeamCard from '../../../components/mlb/TeamCard';
import CompareTeamsCard from '../../../components/mlb/CompareTeams';

export default function Teams() {
  const [teams, setTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [comparisonTeams, setComparisonTeams] = useState(null);
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
  const animatedComponents = makeAnimated();
  const handleInputChange = (inputValue) => {
    setSelectedTeam(inputValue);
  };
  const handleSelectChange = (inputValue) => {
    console.log(inputValue);
    setComparisonTeams(inputValue);
  };
  if (isLoading) return <p>Loading...</p>;
  if (!teams) return <p>No MLB teams data</p>;
  return (
    <div>
      <h1>MLB Teams</h1>
      <div className="categorySelect">
        <span className="selectSubHeader">Choose Team:</span>
        <Select options={teams} onChange={handleInputChange} />
        {selectedTeam ? <TeamCard team={selectedTeam}></TeamCard> : <p></p>}
      </div>
      <div className="categorySelect">
        <span className="selectSubHeader">Compare Teams:</span>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          onChange={handleSelectChange}
          isMulti
          name="colors"
          options={teams}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {comparisonTeams && comparisonTeams.length >= 2 ? (
          <CompareTeamsCard comparisonTeams={comparisonTeams}></CompareTeamsCard>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
