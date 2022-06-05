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

const CompareTeamsCard = ({ comparisonTeams }) => {
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
  function getColor(team, field) {
    let resultArr = comparisonTeams.slice();
    let comparisonArray = resultArr.sort(function (a, b) {
      return b[field] - a[field];
    });
    let comparedTeam = comparisonArray.find((obj) => obj.value === team);
    let rank = comparisonArray.indexOf(comparedTeam) + 1;
    let color = 'rgba(';
    if (comparisonArray.length >= 6) {
      let comparisonFactor = Math.floor(comparisonArray.length / 3);
      color +=
        rank > comparisonFactor * 2
          ? '255, 51, 51)'
          : rank > comparisonFactor && rank <= comparisonFactor * 2
          ? '255, 205, 0)'
          : rank <= comparisonFactor
          ? '51, 255, 74)'
          : '0, 0, 0)';
    } else {
      color +=
        rank === comparisonArray.length
          ? '255, 51, 51)'
          : rank != 1
          ? '255, 205, 0)'
          : rank === 1
          ? '51, 255, 74)'
          : '0, 0, 0)';
    }
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

  return (
    <div>
      {comparisonTeams ? (
        comparisonTeams.map((team) => (
          <div className="comapreContainer" key={team.value}>
            <h1>{team.value}</h1>
            <img className="teamLogo" height="10" src={teamLogos.find((obj) => obj.team === team.team).logo} />
            <p>Goals For:</p>
            <span style={{ backgroundColor: getColor(team.value, 'goalsForRate') }}>
              {getRatePercentage(team.goalsForRate) + ' (' + getRank(team.goalsForRank) + ')'}
            </span>
            <p>Goals Against:</p>
            <span style={{ backgroundColor: getColor(team.value, 'goalsAgainstRate') }}>
              {getRatePercentage(team.goalsAgainstRate) + ' (' + getRank(team.goalsAgainstRank) + ')'}
            </span>
            <p>xGoals For:</p>
            <span style={{ backgroundColor: getColor(team.value, 'xGoalsForRate') }}>
              {getRatePercentage(team.xGoalsForRate) + ' (' + getRank(team.xGoalsForRank) + ')'}
            </span>
            <p>xGoals Against:</p>
            <span style={{ backgroundColor: getColor(team.value, 'xGoalsAgainstRate') }}>
              {getRatePercentage(team.xGoalsAgainstRate) + ' (' + getRank(team.xGoalsAgainstRank) + ')'}
            </span>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default CompareTeamsCard;
