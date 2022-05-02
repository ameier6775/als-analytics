/* eslint-disable react/jsx-key */
import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import TeamCard from '../../../components/mlb/TeamCard';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Teams() {
  const { data, error } = useSWR('../api/mlb/teams/', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log(data);

  const hittingData = data.hittingData;

  return (
    <>
      <TeamCard teams={hittingData}></TeamCard>
    </>
  );
}
