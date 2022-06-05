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

const ComparePlayersCard = ({ comparisonPlayers }) => {
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
  function getColor(player, field) {
    let resultArr = comparisonPlayers.slice();
    let comparisonArray = resultArr.sort(function (a, b) {
      return b[field] - a[field];
    });
    let comparedPlayer = comparisonArray.find((obj) => obj.value === player);
    let rank = comparisonArray.indexOf(comparedPlayer) + 1;
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

  console.log(comparisonPlayers);

  return (
    <div>
      {comparisonPlayers ? (
        comparisonPlayers.map((player) => (
          <div className="comapreContainer" key={player.value}>
            <h1>{player.value}</h1>
            <img className="teamLogo" height="10" src={teamLogos.find((obj) => obj.team === player.team).logo} />
            <p>Goals:</p>
            <span style={{ backgroundColor: getColor(player.value, 'goalsRate') }}>
              {getRatePercentage(player.goalsRate) + ' (' + getRank(player.goalsRank) + ')'}
            </span>
            <p>Assists:</p>
            <span style={{ backgroundColor: getColor(player.value, 'assistsRate') }}>
              {getRatePercentage(player.assistsRate) + ' (' + getRank(player.assistsRank) + ')'}
            </span>
            <p>Points:</p>
            <span style={{ backgroundColor: getColor(player.value, 'pointsRate') }}>
              {getRatePercentage(player.pointsRate) + ' (' + getRank(player.pointsRank) + ')'}
            </span>
            <p>On Ice Goals +:</p>
            <span style={{ backgroundColor: getColor(player.value, 'onIceGoalsForRate') }}>
              {getRatePercentage(player.onIceGoalsForRate) + ' (' + getRank(player.onIceGoalsForRank) + ')'}
            </span>
            <p>On Ice Goals -:</p>
            <span style={{ backgroundColor: getColor(player.value, 'onIceGoalsAgainstRate') }}>
              {getRatePercentage(player.onIceGoalsAgainstRate) + ' (' + getRank(player.onIceGoalsAgainstRank) + ')'}
            </span>
            <p>xGoals +:</p>
            <span style={{ backgroundColor: getColor(player.value, 'xGoalsRate') }}>
              {getRatePercentage(player.xGoalsRate) + ' (' + getRank(player.xGoalsRank) + ')'}
            </span>
            <p>xGoals -:</p>
            <span style={{ backgroundColor: getColor(player.value, 'xGoalsAgainstRate') }}>
              {getRatePercentage(player.xGoalsAgainstRate) + ' (' + getRank(player.xGoalsAgainstRank) + ')'}
            </span>
            {/* <p>Goals Against:</p>
            <span style={{ backgroundColor: getColor(player.value, 'goalsAgainstRate') }}>
              {getRatePercentage(player.goalsAgainstRate) + ' (' + getRank(player.goalsAgainstRank) + ')'}
            </span>
            <p>xGoals For:</p>
            <span style={{ backgroundColor: getColor(player.value, 'xGoalsForRate') }}>
              {getRatePercentage(player.xGoalsForRate) + ' (' + getRank(player.xGoalsForRank) + ')'}
            </span>
            <p>xGoals Against:</p>
            <span style={{ backgroundColor: getColor(player.value, 'xGoalsAgainstRate') }}>
              {getRatePercentage(player.xGoalsAgainstRate) + ' (' + getRank(player.xGoalsAgainstRank) + ')'}
            </span> */}
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default ComparePlayersCard;