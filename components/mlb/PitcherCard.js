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

const PitcherCard = ({ players }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const onChange = (e) => {
    setSelectedPlayer(e);
  };

  function getProductionPercentile(category, direction = 'negative') {
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
    var teamValue = selectedPlayer[category];
    var result = (teamValue - minValue) / difference;

    // Specific conditions (100% & 0&) based off if its a positive or negative statistic
    if (direction === 'positive') {
      if (maxValue === teamValue) {
        return '100%';
      } else if (minValue === teamValue) {
        return '0%';
      } else if (result.toFixed(2).substring(2, 3) === '0') {
        return result.toFixed(2).substring(3, 4) + '%';
      } else {
        return result.toFixed(2).substring(2, 4) + '%';
      }
    } else if (direction === 'negative') {
      if (minValue === teamValue) {
        return '100%';
      } else if (maxValue === teamValue) {
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
    if ((lastDigit >= 10 && lastDigit <= 20) || (lastDigit >= 4 && lastDigit <= 9) || lastDigit === 0) {
      rankString = rankString + 'th';
    } else if (lastDigit === 1) {
      rankString = rankString + 'st';
    } else if (lastDigit === 2) {
      rankString = rankString + 'nd';
    } else if (lastDigit === 3) {
      rankString = rankString + 'rd';
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

  // Preparing pitchers chart data (all positive valued fields)
  let era =
    parseInt(getProductionPercentile('ERA').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('ERA').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('ERA').substring(0, 2));
  let whip =
    parseInt(getProductionPercentile('WHIP').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('WHIP').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('WHIP').substring(0, 2));
  let walks =
    parseInt(getProductionPercentile('BB').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('BB').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('BB').substring(0, 2));
  let losses =
    parseInt(getProductionPercentile('L').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('L').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('L').substring(0, 2));
  let homeRunsAgainst =
    parseInt(getProductionPercentile('HR').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('HR').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('HR').substring(0, 2));

  // Plotting chart data
  var hittersGraphData = [
    {
      category: 'ERA',
      score: era,
      fullMark: 100,
    },
    {
      category: 'WHIP',
      score: whip,
      fullMark: 100,
    },
    {
      category: 'Losses',
      score: losses,
      fullMark: 100,
    },
    {
      category: 'Walks',
      score: walks,
      fullMark: 100,
    },
    {
      category: 'Home Runs',
      score: homeRunsAgainst,
      fullMark: 100,
    },
  ];

  var logo = teamLogos.find((obj) => obj.team === selectedPlayer['Team']);

  return (
    <div>
      <h2 className="mlbTeamCardSubHeader">Pitcher:</h2>
      <Select onChange={onChange} options={players} />
      {selectedPlayer ? (
        <div id={selectedPlayer.playerId} className="playerCard">
          <h1>{selectedPlayer.Player}</h1>
          <h2>{selectedPlayer.Team}</h2>
          <img className="teamLogo" height="10" src={logo.logo} />
          <p>
            ERA:
            <div className="fieldRank">{getRank('ERA')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('ERA')) }}>
              {getProductionPercentile('ERA')}
            </span>
          </p>
          <p>
            WHIP:<div className="fieldRank">{getRank('WHIP')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('WHIP')) }}>
              {getProductionPercentile('WHIP')}
            </span>
          </p>
          <p>
            Strikeouts:<div className="fieldRank">{getRank('K', 'positive')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('K', 'positive')) }}>
              {getProductionPercentile('K', 'positive')}
            </span>
          </p>
          <p>
            Wins:<div className="fieldRank">{getRank('W', 'positive')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('W', 'positive')) }}>
              {getProductionPercentile('W', 'positive')}
            </span>
          </p>
          <p>
            Losses:<div className="fieldRank">{getRank('L')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('L')) }}>
              {getProductionPercentile('L')}
            </span>
          </p>
          <p>
            Games:<div className="fieldRank">{getRank('G', 'positive')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('G', 'positive')) }}>
              {getProductionPercentile('G', 'positive')}
            </span>
          </p>
          <p>
            Innings:<div className="fieldRank">{getRank('IP', 'positive')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('IP', 'positive')) }}>
              {getProductionPercentile('IP', 'positive')}
            </span>
          </p>
          <p>
            Walks:<div className="fieldRank">{getRank('BB')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('BB')) }}>
              {getProductionPercentile('BB')}
            </span>
          </p>
          <p>
            Hits:<div className="fieldRank">{getRank('H')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('H')) }}>
              {getProductionPercentile('H')}
            </span>
          </p>
          <p>
            Home Runs:<div className="fieldRank">{getRank('HR')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('HR')) }}>
              {getProductionPercentile('HR')}
            </span>
          </p>
          <div className="fullWidthChart">
            <h2 className="playerChart">Pitching</h2>
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

export default PitcherCard;
