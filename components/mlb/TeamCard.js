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

const TeamCard = ({ teams }) => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const onChange = (e) => {
    setSelectedTeam(e);
  };

  function getProductionPercentile(category, direction = 'positive') {
    var positionalArr = teams;
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
    var teamValue = selectedTeam[category];
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

  // Preparing hitters chart data
  let runs =
    parseInt(getProductionPercentile('R').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('R').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('R').substring(0, 2));
  let onBase =
    parseInt(getProductionPercentile('OBP').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('OBP').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('OBP').substring(0, 2));
  let average =
    parseInt(getProductionPercentile('AVG').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('AVG').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('AVG').substring(0, 2));
  let slug =
    parseInt(getProductionPercentile('SLG').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('SLG').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('SLG').substring(0, 2));
  let strikeouts =
    parseInt(getProductionPercentile('SO', 'negative').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('SO', 'negative').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('SO', 'negative').substring(0, 2));

  // Plotting chart data
  var hittersGraphData = [
    {
      category: 'Runs',
      score: runs,
      fullMark: 100,
    },
    {
      category: 'Average',
      score: average,
      fullMark: 100,
    },
    {
      category: 'Strikeouts',
      score: strikeouts,
      fullMark: 100,
    },
    {
      category: 'On Base',
      score: onBase,
      fullMark: 100,
    },
    {
      category: 'Slug',
      score: slug,
      fullMark: 100,
    },
  ];

  return (
    <div>
      {/* <h2 className="mlbTeamCardSubHeader">Batting:</h2> */}
      <Select onChange={onChange} options={teams} />
      {selectedTeam ? (
        <div id={selectedTeam.playerId} className="playerCard">
          <h1>{selectedTeam.Team}</h1>
          <p>
            Average: <span>{getProductionPercentile('AVG')}</span>
          </p>
          <p>
            Singles: <span>{getProductionPercentile('1B')}</span>
          </p>
          <p>
            Doubles: <span>{getProductionPercentile('2B')}</span>
          </p>
          <p>
            Triples: <span>{getProductionPercentile('3B')}</span>
          </p>
          <p>
            Home Runs: <span>{getProductionPercentile('HR')}</span>
          </p>
          <p>
            Runs: <span>{getProductionPercentile('R')}</span>
          </p>
          <p>
            Hits: <span>{getProductionPercentile('H')}</span>
          </p>
          <p>
            Walks: <span>{getProductionPercentile('BB')}</span>
          </p>
          <p>
            Strikeouts: <span>{getProductionPercentile('SO', 'negative')}</span>
          </p>
          <p>
            Walk Per Strikeout: <span>{getProductionPercentile('BBPerK')}</span>
          </p>
          <div className="fullWidthChart">
            <h2 className="playerChart">Hitters</h2>
            <LineChart
              width={1200}
              height={280}
              data={hittersGraphData}
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
      ) : (
        <p>N/A</p>
      )}
    </div>
  );
};

export default TeamCard;
