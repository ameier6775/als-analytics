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

const TeamCard = ({ team }) => {
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

  // function getProductionPercentile(category, direction = 'positive') {
  //   var positionalArr = teams;
  //   var maxValue = Math.max.apply(
  //     Math,
  //     positionalArr.map((obj) => {
  //       return obj[category];
  //     }),
  //   );
  //   var minValue = Math.min.apply(
  //     Math,
  //     positionalArr.map((obj) => {
  //       return obj[category];
  //     }),
  //   );
  //   var difference = maxValue - minValue;
  //   var teamValue = selectedTeam[category];
  //   var result = (teamValue - minValue) / difference;
  //   if (direction === 'positive') {
  //     if (maxValue === teamValue) {
  //       return '100%';
  //     } else if (minValue === teamValue) {
  //       return '0%';
  //     } else if (result.toFixed(2).substring(2, 3) === '0') {
  //       return result.toFixed(2).substring(3, 4) + '%';
  //     } else {
  //       return result.toFixed(2).substring(2, 4) + '%';
  //     }
  //   } else if (direction === 'negative') {
  //     if (minValue === teamValue) {
  //       return '100%';
  //     } else if (maxValue === teamValue) {
  //       return '0%';
  //     } else if ((1 - result).toFixed(2).substring(2, 3) === '0') {
  //       return (1 - result).toFixed(2).substring(3, 4) + '%';
  //     } else {
  //       return (1 - result).toFixed(2).substring(2, 4) + '%';
  //     }
  //   }
  // }
  // function getRank(category, order = 'desc') {
  //   var resultArr = teams.slice();
  //   var rankArr = resultArr;
  //   if (order === 'desc') {
  //     rankArr.sort((a, b) => b[category] - a[category]);
  //   } else if (order === 'asc') {
  //     rankArr.sort((a, b) => a[category] - b[category]);
  //   }
  //   let categoryRank = rankArr.indexOf(selectedTeam) + 1;
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
  var hittersGraphData = [
    {
      category: 'Runs',
      score: getGraphField(team.hR_rate),
      fullMark: 100,
    },
    {
      category: 'Average',
      score: getGraphField(team.hAVG_rate),
      fullMark: 100,
    },
    {
      category: 'OBP',
      score: getGraphField(team.hOBP_rate),
      fullMark: 100,
    },
    {
      category: 'Walk per Strikeout',
      score: getGraphField(team.hBBPerK_rate),
      fullMark: 100,
    },
    {
      category: 'Home Runs',
      score: getGraphField(team.hHR_rate),
      fullMark: 100,
    },
  ];
  var pitchersGraphData = [
    {
      category: 'ERA',
      score: getGraphField(team.ERA_rate),
      fullMark: 100,
    },
    {
      category: 'Average',
      score: getGraphField(team.pAVG_rate),
      fullMark: 100,
    },

    {
      category: 'WHIP',
      score: getGraphField(team.pWHIP_rate),
      fullMark: 100,
    },
    {
      category: 'Strikeout per Walk',
      score: getGraphField(team.pKPerBB_rate),
      fullMark: 100,
    },
    {
      category: 'SIERA',
      score: getGraphField(team.SIERA_rate),
      fullMark: 100,
    },
  ];

  var logo = teamLogos.find((obj) => obj.team === team.value);

  return (
    <div id={team.value} className="playerCard">
      <h1>{team.value}</h1>
      <img className="teamLogo" height="10" src={logo.logo} />
      <p>
        Average + :<div className="fieldRank">{getRank(team['hAVG_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['hAVG_rate'])}</span>
      </p>
      <p>
        Singles + :<div className="fieldRank">{getRank(team['1B_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['1B_rate'])}</span>
      </p>
      <p>
        Doubles + :<div className="fieldRank">{getRank(team['2B_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['2B_rate'])}</span>
      </p>
      <p>
        Triples + :<div className="fieldRank">{getRank(team['3B_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['3B_rate'])}</span>
      </p>
      <p>
        Home Runs + :<div className="fieldRank">{getRank(team['hHR_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['hHR_rate'])}</span>
      </p>
      <p>
        Runs + :<div className="fieldRank">{getRank(team['hR_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['hR_rate'])}</span>
      </p>
      <p>
        RBIs + :<div className="fieldRank">{getRank(team['RBI_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['RBI_rate'])}</span>
      </p>
      <p>
        OBP + :<div className="fieldRank">{getRank(team['hOBP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['hOBP_rate'])}</span>
      </p>
      <p>
        SLG + :<div className="fieldRank">{getRank(team['hSLG_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['hSLG_rate'])}</span>
      </p>
      <p>
        Power + :<div className="fieldRank">{getRank(team['hISO_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['hISO_rate'])}</span>
      </p>
      <p>
        BABIP + :<div className="fieldRank">{getRank(team['hBABIP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['hBABIP_rate'])}</span>
      </p>
      <p>
        SB + :<div className="fieldRank">{getRank(team['hSB_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['hSB_rate'])}</span>
      </p>
      <p>
        BB / K + :<div className="fieldRank">{getRank(team['hBBPerK_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['hBBPerK_rate'])}</span>
      </p>
      <p>
        Base Running + :<div className="fieldRank">{getRank(team['hUBR_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['hUBR_rate'])}</span>
      </p>
      <p>
        wRC + :<div className="fieldRank">{getRank(team['hwRC+_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['hwRC+_rate'])}</span>
      </p>
      <div className="fullWidthChart">
        <h2 className="playerChart">Hitting</h2>
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
      <p>
        Average - :<div className="fieldRank">{getRank(team['pAVG_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['pAVG_rate'])}</span>
      </p>
      <p>
        Hits - :<div className="fieldRank">{getRank(team['pH_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['pH_rate'])}</span>
      </p>
      <p>
        Bases Against - :<div className="fieldRank">{getRank(team['pTBF_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['pTBF_rate'])}</span>
      </p>
      <p>
        BABIP - :<div className="fieldRank">{getRank(team['pBABIP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['pBABIP_rate'])}</span>
      </p>
      <p>
        LOB - :<div className="fieldRank">{getRank(team['pLOB_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['pLOB_rate'])}</span>
      </p>
      <p>
        ERA - :<div className="fieldRank">{getRank(team['ERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['ERA_rate'])}</span>
      </p>
      <p>
        WHIP - :<div className="fieldRank">{getRank(team['pWHIP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['pWHIP_rate'])}</span>
      </p>
      <p>
        K per 9 - :<div className="fieldRank">{getRank(team['pKPer9_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['pKPer9_rate'])}</span>
      </p>
      <p>
        BB per 9 - :<div className="fieldRank">{getRank(team['pBBPer9_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['pBBPer9_rate'])}</span>
      </p>
      <p>
        HR per 9 - :<div className="fieldRank">{getRank(team['pHRPer9_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['pHRPer9_rate'])}</span>
      </p>
      <p>
        SIERA - :<div className="fieldRank">{getRank(team['SIERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['SIERA_rate'])}</span>
      </p>
      <p>
        K per BB - :<div className="fieldRank">{getRank(team['pKPerBB_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['pKPerBB_rate'])}</span>
      </p>
      <p>
        Innings - :<div className="fieldRank">{getRank(team['IP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['IP_rate'])}</span>
      </p>
      <p>
        Wins - :<div className="fieldRank">{getRank(team['wins_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['wins_rate'])}</span>
      </p>
      <p>
        Losses - :<div className="fieldRank">{getRank(team['losses_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(team['losses_rate'])}</span>
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
  );
};
export default TeamCard;
