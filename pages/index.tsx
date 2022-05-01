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
      <h1 className="font-mono homeHeader">Browse Leagues</h1>
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
