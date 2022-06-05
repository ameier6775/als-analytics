/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import HitterCard from '../../../components/mlb/HitterCard';
import CompareHittersCard from '../../../components/mlb/CompareHitters';
import SPitcherCard from '../../../components/mlb/SPitcherCard';
import CompareStartersCard from '../../../components/mlb/CompareSPitchers';
import RPitcherCard from '../../../components/mlb/RPitcherCard';
import CompareRelieversCard from '../../../components/mlb/CompareRPitchers';

export default function Players() {
  const [hitters, setHitters] = useState(null);
  const [selectedHitter, setSelectedHitter] = useState(null);
  const [comparisonHitters, setComparisonHitters] = useState(null);
  const [starters, setStarters] = useState(null);
  const [selectedStarter, setSelectedStarter] = useState(null);
  const [comparisonStarters, setComparisonStarters] = useState(null);
  const [relievers, setRelievers] = useState(null);
  const [selectedReliever, setSelectedReliever] = useState(null);
  const [comparisonRelievers, setComparisonRelievers] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch('../../api/mlb/players')
      .then((res) => res.json())
      .then((data) => {
        setHitters(data[0]);
        setStarters(data[1]);
        setRelievers(data[2]);
        setLoading(false);
      });
  }, []);
  const animatedComponents = makeAnimated();
  // Hitters
  const handleHitterInputChange = (inputValue) => {
    setSelectedHitter(inputValue);
  };
  const handleSelectHitterChange = (inputValue) => {
    setComparisonHitters(inputValue);
  };
  // Starters
  const handleStarterInputChange = (inputValue) => {
    setSelectedStarter(inputValue);
  };
  const handleSelectStarterChange = (inputValue) => {
    setComparisonStarters(inputValue);
  };
  // Relievers
  var handleRelieverInputChange = (inputValue) => {
    setSelectedReliever(inputValue);
  };
  const handleSelectRelieverChange = (inputValue) => {
    setComparisonRelievers(inputValue);
  };
  console.log(comparisonHitters);
  if (isLoading) return <p>Loading...</p>;
  if (!hitters) return <p>No MLB players data</p>;
  return (
    <div>
      <h1>MLB Players</h1>
      <div className="categorySelect">
        <span className="selectSubHeader">Choose Hitter:</span>
        <Select options={hitters} onChange={handleHitterInputChange} />
        {selectedHitter ? <HitterCard hitter={selectedHitter}></HitterCard> : <p></p>}
      </div>
      <div className="categorySelect">
        <span className="selectSubHeader">Compare Hitters:</span>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          onChange={handleSelectHitterChange}
          isMulti
          name="colors"
          options={hitters}
          className="basic-multi-select"
          classNamePrefix="select"
        />

        {comparisonHitters && comparisonHitters.length >= 2 ? (
          <CompareHittersCard comparisonHitters={comparisonHitters}></CompareHittersCard>
        ) : (
          <p></p>
        )}
      </div>
      <div className="categorySelect">
        <span className="selectSubHeader">Choose Starter:</span>
        <Select options={starters} onChange={handleStarterInputChange} />
        {selectedStarter ? <SPitcherCard pitcher={selectedStarter}></SPitcherCard> : <p></p>}
      </div>
      <div className="categorySelect">
        <span className="selectSubHeader">Compare Starters:</span>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          onChange={handleSelectStarterChange}
          isMulti
          name="colors"
          options={starters}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {comparisonStarters && comparisonStarters.length >= 2 ? (
          <CompareStartersCard comparisonStarters={comparisonStarters}></CompareStartersCard>
        ) : (
          <p></p>
        )}
      </div>
      <div className="categorySelect">
        <span className="selectSubHeader">Choose Reliever:</span>
        <Select options={relievers} onChange={handleRelieverInputChange} />
        {selectedReliever ? <RPitcherCard pitcher={selectedReliever}></RPitcherCard> : <p></p>}
      </div>
      <div className="categorySelect">
        <span className="selectSubHeader">Compare Relievers:</span>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          onChange={handleSelectRelieverChange}
          isMulti
          name="colors"
          options={relievers}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {comparisonRelievers && comparisonRelievers.length >= 2 ? (
          <CompareRelieversCard comparisonRelievers={comparisonRelievers}></CompareRelieversCard>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
