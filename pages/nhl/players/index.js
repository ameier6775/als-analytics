/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from 'react';
import PlayerCard from '../../../components/nhl/PlayerCard';
import axios from 'axios';
import ComparePlayersCard from '../../../components/nhl/ComparePlayers';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function Players() {
  const [players, setPlayers] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [comparisonPlayers, setComparisonPlayers] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch('../../api/nhl/players')
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      });
  }, []);
  const animatedComponents = makeAnimated();
  var handleInputChange = (inputValue) => {
    console.log(inputValue);
    setSelectedPlayer(inputValue);
    // fetchPlayer(inputValue.value);
  };
  const handleSelectChange = (inputValue) => {
    setComparisonPlayers(inputValue);
  };
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
  if (isLoading) return <p>Loading...</p>;
  if (!players) return <p>No NHL players data</p>;
  return (
    <div>
      <div className="categorySelect">
        <h1>NHL Players</h1>
        <span className="selectSubHeader">Choose Player:</span>
        <Select options={players} onChange={handleInputChange} />
        {selectedPlayer ? <PlayerCard player={selectedPlayer}></PlayerCard> : <p></p>}
      </div>
      <div className="categorySelect">
        <span className="selectSubHeader">Compare Players:</span>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          onChange={handleSelectChange}
          isMulti
          name="colors"
          options={players}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {comparisonPlayers && comparisonPlayers.length >= 2 ? (
          <ComparePlayersCard comparisonPlayers={comparisonPlayers}></ComparePlayersCard>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
