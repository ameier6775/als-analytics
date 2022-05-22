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
import teamLogos from '../../data/mlb/teams/2022/logos';

const HitterCard = ({ players }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const onChange = (e) => {
    setSelectedPlayer(e);
    console.log(selectedPlayer);
  };

  function getProductionPercentile(category, direction = 'positive') {
    var positionalArr = players;
    // Get the maximum player value for the statistic
    var maxValue = Math.max.apply(
      Math,
      positionalArr.map((obj) => {
        return obj[category];
      }),
    );
    // Get the minimum player value for the statistic
    var minValue = Math.min.apply(
      Math,
      positionalArr.map((obj) => {
        return obj[category];
      }),
    );
    var difference = maxValue - minValue;
    var playerValue = selectedPlayer[category];
    var result = (playerValue - minValue) / difference;

    // Specific conditions (100% & 0&) based off if its a positive or negative statistic
    if (direction === 'positive') {
      if (maxValue === playerValue) {
        return '100%';
      } else if (minValue === playerValue) {
        return '0%';
      } else if (result.toFixed(2).substring(2, 3) === '0') {
        return result.toFixed(2).substring(3, 4) + '%';
      } else {
        return result.toFixed(2).substring(2, 4) + '%';
      }
    } else if (direction === 'negative') {
      if (minValue === playerValue) {
        return '100%';
      } else if (maxValue === playerValue) {
        return '0%';
      } else if ((1 - result).toFixed(2).substring(2, 3) === '0') {
        return (1 - result).toFixed(2).substring(3, 4) + '%';
      } else {
        return (1 - result).toFixed(2).substring(2, 4) + '%';
      }
    }
  }

  // Gets the ranking for the given statistic
  function getRank(category, order = 'desc') {
    // Duplicate the players array
    var resultArr = players.slice();
    var rankArr = resultArr;

    // Sorting by the category
    if (order === 'desc') {
      rankArr.sort((a, b) => b[category] - a[category]);
    } else if (order === 'asc') {
      rankArr.sort((a, b) => a[category] - b[category]);
    }

    let categoryRank = rankArr.indexOf(selectedPlayer) + 1;
    let rankString = categoryRank.toString();
    let lastDigit = categoryRank % 10;

    // Pronunciation of the ranking
    if (lastDigit === 1) {
      rankString = rankString + 'st';
    } else if (lastDigit === 2) {
      rankString = rankString + 'nd';
    } else if (lastDigit === 3) {
      rankString = rankString + 'rd';
    } else {
      rankString = rankString + 'th';
    }

    return rankString;
  }

  // Set field color based off of incoming value
  function getColor(value) {
    let percentage = parseFloat(value.substring(-1));

    let color =
      percentage <= 33 ? '255, 51, 51' : percentage <= 66 ? '255, 205, 0' : percentage > 66 ? '51, 255, 74' : '0, 0, 0';
    let colorPercentage =
      percentage <= 33
        ? percentage * 3
        : percentage <= 66
        ? ((percentage - 33) * 3) / 100
        : percentage > 66
        ? ((percentage - 67) * 3) / 100
        : 0;

    // Color is too dark, need to fix this eventually (is this a good solution?)
    colorPercentage = colorPercentage < 0.2 ? colorPercentage + 0.2 : colorPercentage;

    let resultColor = 'rgba(' + color + ', ' + colorPercentage + ')';

    return resultColor;
  }

  // Preparing hitters chart data (all positive valued fields)
  let runsFor =
    parseInt(getProductionPercentile('R').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('R').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('R').substring(0, 2));
  let BB =
    parseInt(getProductionPercentile('BB').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('BB').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('BB').substring(0, 2));
  let average =
    parseInt(getProductionPercentile('AVG').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('AVG').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('AVG').substring(0, 2));
  let ops =
    parseInt(getProductionPercentile('OPS').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('OPS').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('OPS').substring(0, 2));
  let homeRunsFor =
    parseInt(getProductionPercentile('HR').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('HR').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('HR').substring(0, 2));

  // Plotting chart data
  var hittersGraphData = [
    {
      category: 'Runs',
      score: runsFor,
      fullMark: 100,
    },
    {
      category: 'Average',
      score: average,
      fullMark: 100,
    },
    {
      category: 'OPS',
      score: ops,
      fullMark: 100,
    },
    {
      category: 'Walk Per Strikeout',
      score: BB,
      fullMark: 100,
    },
    {
      category: 'Home Runs',
      score: homeRunsFor,
      fullMark: 100,
    },
  ];

  var logo = teamLogos.find((obj) => obj.team === selectedPlayer['Team']);

  return (
    <div>
      <h2 className="mlbTeamCardSubHeader">Hitter:</h2>
      <Select onChange={onChange} options={players} />
      {selectedPlayer ? (
        <div id={selectedPlayer.playerid} className="playerCard">
          <h1>{selectedPlayer.Player}</h1>
          <h2>{selectedPlayer.Team}</h2>
          <img className="teamLogo" height="10" src={logo.logo} />
          <p>
            Average:
            <div className="fieldRank">{getRank('AVG')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('AVG')) }}>
              {getProductionPercentile('AVG')}
            </span>
          </p>
          <p>
            Average:<div className="fieldRank">{getRank('H')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('H')) }}>
              {getProductionPercentile('H')}
            </span>
          </p>
          <p>
            Doubles:<div className="fieldRank">{getRank('2B')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('2B')) }}>
              {getProductionPercentile('2B')}
            </span>
          </p>
          <p>
            Triples:<div className="fieldRank">{getRank('3B')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('3B')) }}>
              {getProductionPercentile('3B')}
            </span>
          </p>
          <p>
            Home Runs:<div className="fieldRank">{getRank('HR')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('HR')) }}>
              {getProductionPercentile('HR')}
            </span>
          </p>
          <p>
            Runs:<div className="fieldRank">{getRank('R')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('R')) }}>
              {getProductionPercentile('R')}
            </span>
          </p>
          <p>
            RBIs:<div className="fieldRank">{getRank('RBI')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('RBI')) }}>
              {getProductionPercentile('RBI')}
            </span>
          </p>
          <p>
            wRC+:<div className="fieldRank">{getRank('wRC')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('wRC')) }}>
              {getProductionPercentile('wRC')}
            </span>
          </p>
          {/* <p>
            Stolen Bases:<div className="fieldRank">{getRank('SB')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('SB')) }}>
              {getProductionPercentile('SB')}
            </span>
          </p> */}
          <p>
            On Base %:<div className="fieldRank">{getRank('OBP')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('OBP')) }}>
              {getProductionPercentile('OBP')}
            </span>
          </p>
          <p>
            Slugging:<div className="fieldRank">{getRank('SLG')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('SLG')) }}>
              {getProductionPercentile('SLG')}
            </span>
          </p>
          <div className="fullWidthChart">
            <h2 className="playerChart">Batting</h2>
            <LineChart
              width={1200}
              height={280}
              data={hittersGraphData}
              margin={{
                top: 15,
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
      ) : (
        <p>N/A</p>
      )}
    </div>
  );
};

export default HitterCard;
