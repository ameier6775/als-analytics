/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import useSWR from 'swr';
import HitterCard from '../../../components/mlb/HitterCard';
import SPitcherCard from '../../../components/mlb/SPitcherCard';
import RPitcherCard from '../../../components/mlb/RPitcherCard';
import axios from 'axios';

export default function Players() {
  const [hitters, setHitters] = useState(null);
  const [selectedHitter, setSelectedHitter] = useState(null);
  const [starters, setStarters] = useState(null);
  const [selectedStarter, setSelectedStarter] = useState(null);
  const [relievers, setRelievers] = useState(null);
  const [selectedReliever, setSelectedReliever] = useState(null);
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
        console.log(data);
      });
  }, []);

  var handleHitterInputChange = (inputValue) => {
    setSelectedHitter(inputValue);
  };
  var handleStarterInputChange = (inputValue) => {
    setSelectedStarter(inputValue);
  };
  var handleRelieverInputChange = (inputValue) => {
    setSelectedReliever(inputValue);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!hitters) return <p>No players data</p>;

  return (
    <div>
      {/* <Select options={hitters} onChange={handleInputChange} /> */}
      <Select options={hitters} onChange={handleHitterInputChange} />
      {selectedHitter ? <HitterCard hitter={selectedHitter}></HitterCard> : <p></p>}
      <Select options={starters} onChange={handleStarterInputChange} />
      {selectedStarter ? <SPitcherCard pitcher={selectedStarter}></SPitcherCard> : <p></p>}
      <Select options={relievers} onChange={handleRelieverInputChange} />
      {selectedReliever ? <RPitcherCard pitcher={selectedReliever}></RPitcherCard> : <p></p>}
    </div>
  );
}
