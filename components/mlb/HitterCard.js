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
  };

  function getPercentile(category, direction = 'positive') {
    // Duplicate the players array
    var resultArr = players.slice();
    var rankArr = resultArr;

    // Sorting by the category
    if (direction === 'positive') {
      rankArr.sort((a, b) => b[category] - a[category]);
    } else if (direction === 'negative') {
      rankArr.sort((a, b) => a[category] - b[category]);
    }
    let categoryRank = rankArr.indexOf(selectedPlayer) + 1;
    let result = (rankArr.length - categoryRank + 1) / rankArr.length;

    // Specific conditions (100%, 0%, single digit percentile vs double digit percentile)
    if (result === 1) {
      return '100%';
    } else if (result === 0) {
      return '0%';
    } else if (result.toFixed(2).substring(2, 3) === '0') {
      return result.toFixed(2).substring(3, 4) + '%';
    } else {
      return result.toFixed(2).substring(2, 4) + '%';
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
    parseInt(getPercentile('R').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('R').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('R').substring(0, 2));
  let BBperK =
    parseInt(getPercentile('BBPerK').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('BBPerK').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('BBPerK').substring(0, 2));
  let average =
    parseInt(getPercentile('AVG').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('AVG').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('AVG').substring(0, 2));
  let ops =
    parseInt(getPercentile('OPS').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('OPS').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('OPS').substring(0, 2));
  let homeRunsFor =
    parseInt(getPercentile('HR').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('HR').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('HR').substring(0, 2));

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
      score: BBperK,
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
      <h2 className="mlbTeamCardSubHeader">Players:</h2>
      <Select onChange={onChange} options={players} />
      {selectedPlayer ? (
        <div id={selectedPlayer.playerid} className="playerCard">
          <h1>{selectedPlayer.Player}</h1>
          <h2>{selectedPlayer.Team}</h2>
          <img className="teamLogo" height="10" src={logo.logo} />
          <p>
            Average:
            <div className="fieldRank">{getRank('AVG')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('AVG')) }}>{getPercentile('AVG')}</span>
          </p>
          <p>
            Hits:<div className="fieldRank">{getRank('H')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('H')) }}>{getPercentile('H')}</span>
          </p>
          <p>
            Doubles:<div className="fieldRank">{getRank('2B')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('2B')) }}>{getPercentile('2B')}</span>
          </p>
          <p>
            Triples:<div className="fieldRank">{getRank('3B')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('3B')) }}>{getPercentile('3B')}</span>
          </p>
          <p>
            Home Runs:<div className="fieldRank">{getRank('HR')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('HR')) }}>{getPercentile('HR')}</span>
          </p>
          <p>
            Runs:<div className="fieldRank">{getRank('R')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('R')) }}>{getPercentile('R')}</span>
          </p>
          <p>
            RBIs:<div className="fieldRank">{getRank('RBI')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('RBI')) }}>{getPercentile('RBI')}</span>
          </p>
          <p>
            On Base %:<div className="fieldRank">{getRank('OBP')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('OBP')) }}>{getPercentile('OBP')}</span>
          </p>
          <p>
            Slugging:<div className="fieldRank">{getRank('SLG')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('SLG')) }}>{getPercentile('SLG')}</span>
          </p>
          <p>
            wRC:<div className="fieldRank">{getRank('wRC')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('wRC')) }}>{getPercentile('wRC')}</span>
          </p>
          <p>
            Average - Balls in Play:<div className="fieldRank">{getRank('BABIP')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('BABIP')) }}>{getPercentile('BABIP')}</span>
          </p>
          <p>
            Walks:<div className="fieldRank">{getRank('BB')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('BB')) }}>{getPercentile('BB')}</span>
          </p>
          <p>
            Strikeouts:<div className="fieldRank">{getRank('SO', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('SO', 'negative')) }}>
              {getPercentile('SO', 'negative')}
            </span>
          </p>
          <p>
            Walk Per Strikeout:<div className="fieldRank">{getRank('BBPerK')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('BBPerK')) }}>{getPercentile('BBPerK')}</span>
          </p>
          <p>
            wRC+:<div className="fieldRank">{getRank('wRC+')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('wRC+')) }}>{getPercentile('wRC+')}</span>
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
