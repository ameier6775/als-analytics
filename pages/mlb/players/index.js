/* eslint-disable react/jsx-key */
import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import HitterCard from '../../../components/mlb/HitterCard';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Teams() {
  const { data, error } = useSWR('../api/mlb/players/', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log(data.data);

  return (
    <>
      <HitterCard players={data.data}></HitterCard>
    </>
  );
}