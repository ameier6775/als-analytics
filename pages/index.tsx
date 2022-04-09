import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useReducer, useState } from 'react';

const Home: NextPage = () => {
  const leagues = [
    { id: 1, name: 'Major League Baseball', abbreviation: 'mlb' },
    { id: 2, name: 'National Football League', abbreviation: 'nfl' },
    { id: 3, name: 'National Hockey League', abbreviation: 'nhl' },
  ];
  return (
    <>
      <h1 className="font-mono">Browse Different Leagues</h1>
      {leagues.map((league) => (
        <div key={league.id} className="leagues">
          <Link passHref={true} href={`/${league.abbreviation}`}>
            <h2 className="font-mono">
              {league.name}
              {' ('}
              {league.abbreviation.toUpperCase()}
              {') '}
            </h2>
          </Link>

          <Link passHref={true} href={`/${league.abbreviation}/teams`}>
            <div className="leaguesHeader">Teams</div>
          </Link>
          <Link passHref={true} href={`/${league.abbreviation}/players`}>
            <div className="leaguesHeader">Players</div>
          </Link>
        </div>
      ))}
    </>
  );
};
export default Home;
