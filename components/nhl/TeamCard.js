import { useEffect, useRef, useState } from 'react';
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

const TeamCard = ({ team }) => {
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
  // Background color for fields (currently not being used)
  function getColor(field) {
    console.log(field);
    let color = 'rgba(';
    color +=
      field <= 0.33
        ? '255, 51, 51)'
        : field > 0.33 && field <= 0.66
        ? '255, 205, 0)'
        : field > 0.66
        ? '51, 255, 74)'
        : '0, 0, 0)';
    return color;
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
      category: 'Goals',
      score: getGraphField(team.goalsForRate),
      fullMark: 100,
    },
    {
      category: 'Shot Attempts',
      score: getGraphField(team.shotAttemptsForRate),
      fullMark: 100,
    },
    {
      category: 'Expected Goals',
      score: getGraphField(team.xGoalsForRate),
      fullMark: 100,
    },
    {
      category: 'Takeaways',
      score: getGraphField(team.takeawaysForRate),
      fullMark: 100,
    },
  ];
  var defensiveGraphData = [
    {
      category: 'Goals',
      score: getGraphField(team.goalsAgainstRate),
      fullMark: 100,
    },
    {
      category: 'Shot Attempts',
      score: getGraphField(team.shotAttemptsAgainstRate),
      fullMark: 100,
    },
    {
      category: 'Expected Goals',
      score: getGraphField(team.xGoalsAgainstRate),
      fullMark: 100,
    },
    {
      category: 'Giveaways',
      score: getGraphField(team.giveawaysForRate),
      fullMark: 100,
    },
  ];
  // Team logo
  var logo = teamLogos.find((obj) => obj.team === team.team);
  return (
    <div id={team.team} className="playerCard">
      <h1>{team.value}</h1>
      <img className="teamLogo" height="10" src={logo.logo} />
      <p>
        Goals +:<div className="fieldRank">{getRank(team.goalsForRank)}</div>
        <span style={{ backgroundColor: getColor(team.goalsForRate) }}>{getRatePercentage(team.goalsForRate)}</span>
      </p>
      <p>
        Expected Goals +:<div className="fieldRank">{getRank(team.xGoalsForRank)}</div>
        <span style={{ backgroundColor: getColor(team.xGoalsForRate) }}>{getRatePercentage(team.xGoalsForRate)}</span>
      </p>
      <p>
        Takeaways +:<div className="fieldRank">{getRank(team.takeawaysForRank)}</div>
        <span style={{ backgroundColor: getColor(team.takeawaysForRate) }}>
          {getRatePercentage(team.takeawaysForRate)}
        </span>
      </p>
      <p>
        Shot Attempts +:<div className="fieldRank">{getRank(team.shotAttemptsForRank)}</div>
        <span style={{ backgroundColor: getColor(team.shotAttemptsForRate) }}>
          {getRatePercentage(team.shotAttemptsForRate)}
        </span>
      </p>
      <p>
        Faceoffs:<div className="fieldRank">{getRank(team.faceoffsRank)}</div>
        <span style={{ backgroundColor: getColor(team.faceoffPercentage) }}>
          {getRatePercentage(team.faceoffPercentage)}
        </span>
      </p>
      <p>
        Goals - :<div className="fieldRank">{getRank(team.goalsAgainstRank)}</div>
        <span style={{ backgroundColor: getColor(team.goalsAgainstRate) }}>
          {getRatePercentage(team.goalsAgainstRate)}
        </span>
      </p>
      <p>
        Expected Goals - :<div className="fieldRank">{getRank(team.xGoalsAgainstRank)}</div>
        <span style={{ backgroundColor: getColor(team.xGoalsAgainstRate) }}>
          {getRatePercentage(team.xGoalsAgainstRate)}
        </span>
      </p>
      <p>
        Giveaways - :<div className="fieldRank">{getRank(team.giveawaysForRank)}</div>
        <span style={{ backgroundColor: getColor(team.giveawaysForRate) }}>
          {getRatePercentage(team.giveawaysForRate)}
        </span>
      </p>
      <p>
        Shot Attempts - :<div className="fieldRank">{getRank(team.shotAttemptsAgainstRank)}</div>
        <span style={{ backgroundColor: getColor(team.shotAttemptsAgainstRate) }}>
          {getRatePercentage(team.shotAttemptsAgainstRate)}
        </span>
      </p>
      <p>
        Penalties :<div className="fieldRank">{getRank(team.penaltyRank)}</div>
        <span style={{ backgroundColor: 'rgb(255, 205, 0)' }}>{team.penaltyDifferential}</span>
      </p>
      <div className="fullWidthChart">
        <h2 className="playerChart">Offense</h2>
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
      <div className="fullWidthChart">
        <h2 className="playerChart">Defense</h2>
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
export default TeamCard;
