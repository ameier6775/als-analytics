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
import teamLogos from '../../data/mlb/teams/2022/logos';

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
  // Background color for fields
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
          <div className="compareContainer" key={team.value}>
            <h1>{team.value}</h1>
            <img className="teamLogo" height="10" src={teamLogos.find((obj) => obj.team === team.value).logo} />
            <p>Hits For:</p>
            <span style={{ backgroundColor: getColor(team.value, 'hAVG_rate') }}>
              {getRatePercentage(team.hAVG_rate) + ' (' + getRank(team.hAVG_rank) + ')'}
            </span>
            <p>Hits Against:</p>
            <span style={{ backgroundColor: getColor(team.value, 'pAVG_rate') }}>
              {getRatePercentage(team.pAVG_rate) + ' (' + getRank(team.pAVG_rank) + ')'}
            </span>
            <p>Runs:</p>
            <span style={{ backgroundColor: getColor(team.value, 'hR_rate') }}>
              {getRatePercentage(team.hR_rate) + ' (' + getRank(team.hR_rank) + ')'}
            </span>
            <p>ERA:</p>
            <span style={{ backgroundColor: getColor(team.value, 'ERA_rate') }}>
              {getRatePercentage(team.ERA_rate) + ' (' + getRank(team.ERA_rank) + ')'}
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
