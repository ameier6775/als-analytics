/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import TeamCard from '../../../components/nhl/TeamCard';
import CompareTeamsCard from '../../../components/nhl/CompareTeams';
import nhlLogo from '../../../data/nhl/logo';

export default function Teams() {
  const [teams, setTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [comparisonTeams, setComparisonTeams] = useState(null);
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
  const animatedComponents = makeAnimated();
  const handleInputChange = (inputValue) => {
    setSelectedTeam(inputValue);
  };
  const handleSelectChange = (inputValue) => {
    setComparisonTeams(inputValue);
  };
  if (isLoading) return <p>Loading...</p>;
  if (!teams) return <p>No NHL teams data</p>;
  return (
    <div>
      <img className="teamLogo" height="100" src={nhlLogo.logo} />
      <h1>Teams</h1>
      <div className="categorySelect">
        <span className="selectSubHeader">Card:</span>
        <Select options={teams} onChange={handleInputChange} />
        {selectedTeam ? <TeamCard team={selectedTeam}></TeamCard> : <p></p>}
      </div>
      <div className="categorySelect">
        <span className="selectSubHeader">Compare:</span>
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
