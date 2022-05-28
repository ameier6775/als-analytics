import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { resolve } from 'path';
import { useReducer, useState } from 'react';

const Home: NextPage = () => {
  const leagues = [
    { id: 1, name: 'Major League Baseball', abbreviation: 'mlb' },
    { id: 2, name: 'National Football League', abbreviation: 'nfl' },
    { id: 3, name: 'National Hockey League', abbreviation: 'nhl' },
  ];

  var playerArr = [];

  // function onSubmit() {
  //   axios
  //     .post('./api/nhl/teams', { name: 'Jordan Kyrou' })
  //     .then((response) => {
  //       playerArr.push(response);
  //       console.log(response);
  //     })
  //     .catch((e) => {
  //       console.log('e: ' + e);
  //     });
  // }

  return (
    <>
      <h1 className="font-mono homeHeader">Browse Leagues</h1>
      {/* <button onClick={(e) => onSubmit()}> Send post</button> */}

      {leagues.map((league) => (
        <div key={league.id} className="leagues">
          <div className="leaguesHeader">
            <Link passHref={true} href={`/${league.abbreviation}`}>
              <h2 className="font-mono">
                {league.name}
                {' ('}
                {league.abbreviation.toUpperCase()}
                {') '}
              </h2>
            </Link>
          </div>
          <div className="leaguesSubHeader">
            <Link passHref={true} href={`/${league.abbreviation}/teams`}>
              Teams
            </Link>
          </div>
          <div className="leaguesSubHeader">
            <Link passHref={true} href={`/${league.abbreviation}/players`}>
              Players
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
export default Home;
