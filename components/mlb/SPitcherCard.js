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

const SPitcherCard = ({ pitcher }) => {
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

  // const [selectedPlayer, setSelectedPlayer] = useState(player);
  // const onChange = (e) => {
  //   setSelectedPlayer(e);
  // };
  // function getPercentile(category, direction = 'negative') {
  //   var resultArr = players.slice();
  //   var rankArr = resultArr;
  //   if (direction === 'positive') {
  //     rankArr.sort((a, b) => b[category] - a[category]);
  //   } else if (direction === 'negative') {
  //     rankArr.sort((a, b) => a[category] - b[category]);
  //   }
  //   let categoryRank = rankArr.indexOf(selectedPlayer) + 1;
  //   let result = (rankArr.length - categoryRank + 1) / rankArr.length;
  //   if (result === 1) {
  //     return '100%';
  //   } else if (result === 0) {
  //     return '0%';
  //   } else if (result.toFixed(2).substring(2, 3) === '0') {
  //     return result.toFixed(2).substring(3, 4) + '%';
  //   } else {
  //     return result.toFixed(2).substring(2, 4) + '%';
  //   }
  // }
  // Gets the ranking for the given statistic
  // function getRank(category, order = 'desc') {
  //   var resultArr = players.slice();
  //   var rankArr = resultArr;
  //   if (order === 'desc') {
  //     rankArr.sort((a, b) => b[category] - a[category]);
  //   } else if (order === 'asc') {
  //     rankArr.sort((a, b) => a[category] - b[category]);
  //   }
  //   let categoryRank = rankArr.indexOf(selectedPlayer) + 1;
  //   let rankString = categoryRank.toString();
  //   let lastDigit = categoryRank % 10;
  //   if ((lastDigit >= 10 && lastDigit <= 20) || (lastDigit >= 4 && lastDigit <= 9) || lastDigit === 0) {
  //     rankString = rankString + 'th';
  //   } else if (lastDigit === 1) {
  //     rankString = rankString + 'st';
  //   } else if (lastDigit === 2) {
  //     rankString = rankString + 'nd';
  //   } else if (lastDigit === 3) {
  //     rankString = rankString + 'rd';
  //   }
  //   return rankString;
  // }
  // Set field color based off of incoming value
  // function getColor(value) {
  //   let percentage = parseFloat(value.substring(-1));
  //   let color =
  //     percentage <= 33 ? '255, 51, 51' : percentage <= 66 ? '255, 205, 0' : percentage > 66 ? '51, 255, 74' : '0, 0, 0';
  //   let colorPercentage =
  //     percentage <= 33
  //       ? percentage * 3
  //       : percentage <= 66
  //       ? ((percentage - 33) * 3) / 100
  //       : percentage > 66
  //       ? ((percentage - 67) * 3) / 100
  //       : 0;
  //   colorPercentage = colorPercentage < 0.2 ? colorPercentage + 0.2 : colorPercentage;
  //   let resultColor = 'rgba(' + color + ', ' + colorPercentage + ')';
  //   return resultColor;
  // }
  // Preparing pitchers chart data (all positive valued fields)
  // let era =
  //   parseInt(getPercentile('ERA').substring(0, 2)) === 10
  //     ? 100
  //     : !parseInt(getPercentile('ERA').substring(0, 2)) === 0
  //     ? 0
  //     : parseInt(getPercentile('ERA').substring(0, 2));
  // let whip =
  //   parseInt(getPercentile('WHIP').substring(0, 2)) === 10
  //     ? 100
  //     : !parseInt(getPercentile('WHIP').substring(0, 2)) === 0
  //     ? 0
  //     : parseInt(getPercentile('WHIP').substring(0, 2));
  // let walks =
  //   parseInt(getPercentile('BBPer9').substring(0, 2)) === 10
  //     ? 100
  //     : !parseInt(getPercentile('BBPer9').substring(0, 2)) === 0
  //     ? 0
  //     : parseInt(getPercentile('BBPer9').substring(0, 2));
  // let losses =
  //   parseInt(getPercentile('L').substring(0, 2)) === 10
  //     ? 100
  //     : !parseInt(getPercentile('L').substring(0, 2)) === 0
  //     ? 0
  //     : parseInt(getPercentile('L').substring(0, 2));
  // let homeRunsAgainst =
  //   parseInt(getPercentile('HRPer9').substring(0, 2)) === 10
  //     ? 100
  //     : !parseInt(getPercentile('HRPer9').substring(0, 2)) === 0
  //     ? 0
  //     : parseInt(getPercentile('HRPer9').substring(0, 2));
  // Plotting chart data
  // var hittersGraphData = [
  //   {
  //     category: 'ERA',
  //     score: era,
  //     fullMark: 100,
  //   },
  //   {
  //     category: 'WHIP',
  //     score: whip,
  //     fullMark: 100,
  //   },
  //   {
  //     category: 'Losses',
  //     score: losses,
  //     fullMark: 100,
  //   },
  //   {
  //     category: 'Walks',
  //     score: walks,
  //     fullMark: 100,
  //   },
  //   {
  //     category: 'Home Runs',
  //     score: homeRunsAgainst,
  //     fullMark: 100,
  //   },
  // ];

  console.log(pitcher);
  var logo = teamLogos.find((obj) => obj.team === pitcher.Team);
  return (
    <div className="playerCard">
      <h1>{pitcher.value}</h1>
      <h2>{pitcher.Team}</h2>
      <img className="teamLogo" height="10" src={logo.logo} />
      <p>
        Average + :<div className="fieldRank">{getRank(pitcher['ERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['ERA_rate'])}</span>
      </p>
      <p>
        Average + :<div className="fieldRank">{getRank(pitcher['ERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['ERA_rate'])}</span>
      </p>
      <p>
        Average + :<div className="fieldRank">{getRank(pitcher['ERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['ERA_rate'])}</span>
      </p>
      <p>
        Average + :<div className="fieldRank">{getRank(pitcher['ERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['ERA_rate'])}</span>
      </p>
      <p>
        Average + :<div className="fieldRank">{getRank(pitcher['ERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['ERA_rate'])}</span>
      </p>
      <p>
        Average + :<div className="fieldRank">{getRank(pitcher['ERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['ERA_rate'])}</span>
      </p>
      <p>
        Average + :<div className="fieldRank">{getRank(pitcher['ERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['ERA_rate'])}</span>
      </p>
      <p>
        Average + :<div className="fieldRank">{getRank(pitcher['ERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['ERA_rate'])}</span>
      </p>
      <p>
        Average + :<div className="fieldRank">{getRank(pitcher['ERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['ERA_rate'])}</span>
      </p>
      <p>
        Average + :<div className="fieldRank">{getRank(pitcher['ERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['ERA_rate'])}</span>
      </p>
    </div>
  );
};

{
  /* <h2 className="mlbTeamCardSubHeader">{selectedPlayer['position']}:</h2>
      <Select onChange={onChange} options={players} />
      {selectedPlayer ? (
        <div id={selectedPlayer.playerid} className="playerCard">
          <h1>{selectedPlayer.Name}</h1>
          <h2>{selectedPlayer.Team}</h2>
          <img className="teamLogo" height="10" src={logo.logo} />
          <p>
            ERA:
            <div className="fieldRank">{getRank('ERA', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('ERA')) }}>{getPercentile('ERA')}</span>
          </p>
          <p>
            WHIP:<div className="fieldRank">{getRank('WHIP', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('WHIP')) }}>{getPercentile('WHIP')}</span>
          </p>
          <p>
            Strikeouts:<div className="fieldRank">{getRank('SO')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('SO', 'positive')) }}>
              {getPercentile('SO', 'positive')}
            </span>
          </p>
          <p>
            Wins:<div className="fieldRank">{getRank('W')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('W', 'positive')) }}>
              {getPercentile('W', 'positive')}
            </span>
          </p>
          <p>
            Losses:<div className="fieldRank">{getRank('L', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('L')) }}>{getPercentile('L')}</span>
          </p>
          <p>
            Games:<div className="fieldRank">{getRank('G')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('G', 'positive')) }}>
              {getPercentile('G', 'positive')}
            </span>
          </p>
          <p>
            Innings:<div className="fieldRank">{getRank('IP')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('IP', 'positive')) }}>
              {getPercentile('IP', 'positive')}
            </span>
          </p>
          <p>
            Walks:<div className="fieldRank">{getRank('BB', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('BB')) }}>{getPercentile('BB')}</span>
          </p>
          <p>
            Hits:<div className="fieldRank">{getRank('H', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('H')) }}>{getPercentile('H')}</span>
          </p>
          <p>
            Home Runs:<div className="fieldRank">{getRank('HR', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('HR')) }}>{getPercentile('HR')}</span>
          </p>
          <div className="fullWidthChart">
            <h2 className="playerChart">Pitching Per 9</h2>
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
      )} */
}

export default SPitcherCard;
