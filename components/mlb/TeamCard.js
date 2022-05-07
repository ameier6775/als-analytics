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

  // Gets the ranking for the given statistic
  function getRank(category, order = 'desc') {
    // Duplicate the players array
    var resultArr = teams.slice();
    var rankArr = resultArr;

    // Sorting by the category
    if (order === 'desc') {
      rankArr.sort((a, b) => b[category] - a[category]);
    } else if (order === 'asc') {
      rankArr.sort((a, b) => a[category] - b[category]);
    }

    let categoryRank = rankArr.indexOf(selectedTeam) + 1;
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
      ? 0
      : !parseInt(getProductionPercentile('HRAgainst').substring(0, 2)) === 0
      ? 100
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
            Average:
            <div className="fieldRank">{getRank('AVGFor')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('AVGFor')) }}>
              {getProductionPercentile('AVGFor')}
            </span>
          </p>
          <p>
            Singles:<div className="fieldRank">{getRank('1B')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('1B')) }}>
              {getProductionPercentile('1B')}
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
            Home Runs:<div className="fieldRank">{getRank('HRFor')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('HRFor')) }}>
              {getProductionPercentile('HRFor')}
            </span>
          </p>
          <p>
            Runs:<div className="fieldRank">{getRank('RFor')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('RFor')) }}>
              {getProductionPercentile('RFor')}
            </span>
          </p>
          <p>
            Hits:<div className="fieldRank">{getRank('HFor')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('HFor')) }}>
              {getProductionPercentile('HFor')}
            </span>
          </p>
          <p>
            Walks:<div className="fieldRank">{getRank('BBFor')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('BBFor')) }}>
              {getProductionPercentile('BBFor')}
            </span>
          </p>
          <p>
            Strikeouts:<div className="fieldRank">{getRank('SOFor', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('SOFor', 'negative')) }}>
              {getProductionPercentile('SOFor', 'negative')}
            </span>
          </p>
          <p>
            Walk Per Strikeout:<div className="fieldRank">{getRank('BBPerK')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('BBPerK')) }}>
              {getProductionPercentile('BBPerK')}
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
          {/* <h2>Pitching</h2> */}
          <p>
            Earned Run Average:<div className="fieldRank">{getRank('ERA', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('ERA', 'negative')) }}>
              {getProductionPercentile('ERA', 'negative')}
            </span>
          </p>
          <p>
            WHIP:<div className="fieldRank">{getRank('WHIP', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('WHIP', 'negative')) }}>
              {getProductionPercentile('WHIP', 'negative')}
            </span>
          </p>
          <p>
            Strikeouts:<div className="fieldRank">{getRank('SOAgainst')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('SOAgainst')) }}>
              {getProductionPercentile('SOAgainst')}
            </span>
          </p>
          <p>
            Walks:<div className="fieldRank">{getRank('BBAgainst', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('BBAgainst', 'negative')) }}>
              {getProductionPercentile('BBAgainst', 'negative')}
            </span>
          </p>
          <p>
            Home Runs:<div className="fieldRank">{getRank('HRAgainst', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('HRAgainst', 'negative')) }}>
              {getProductionPercentile('HRAgainst', 'negative')}
            </span>
          </p>
          <p>
            Runs:<div className="fieldRank">{getRank('RAgainst', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('RAgainst', 'negative')) }}>
              {getProductionPercentile('RAgainst', 'negative')}
            </span>
          </p>
          <p>
            Hits:<div className="fieldRank">{getRank('HAgainst', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('HAgainst', 'negative')) }}>
              {getProductionPercentile('HAgainst', 'negative')}
            </span>
          </p>
          <p>
            Strikeouts Per 9:<div className="fieldRank">{getRank('KPer9')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('KPer9')) }}>
              {getProductionPercentile('KPer9')}
            </span>
          </p>
          <p>
            Walks Per 9:<div className="fieldRank">{getRank('BBAgainst', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('BBAgainst', 'negative')) }}>
              {getProductionPercentile('BBAgainst', 'negative')}
            </span>
          </p>
          <p>
            Home Runs Per 9:<div className="fieldRank">{getRank('HRPer9', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getProductionPercentile('HRPer9', 'negative')) }}>
              {getProductionPercentile('HRPer9', 'negative')}
            </span>
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
