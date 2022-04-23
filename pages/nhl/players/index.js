/* eslint-disable react/jsx-key */
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import PlayerDropdown from '../../../components/nhl/PlayerDropdown';
import {
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  BarChart,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
  Area,
  ComposedChart,
  ReferenceLine,
  Label,
  Scatter,
  Brush,
  ZAxis,
  ScatterChart,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import Select from 'react-select';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Players() {
  const { data, error } = useSWR(`/api/nhl/players`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data.dataMoneyPuck);

  const allSituationsComposedChart = data.dataMoneyPuck.filter((player) => player.situation === 'all');
  const allSituationsBarChart = data.dataMoneyPuck.filter((player) => player.situation === 'all');
  const allSituationsScatterChart = data.dataMoneyPuck.filter((player) => player.situation === 'all');
  const allSituationsPlayerCard = data.dataMoneyPuck.filter((player) => player.situation === 'all');

  allSituationsComposedChart.sort(function (a, b) {
    var keyA = a.OnIce_F_goals;
    var keyB = b.OnIce_F_goals;
    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
  });
  allSituationsBarChart.sort(function (a, b) {
    var keyA = a.OnIce_F_goals - a.OnIce_A_goals;
    var keyB = b.OnIce_F_goals - b.OnIce_A_goals;
    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
  });

  const composedChartArray = [];
  const barChartArray = [];
  const scatterChartArray = [];
  const playerCardArray = [];
  for (let i = 0; i < allSituationsComposedChart.length; i++) {
    composedChartArray.push(allSituationsComposedChart[i]);
    barChartArray.push(allSituationsBarChart[i]);
    scatterChartArray.push(allSituationsScatterChart[i]);
    playerCardArray.push(allSituationsPlayerCard[i]);
  }

  // Assigning new values
  {
    barChartArray
      ? barChartArray.forEach((player) => {
          player.actualOnIceGoalsAgainst = -player.OnIce_A_goals;
        })
      : teams;
  }
  {
    scatterChartArray
      ? scatterChartArray.forEach((player) => {
          player.expectedGoalDifferential = Math.round(player.OnIce_F_xGoals) - Math.round(player.OnIce_A_xGoals);
        })
      : teams;
  }
  {
    playerCardArray
      ? playerCardArray.forEach((player) => {
          player.value = player.name;
          player.label = player.name;
        })
      : teams;
  }

  barChartArray.sort(function (a, b) {
    var keyA = a.OnIce_F_goals - a.OnIce_A_goals;
    var keyB = b.OnIce_F_goals - b.OnIce_A_goals;

    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
  });

  if (data) {
    return (
      <>
        <PlayerDropdown players={playerCardArray}></PlayerDropdown>
        {/* <div className="fullWidth">
          <ScatterChart
            width={1735}
            height={700}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="category" dataKey="name" name="player" tick={false} />
            <YAxis type="number" dataKey="expectedGoalDifferential" name="on-ice expected" unit="g" />
            <ZAxis type="number" dataKey="icetime" name="seconds" range={[1, 80]} unit="s" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="All Situations" data={scatterChartArray} fill="#8884d8" shape="star" />
          </ScatterChart>
          <h2>All Situations</h2>
          <h3>On Ice (+Goals For - Goals Against)</h3>
          <BarChart
            width={1735}
            height={700}
            data={barChartArray}
            stackOffset="sign"
            margin={{
              top: 15,
              right: 35,
              left: 0,
              bottom: 15,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="category" dataKey="name" tick={false} />
            <YAxis type="number" name="goals" />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Brush dataKey="OnIce_F_goals" height={30} stroke="#8884d8" />
            <Bar dataKey="OnIce_F_goals" fill="#8884d8" stackId="stack"></Bar>
            <Bar dataKey="actualOnIceGoalsAgainst" fill="#82ca9d" stackId="stack" />
          </BarChart>
        </div> */}
      </>
    );
  } else {
    return (
      <>
        <h1>Players Analytics Page Failed</h1>
      </>
    );
  }
}
