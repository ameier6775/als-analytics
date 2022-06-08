/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from 'react';
import PlayerCard from '../../../components/nhl/PlayerCard';
import axios from 'axios';
import ComparePlayersCard from '../../../components/nhl/ComparePlayers';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import nhlLogo from '../../../data/nhl/logo';

export default function Players() {
  const [forwards, setForwards] = useState(null);
  const [defensemen, setDefensemen] = useState(null);
  const [selectedForward, setSelectedForward] = useState(null);
  const [selectedDefenseman, setSelectedDefenseman] = useState(null);
  const [comparisonForwards, setComparisonForwards] = useState(null);
  const [comparisonDefensemen, setComparisonDefensemen] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch('../../api/nhl/players')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setForwards(data[0]);
        setDefensemen(data[1]);
        setLoading(false);
      });
  }, []);
  // const fetchPlayer = (player) => {
  //   fetch('../../api/nhl/players', {
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
  const animatedComponents = makeAnimated();
  var handleForwardChange = (inputValue) => {
    setSelectedForward(inputValue);
    // fetchPlayer(inputValue.value);
  };
  var handleDefensemanChange = (inputValue) => {
    setSelectedDefenseman(inputValue);
  };
  const handleForwardSelectChange = (inputValue) => {
    setComparisonForwards(inputValue);
  };
  const handleDefensemanSelectChange = (inputValue) => {
    setComparisonDefensemen(inputValue);
  };
  if (isLoading) return <p>Loading...</p>;
  if (!forwards || !defensemen) return <p>No NHL players data</p>;
  return (
    <div>
      <img className="teamLogo" height="100" src={nhlLogo.logo} />
      <h1>Forwards</h1>
      <div className="categorySelect">
        <span className="selectSubHeader">Card:</span>
        <Select options={forwards} onChange={handleForwardChange} />
        {selectedForward ? <PlayerCard player={selectedForward}></PlayerCard> : <p></p>}
      </div>
      <div className="categorySelect">
        <span className="selectSubHeader">Compare:</span>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          onChange={handleForwardSelectChange}
          isMulti
          name="colors"
          options={forwards}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {comparisonForwards && comparisonForwards.length >= 2 ? (
          <ComparePlayersCard comparisonPlayers={comparisonForwards}></ComparePlayersCard>
        ) : (
          <p></p>
        )}
      </div>
      <h1>Defensemen</h1>
      <div className="categorySelect">
        <span className="selectSubHeader">Card:</span>
        <Select options={defensemen} onChange={handleDefensemanChange} />
        {selectedDefenseman ? <PlayerCard player={selectedDefenseman}></PlayerCard> : <p></p>}
      </div>
      <div className="categorySelect">
        <span className="selectSubHeader">Compare:</span>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          onChange={handleDefensemanSelectChange}
          isMulti
          name="colors"
          options={defensemen}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {comparisonDefensemen && comparisonDefensemen.length >= 2 ? (
          <ComparePlayersCard comparisonPlayers={comparisonDefensemen}></ComparePlayersCard>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
