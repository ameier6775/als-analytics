/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import PlayerCard from '../../../components/nhl/PlayerCard';
import Select from 'react-select';
import axios from 'axios';
import { data } from 'autoprefixer';

export default function Players() {
  const [players, setPlayers] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
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
  var handleInputChange = (inputValue) => {
    console.log(inputValue);
    setSelectedPlayer(inputValue);
    // fetchPlayer(inputValue.value);
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
      <h1>NHL Players</h1>
      <Select options={players} onChange={handleInputChange} />
      {selectedPlayer ? <PlayerCard player={selectedPlayer}></PlayerCard> : <p></p>}
    </div>
  );
}
