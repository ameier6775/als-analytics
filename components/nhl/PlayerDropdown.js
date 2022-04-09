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

const PlayerDropdown = ({ players }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const onChange = (e) => {
    setSelectedPlayer(e);
  };

  // Preparing chart data
  let xGF =
    parseInt(getPercentile('OnIce_F_xGoals').substring(0, 2)) === 10
      ? 100
      : parseInt(getPercentile('OnIce_F_xGoals').substring(0, 2));
  let xGA =
    parseInt(getPercentile('OnIce_A_xGoals').substring(0, 2)) === 10
      ? 100
      : parseInt(getPercentile('OnIce_A_xGoals').substring(0, 2));
  let goals =
    parseInt(getPercentile('I_F_goals').substring(0, 2)) === 10
      ? 100
      : parseInt(getPercentile('I_F_goals').substring(0, 2));
  let points =
    parseInt(getPercentile('I_F_points').substring(0, 2)) === 10
      ? 100
      : parseInt(getPercentile('I_F_points').substring(0, 2));
  let gp =
    parseInt(getPercentile('games_played').substring(0, 2)) === 10
      ? 100
      : parseInt(getPercentile('games_played').substring(0, 2));

  // Plotting chart data
  var playerGraphData = [
    {
      category: 'xGF',
      score: xGF,
      fullMark: 100,
    },
    {
      category: 'xGA',
      score: xGA,
      fullMark: 100,
    },
    {
      category: 'Goals',
      score: goals,
      fullMark: 100,
    },
    {
      category: 'Points',
      score: points,
      fullMark: 100,
    },
    {
      category: 'GP',
      score: gp,
      fullMark: 100,
    },
  ];

  console.log(playerGraphData);

  // Gets the percentile for the given statistic
  function getPercentile(category) {
    // Group forwards & defensemen together
    if (selectedPlayer['position'] === 'D') {
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
    if (maxValue === selectedPlayer[category]) {
      return '100%';
    } else if (selectedPlayer[category] === 0) {
      return 'N/A';
    } else if ((selectedPlayer[category] / maxValue).toFixed(2).substring(2, 3) === '0') {
      return (selectedPlayer[category] / maxValue).toFixed(2).substring(3, 4) + '%';
    } else {
      return (selectedPlayer[category] / maxValue).toFixed(2).substring(2, 4) + '%';
    }
  }

  function combineCategories(categoryOne, categoryTwo) {
    let category1 = parseInt(categoryOne.substring(0, 2));
    let category2 = parseInt(categoryTwo.substring(0, 2));
    let avg = ((category1 + category2) / 2).toString() + '%';
    return avg;
  }

  function getFaceOffPercentage() {
    let faceOffPercentage =
      (selectedPlayer['faceoffsWon'] / (selectedPlayer['faceoffsWon'] + selectedPlayer['faceoffsLost']))
        .toFixed(2)
        .substring(2, 4) + '%';
    if (selectedPlayer['faceoffsWon'] != 0) {
      return faceOffPercentage;
    } else {
      return 'N/A';
    }
  }

  return (
    <div>
      {/* <img src="https://1000logos.net/wp-content/uploads/2017/05/NHL-Logo.png" alt="User avatar" width={50} /> */}
      <Select onChange={onChange} options={players} />
      {selectedPlayer ? (
        <div id={selectedPlayer.playerId} className="playerCard">
          <h1>{selectedPlayer.name}</h1>
          <h2>
            {selectedPlayer.position === 'R' || selectedPlayer.position === 'L'
              ? selectedPlayer.position + 'W'
              : selectedPlayer.position}
          </h2>
          <p>
            Goals: <span>{getPercentile('I_F_goals')}</span>
          </p>
          <p>
            Assists:{' '}
            <span>{combineCategories(getPercentile('I_F_primaryAssists'), getPercentile('I_F_secondaryAssists'))}</span>
          </p>
          <p>
            Points: <span>{getPercentile('I_F_points')}</span>
          </p>
          <p>
            TOI:{' '}
            <span>
              {/* {(selectedPlayer.icetime / 60 / selectedPlayer.games_played).toFixed(2).substring(0, 4)} */}
              {getPercentile('icetime')}
            </span>
          </p>
          <p>
            Games: <span>{getPercentile('games_played')}</span>
          </p>
          <p>
            FO: <span>{getFaceOffPercentage()}</span>
          </p>
          <p>
            xGoals: <span>{getPercentile('I_F_xGoals')}</span>
          </p>
          <p>
            xGF: <span>{getPercentile('OnIce_F_xGoals')}</span>
          </p>
          <p>
            xGA: <span>{getPercentile('OnIce_A_xGoals')}</span>
          </p>
          <p>
            Game Score: <span>{getPercentile('gameScore')}</span>
          </p>
          <div className="fullWidth">
            <h2 className="playerChart">Offense</h2>
            <LineChart
              width={625}
              height={200}
              data={playerGraphData}
              margin={{
                top: 15,
                right: 5,
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
          <div className="fullWidth">
            <h2 className="playerChart">Defense</h2>
            <LineChart
              width={625}
              height={200}
              data={playerGraphData}
              margin={{
                top: 15,
                right: 5,
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

export default PlayerDropdown;
