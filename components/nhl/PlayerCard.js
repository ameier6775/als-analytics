import axios from 'axios';
import { useRef, useState } from 'react';
import Select from 'react-select';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  LineChart,
  Line,
  Legend,
  ReferenceLine,
} from 'recharts';
import teamLogos from '../../data/nhl/teams/2022/logos';

const PlayerCard = ({ player }) => {
  // Pronunciation of the ranking
  function getRank(rank) {
    let rankStr = rank.toString();
    let factor = rank % 10;
    if (rank >= 10 && rank <= 20) {
      rankStr += 'th';
    } else if (factor === 1) {
      rankStr += 'st';
    } else if (factor === 2) {
      rankStr += 'nd';
    } else if (factor === 3) {
      rankStr += 'rd';
    } else {
      rankStr += 'th';
    }
    return rankStr;
  }

  // Validation for fields
  function getGraphField(field) {
    let result = field === 0 || field < 0.1 ? 1 : (100 * field).toFixed();
    return result;
  }

  // Conversion to percentage
  function getRatePercentage(field) {
    let result = (field * 100).toFixed().toString() + '%';
    return result;
  }

  // Plotting chart data
  var offensiveGraphData = [
    {
      category: 'Points',
      score: getGraphField(player.pointsRate),
      fullMark: 100,
    },

    {
      category: '🧊 Goals For',
      score: getGraphField(player.onIceGoalsForRate),
      fullMark: 100,
    },
    {
      category: 'Expected Goals',
      score: getGraphField(player.xGoalsRate),
      fullMark: 100,
    },

    {
      category: '🧊 Shot Attempts',
      score: getGraphField(player.shotAttemptsRate),
      fullMark: 100,
    },
  ];
  var defensiveGraphData = [
    {
      category: 'Giveaways',
      score: getGraphField(player.giveawaysRate),
      fullMark: 100,
    },

    {
      category: '🧊 Goals Against',
      score: getGraphField(player.onIceGoalsAgainstRate),
      fullMark: 100,
    },
    {
      category: 'Expected Goals',
      score: getGraphField(player.xGoalsAgainstRate),
      fullMark: 100,
    },

    {
      category: '🧊 Shot Attempts',
      score: getGraphField(player.shotAttemptsAgainstRate),
      fullMark: 100,
    },
  ];

  // Team logo
  var logo = teamLogos.find((obj) => obj.team === player.team);

  return (
    <div id={player.name} className="playerCard">
      <h1>{player.name}</h1>
      <h2>{player.position}</h2>
      <img className="teamLogo" height="10" src={logo.logo} />
      <p>
        Goals :<div className="fieldRank">{getRank(player.goalsRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.goalsRate)}</span>
      </p>
      <p>
        Assists :<div className="fieldRank">{getRank(player.assistsRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.assistsRate)}</span>
      </p>
      <p>
        Points :<div className="fieldRank">{getRank(player.pointsRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.goalsRate)}</span>
      </p>
      <p>
        Expected Goals + :<div className="fieldRank">{getRank(player.xGoalsRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.xGoalsRate)}</span>
      </p>
      <p>
        🧊 Goals + :<div className="fieldRank">{getRank(player.onIceGoalsForRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.onIceGoalsForRate)}</span>
      </p>
      <p>
        🚨 Per 60 :<div className="fieldRank">{getRank(player.goalsPer60Rank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.goalsPer60Rate)}</span>
      </p>
      <p>
        🍏 Per 60 :<div className="fieldRank">{getRank(player.assistsPer60Rank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.assistsPer60Rate)}</span>
      </p>
      <p>
        🥅 Per 60 :<div className="fieldRank">{getRank(player.pointsPer60Rank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.pointsPer60Rate)}</span>
      </p>
      <p>
        Shot Attempts + :<div className="fieldRank">{getRank(player.shotAttemptsRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.shotAttemptsRate)}</span>
      </p>
      <p>
        O-Zone Starts :<div className="fieldRank">{getRank(player.oZoneStartRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.oZoneStartRate)}</span>
      </p>
      <div className="fullWidthChart">
        <h2 className="playerChart">Offense Per 60</h2>
        <LineChart
          width={1200}
          height={280}
          data={offensiveGraphData}
          margin={{
            top: 15,
            right: 10,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" stroke="white" />
          <YAxis stroke="white" />
          <ReferenceLine
            y={100}
            label={{ value: 'Best', angle: 0, position: 'top', fill: 'lightgreen', fontSize: 12 }}
            stroke="lightgreen"
          />
          <ReferenceLine
            y={50}
            label={{ value: 'Average', angle: 0, position: 'top', fill: 'gold', fontSize: 12 }}
            stroke="gold"
          />
          <ReferenceLine
            y={0}
            label={{ value: 'Worst', angle: 0, position: 'top', fill: 'red', fontSize: 12 }}
            stroke="red"
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="white"
            fill="rgb(255, 174, 0)"
            label={{ angle: 0, position: 'bottom', fill: 'white', fontSize: 9 }}
          />
        </LineChart>
      </div>
      <p>
        Takeaways :<div className="fieldRank">{getRank(player.takeawaysRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.takeawaysRate)}</span>
      </p>
      <p>
        Giveaways :<div className="fieldRank">{getRank(player.giveawaysRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.giveawaysRate)}</span>
      </p>
      <p>
        Hits :<div className="fieldRank">{getRank(player.hitsRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.hitsRate)}</span>
      </p>
      <p>
        Expected Goals - :<div className="fieldRank">{getRank(player.xGoalsAgainstRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.xGoalsAgainstRate)}</span>
      </p>
      <p>
        🧊 Goals - :<div className="fieldRank">{getRank(player.onIceGoalsAgainstRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.onIceGoalsAgainstRate)}</span>
      </p>
      <p>
        Blocks :<div className="fieldRank">{getRank(player.blocksRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.blocksRate)}</span>
      </p>
      <p>
        D-Zone Giveaways :<div className="fieldRank">{getRank(player.dZoneGiveawaysRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.dZoneGiveawaysRate)}</span>
      </p>
      <p>
        Breakups :<div className="fieldRank">{getRank(player.breakupsRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.breakupsRate)}</span>
      </p>
      <p>
        Shot Attempts - :<div className="fieldRank">{getRank(player.shotAttemptsAgainstRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.shotAttemptsAgainstRate)}</span>
      </p>
      <p>
        D-Zone Starts :<div className="fieldRank">{getRank(player.dZoneStartRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(player.dZoneStartRate)}</span>
      </p>
      <div className="fullWidthChart">
        <h2 className="playerChart">Defense Per 60</h2>
        <LineChart
          width={1200}
          height={280}
          data={defensiveGraphData}
          margin={{
            top: 15,
            right: 10,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" stroke="white" />
          <YAxis stroke="white" />
          <ReferenceLine
            y={100}
            label={{ value: 'Best', angle: 0, position: 'top', fill: 'lightgreen', fontSize: 12 }}
            stroke="lightgreen"
          />
          <ReferenceLine
            y={50}
            label={{ value: 'Average', angle: 0, position: 'top', fill: 'gold', fontSize: 12 }}
            stroke="gold"
          />
          <ReferenceLine
            y={0}
            label={{ value: 'Worst', angle: 0, position: 'top', fill: 'red', fontSize: 12 }}
            stroke="red"
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="white"
            fill="rgb(255, 174, 0)"
            label={{ angle: 0, position: 'bottom', fill: 'white', fontSize: 9 }}
          />
        </LineChart>
      </div>
    </div>
  );
};
export default PlayerCard;
