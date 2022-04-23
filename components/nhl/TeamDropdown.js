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

const TeamDropdown = ({ players }) => {
  const [selectedTeam, setSelectedTeam] = useState(players[0]);
  const onChange = (e) => {
    setSelectedTeam(e);
  };

  // Preparing offensive chart data
  let xGF =
    parseInt(getTimePercentile('OnIce_F_xGoals').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('OnIce_F_xGoals').substring(0, 2));
  let goals =
    parseInt(getTimePercentile('OnIce_F_goals').substring(0, 2)) === 10
      ? 100
      : !parseInt(getTimePercentile('OnIce_F_goals').substring(0, 2))
      ? 0
      : parseInt(getTimePercentile('OnIce_F_goals').substring(0, 2));
  let points =
    parseInt(getTimePercentile('I_F_points').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('I_F_points').substring(0, 2));
  let shotAttemptsFor =
    parseInt(getTimePercentile('OnIce_F_shotAttempts').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('OnIce_F_shotAttempts').substring(0, 2));
  let reboundsFor =
    parseInt(getTimePercentile('I_F_rebounds').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('I_F_rebounds').substring(0, 2));

  // Preparing defensive chart data
  let xGA =
    parseInt(getTimePercentile('OnIce_A_xGoals').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('OnIce_A_xGoals').substring(0, 2));
  let goalsAgainst =
    parseInt(getTimePercentile('OnIce_A_goals').substring(0, 2)) === 10
      ? 100
      : !parseInt(getTimePercentile('OnIce_A_goals').substring(0, 2))
      ? 0
      : parseInt(getTimePercentile('OnIce_A_goals').substring(0, 2));
  let giveaways =
    parseInt(getTimePercentile('I_F_giveaways').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('I_F_giveaways').substring(0, 2));
  let shotAttemptsAgainst =
    parseInt(getTimePercentile('OnIce_A_shotAttempts').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('OnIce_A_shotAttempts').substring(0, 2));
  let reboundsAgainst =
    parseInt(getTimePercentile('OnIce_A_reboundGoals').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('OnIce_A_reboundGoals').substring(0, 2));

  // Plotting chart data
  var offensiveGraphData = [
    {
      category: 'Points',
      score: points,
      fullMark: 100,
    },

    {
      category: '🧊 Goals For',
      score: goals,
      fullMark: 100,
    },
    {
      category: 'Expected Goals',
      score: xGF,
      fullMark: 100,
    },

    {
      category: '🧊 Shot Attempts',
      score: shotAttemptsFor,
      fullMark: 100,
    },
    {
      category: 'Net Front',
      score: reboundsFor,
      fullMark: 100,
    },
  ];
  var defensiveGraphData = [
    {
      category: 'Giveaways',
      score: giveaways,
      fullMark: 100,
    },

    {
      category: '🧊 Goals Against',
      score: goalsAgainst,
      fullMark: 100,
    },
    {
      category: 'Expected Goals',
      score: xGA,
      fullMark: 100,
    },

    {
      category: '🧊 Shot Attempts',
      score: shotAttemptsAgainst,
      fullMark: 100,
    },
    {
      category: 'Net Front',
      score: reboundsAgainst,
      fullMark: 100,
    },
  ];

  // Gets the percentile for the given statistic
  function getProductionPercentile(category) {
    // Group forwards & defensemen together
    if (selectedTeam['position'] === 'D') {
      var positionalArr = players.filter((player) => player.position === 'D');
    } else {
      var positionalArr = players.filter((player) => player.position != 'D');
    }

    // Get the maximum player value for the statistic
    var maxValue = Math.max.apply(
      Math,
      positionalArr.map((obj) => {
        return obj[category];
      }),
    );

    // Specific conditions (100% & 0&)
    if (maxValue === selectedTeam[category]) {
      return '100%';
    } else if (selectedTeam[category] === 0) {
      return '0%';
    } else if ((selectedTeam[category] / maxValue).toFixed(2).substring(2, 3) === '0') {
      return (selectedTeam[category] / maxValue).toFixed(2).substring(3, 4) + '%';
    } else {
      return (selectedTeam[category] / maxValue).toFixed(2).substring(2, 4) + '%';
    }
  }

  // Gets the percentile for the given negative statistic
  function getNegativePercentile(category) {
    // Group forwards & defensemen together
    if (selectedTeam['position'] === 'D') {
      var positionalArr = players.filter((player) => player.position === 'D');
    } else {
      var positionalArr = players.filter((player) => player.position != 'D');
    }

    // Get the maximum player value for the statistic
    var maxValue = Math.max.apply(
      Math,
      positionalArr.map((obj) => {
        return obj[category];
      }),
    );

    // Specific conditions (100% & 0%)
    if (maxValue === selectedTeam[category]) {
      return '100%';
    } else if (selectedTeam[category] === 0) {
      return '0%';
    } else if ((1 - selectedTeam[category] / maxValue).toFixed(2).substring(2, 3) === '0') {
      return (1 - selectedTeam[category] / maxValue).toFixed(2).substring(3, 4) + '%';
    } else {
      return (1 - selectedTeam[category] / maxValue).toFixed(2).substring(2, 4) + '%';
    }
  }

  // Gets the percentile for the given statistic
  function getTimePercentile(category) {
    // Group forwards & defensemen together
    if (selectedTeam['position'] === 'D') {
      var positionalArr = players.filter((player) => player.position === 'D');
    } else {
      var positionalArr = players.filter((player) => player.position != 'D');
    }

    // Get the maximum player value for the statistic
    var maxValue = Math.max.apply(
      Math,
      positionalArr.map((obj) => {
        return obj[category] / obj['icetime'];
      }),
    );

    let topNumber = (selectedTeam[category] / selectedTeam['icetime'] / maxValue).toFixed(2);
    // Specific conditions (100% & 0&)
    if (topNumber === '1.00') {
      return '100%';
    } else if (selectedTeam[category] === 0) {
      return '0%';
    } else if (topNumber.substring(2, 3) === '0') {
      return topNumber.substring(0, 4) + '%';
    } else {
      return topNumber.substring(2, 4) + '%';
    }
  }

  function combineCategories(categoryOne, categoryTwo) {
    let category1 = parseInt(categoryOne.substring(0, categoryOne.length - 1));
    let category2 = parseInt(categoryTwo.substring(0, categoryTwo.length - 1));
    console.log(category1, category2);
    let avg = ((category1 + category2) / 2).toString() + '%';
    return avg;
  }

  function getFaceOffPercentage() {
    let faceOffPercentage =
      (selectedTeam['faceoffsWon'] / (selectedTeam['faceoffsWon'] + selectedTeam['faceoffsLost']))
        .toFixed(2)
        .substring(2, 4) + '%';
    if (selectedTeam['faceoffsWon'] != 0) {
      return faceOffPercentage;
    } else {
      return 'N/A';
    }
  }

  return (
    <div>
      <Select onChange={onChange} options={players} />
      {selectedTeam ? (
        <div id={selectedTeam.playerId} className="playerCard">
          <h1>{selectedTeam.name}</h1>
          <h2>
            {selectedTeam.position === 'R' || selectedTeam.position === 'L'
              ? selectedTeam.position + 'W'
              : selectedTeam.position}
          </h2>
          <h2>{selectedTeam['team']}</h2>

          <p>
            Goals: <span>{getProductionPercentile('I_F_goals')}</span>
          </p>
          <p>
            Assists:{' '}
            <span>
              {combineCategories(
                getProductionPercentile('I_F_primaryAssists'),
                getProductionPercentile('I_F_secondaryAssists'),
              )}
            </span>
          </p>
          <p>
            Points: <span>{getProductionPercentile('I_F_points')}</span>
          </p>
          <p>
            Expected Goals For: <span>{getProductionPercentile('I_F_xGoals')}</span>
          </p>
          <p>
            🧊 Goals For: <span>{getProductionPercentile('OnIce_F_xGoals')}</span>
          </p>
          <p>
            🚨 Per 60: <span>{getTimePercentile('I_F_goals')}</span>
          </p>
          <p>
            🍏 Per 60:{' '}
            <span>
              {combineCategories(getTimePercentile('I_F_primaryAssists'), getTimePercentile('I_F_secondaryAssists'))}
            </span>
          </p>
          <p>
            🥅 Per 60: <span>{getTimePercentile('I_F_points')}</span>
          </p>
          <p>
            Expected Goals Against: <span>{getNegativePercentile('OnIce_A_xGoals')}</span>
          </p>
          <p>
            🧊 Goals Against: <span>{getNegativePercentile('OnIce_A_goals')}</span>
          </p>
          <p>
            Shot Attempts: <span>{getProductionPercentile('I_F_shotAttempts')}</span>
          </p>
          <p>
            Hits: <span>{getProductionPercentile('I_F_hits')}</span>
          </p>
          <p>
            Blocks: <span>{getProductionPercentile('shotsBlockedByPlayer')}</span>
          </p>
          <p>
            Takeaways: <span>{getProductionPercentile('I_F_takeaways')}</span>
          </p>
          <p>
            Giveaways: <span>{getProductionPercentile('I_F_giveaways')}</span>
          </p>
          <p>
            Games: <span>{getProductionPercentile('games_played')}</span>
          </p>
          <p>
            Time On Ice: <span>{getProductionPercentile('icetime')}</span>
          </p>
          {/* <p>
            Faceoffs: <span>{getFaceOffPercentage()}</span>
          </p>
          <p>
            Game Score: <span>{getProductionPercentile('gameScore')}</span>
          </p> */}
          <p>
            Offensive Zone Starts:{' '}
            <span>
              {parseFloat(
                selectedTeam['I_F_oZoneShiftStarts'] /
                  (selectedTeam['I_F_oZoneShiftStarts'] +
                    selectedTeam['I_F_dZoneShiftStarts'] +
                    selectedTeam['I_F_neutralZoneShiftStarts']),
              )
                .toFixed(2)
                .substring(2, 4) + '%'}
            </span>
          </p>
          <p>
            Neutral Zone Starts:{' '}
            <span>
              {parseFloat(
                selectedTeam['I_F_neutralZoneShiftStarts'] /
                  (selectedTeam['I_F_oZoneShiftStarts'] +
                    selectedTeam['I_F_dZoneShiftStarts'] +
                    selectedTeam['I_F_neutralZoneShiftStarts']),
              )
                .toFixed(2)
                .substring(2, 4) + '%'}
            </span>
          </p>
          <p>
            Defensive Zone Starts:{' '}
            <span>
              {parseFloat(
                selectedTeam['I_F_dZoneShiftStarts'] /
                  (selectedTeam['I_F_oZoneShiftStarts'] +
                    selectedTeam['I_F_dZoneShiftStarts'] +
                    selectedTeam['I_F_neutralZoneShiftStarts']),
              )
                .toFixed(2)
                .substring(2, 4) + '%'}
            </span>
          </p>
          {/* <p>
            Expected: <span>{getProductionPercentile('expectedCases')}</span>
          </p> */}
          <div className="fullWidthChart">
            <h2 className="playerChart">Offense Per 60</h2>
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
            <h2 className="playerChart">Defense Per 60</h2>
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
                label={{ value: 'Worst', angle: 0, position: 'top', fill: 'red', fontSize: 12 }}
                stroke="red"
              />
              <ReferenceLine
                y={50}
                label={{ value: 'Average', angle: 0, position: 'top', fill: 'gold', fontSize: 12 }}
                stroke="gold"
              />
              <ReferenceLine
                y={0}
                label={{ value: 'Best', angle: 0, position: 'top', fill: 'lightgreen', fontSize: 12 }}
                stroke="lightgreen"
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

export default TeamDropdown;
