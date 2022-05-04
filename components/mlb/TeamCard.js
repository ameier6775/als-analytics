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

  // Preparing hitters chart data (all positive valued fields)
  let runsFor =
    parseInt(getProductionPercentile('RFor').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('RFor').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('RFor').substring(0, 2));
  let BBperK =
    parseInt(getProductionPercentile('BBPerK').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('BBPerK').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('BBPerK').substring(0, 2));
  let average =
    parseInt(getProductionPercentile('AVGFor').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('AVGFor').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('AVGFor').substring(0, 2));
  let ops =
    parseInt(getProductionPercentile('OPS').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('OPS').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('OPS').substring(0, 2));
  let homeRunsFor =
    parseInt(getProductionPercentile('HRFor').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('HRFor').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('HRFor').substring(0, 2));

  // Preparing pitchers chart data (all negative valued fields)
  let runsAgainst =
    parseInt(getProductionPercentile('RAgainst').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('RAgainst').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('RAgainst').substring(0, 2));
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
  let averageAgainst =
    parseInt(getProductionPercentile('AVGAgainst').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('AVGAgainst').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('AVGAgainst').substring(0, 2));
  let homeRunsAgainst =
    parseInt(getProductionPercentile('HRAgainst').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('HRAgainst').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('HRAgainst').substring(0, 2));

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
  // Plotting chart data
  var pitchersGraphData = [
    {
      category: 'Runs',
      score: runsAgainst,
      fullMark: 100,
    },
    {
      category: 'Average',
      score: averageAgainst,
      fullMark: 100,
    },

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
      category: 'Home Runs',
      score: homeRunsAgainst,
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
          {/* <h2>Batting</h2> */}
          <p>
            Average: <span>{getProductionPercentile('AVGFor')}</span>
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
            Home Runs: <span>{getProductionPercentile('HRFor')}</span>
          </p>
          <p>
            Runs: <span>{getProductionPercentile('RFor')}</span>
          </p>
          <p>
            Hits: <span>{getProductionPercentile('HFor')}</span>
          </p>
          <p>
            Walks: <span>{getProductionPercentile('BBFor')}</span>
          </p>
          <p>
            Strikeouts: <span>{getProductionPercentile('SOFor', 'negative')}</span>
          </p>
          <p>
            Walk Per Strikeout: <span>{getProductionPercentile('BBPerK')}</span>
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
          {/* <h2>Pitching</h2> */}
          <p>
            Earned Run Average: <span>{getProductionPercentile('ERA', 'negative')}</span>
          </p>
          <p>
            WHIP: <span>{getProductionPercentile('WHIP', 'negative')}</span>
          </p>
          <p>
            Strikeouts: <span>{getProductionPercentile('SOAgainst')}</span>
          </p>
          <p>
            Walks: <span>{getProductionPercentile('BBAgainst', 'negative')}</span>
          </p>
          <p>
            Home Runs: <span>{getProductionPercentile('HRAgainst', 'negative')}</span>
          </p>
          <p>
            Runs: <span>{getProductionPercentile('RAgainst', 'negative')}</span>
          </p>
          <p>
            Hits: <span>{getProductionPercentile('HAgainst', 'negative')}</span>
          </p>
          <p>
            Strikeouts Per 9: <span>{getProductionPercentile('KPer9')}</span>
          </p>
          <p>
            Walks Per 9: <span>{getProductionPercentile('BBAgainst', 'negative')}</span>
          </p>
          <p>
            Home Runs Per 9: <span>{getProductionPercentile('HRPer9', 'negative')}</span>
          </p>
          <div className="fullWidthChart">
            <h2 className="playerChart">Pitching</h2>
            <LineChart
              width={1200}
              height={280}
              data={pitchersGraphData}
              margin={{
                top: 15,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" stroke="white" />
              <YAxis stroke="white" />
              <ReferenceLine
                y={0}
                label={{ value: 'Best', angle: 0, position: 'top', fill: 'lightgreen', fontSize: 12 }}
                stroke="lightgreen"
              />
              <ReferenceLine
                y={50}
                label={{ value: 'Average', angle: 0, position: 'top', fill: 'gold', fontSize: 12 }}
                stroke="gold"
              />
              <ReferenceLine
                y={100}
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
