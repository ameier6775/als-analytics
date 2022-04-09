/* eslint-disable */
import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import Excel from 'exceljs';
import StandingsCard from '../../components/mlb/StandingsCard';
import { groupBy, keyBy, omit, pick } from 'lodash';
import path from 'path';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function mlb() {
  const { data, error } = useSWR(`/api/mlb`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const nlwest = data.league.season.leagues[0].divisions[0];
  const nlcentral = data.league.season.leagues[0].divisions[1];
  const nleast = data.league.season.leagues[0].divisions[2];
  const alwest = data.league.season.leagues[1].divisions[0];
  const alcentral = data.league.season.leagues[1].divisions[1];
  const aleast = data.league.season.leagues[1].divisions[2];

  console.log(data);

  return (
    <>
      <div className="sideBySide">
        <h2 className="font-mono">NL West</h2>
        {data ? nlwest.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>) : <p>Loading</p>}
      </div>
      <div className="sideBySide">
        <h2 className="font-mono">NL Central</h2>
        {data ? (
          nlcentral.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>)
        ) : (
          <p>Loading</p>
        )}
      </div>
      <div className="sideBySide">
        <h2 className="font-mono">NL East</h2>
        {data ? nleast.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>) : <p>Loading</p>}
      </div>
      <div className="sideBySide">
        <h2 className="font-mono">AL West</h2>
        {data ? alwest.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>) : <p>Loading</p>}
      </div>
      <div className="sideBySide">
        <h2 className="font-mono">AL Central</h2>
        {data ? (
          alcentral.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>)
        ) : (
          <p>Loading</p>
        )}
      </div>
      <div className="sideBySide">
        <h2 className="font-mono">AL East</h2>
        {data ? aleast.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>) : <p>Loading</p>}
      </div>
    </>
  );
}
