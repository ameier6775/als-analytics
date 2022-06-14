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
  // Background color for fields (currently not being used)
  function getColor(field) {
    console.log(field);
    let color = 'rgba(';
    color +=
      field <= 0.33
        ? '255, 51, 51)'
        : field > 0.33 && field <= 0.66
        ? '255, 205, 0)'
        : field > 0.66
        ? '51, 255, 74)'
        : '0, 0, 0)';
    return color;
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
  // Plotting chart data - ERA, WHIP, IP,
  var pitchersChartData = [
    {
      category: 'IP',
      score: getGraphField(pitcher.IP_rate),
      fullMark: 100,
    },
    {
      category: 'ERA',
      score: getGraphField(pitcher.ERA_rate),
      fullMark: 100,
    },
    {
      category: 'WHIP',
      score: getGraphField(pitcher.WHIP_rate),
      fullMark: 100,
    },
    {
      category: 'K',
      score: getGraphField(pitcher.SO_rate),
      fullMark: 100,
    },
    {
      category: 'SIERA',
      score: getGraphField(pitcher.SIERA_rate),
      fullMark: 100,
    },
  ];
  // Team Logo
  var logo = teamLogos.find((obj) => obj.team === pitcher.Team);
  return (
    <div className="playerCard">
      <h1>{pitcher.value}</h1>
      <h2>{pitcher.Team}</h2>
      <img className="teamLogo" height="10" src={logo.logo} />
      <p>
        W:<div className="fieldRank">{getRank(pitcher['W_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher.W_rate) }}>{getRatePercentage(pitcher['W_rate'])}</span>
      </p>
      <p>
        L:<div className="fieldRank">{getRank(pitcher['L_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher.L_rate) }}>{getRatePercentage(pitcher['L_rate'])}</span>
      </p>
      <p>
        GS:<div className="fieldRank">{getRank(pitcher['GS_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher.GS_rate) }}>{getRatePercentage(pitcher['GS_rate'])}</span>
      </p>
      <p>
        TB:<div className="fieldRank">{getRank(pitcher['TBF_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher.TBF_rate) }}>{getRatePercentage(pitcher['TBF_rate'])}</span>
      </p>
      <p>
        Shutouts:<div className="fieldRank">{getRank(pitcher['ShO_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher.ShO_rate) }}>{getRatePercentage(pitcher['ShO_rate'])}</span>
      </p>
      <p>
        WHIP:<div className="fieldRank">{getRank(pitcher['WHIP_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher.WHIP_rate) }}>{getRatePercentage(pitcher['WHIP_rate'])}</span>
      </p>
      <p>
        K%:<div className="fieldRank">{getRank(pitcher['K%_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher['K%_rate']) }}>{getRatePercentage(pitcher['K%_rate'])}</span>
      </p>
      <p>
        ERA:<div className="fieldRank">{getRank(pitcher['ERA_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher.ERA_rate) }}>{getRatePercentage(pitcher['ERA_rate'])}</span>
      </p>
      <p>
        ERA ADJ:<div className="fieldRank">{getRank(pitcher['ERA-_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher['ERA-_rate']) }}>
          {getRatePercentage(pitcher['ERA-_rate'])}
        </span>
      </p>
      <p>
        SIERA:<div className="fieldRank">{getRank(pitcher['SIERA_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher.SIERA_rate) }}>
          {getRatePercentage(pitcher['SIERA_rate'])}
        </span>
      </p>
      <p>
        IP:<div className="fieldRank">{getRank(pitcher['IP_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher.IP_rate) }}>{getRatePercentage(pitcher['IP_rate'])}</span>
      </p>
      <p>
        FIP:<div className="fieldRank">{getRank(pitcher['FIP_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher.FIP_rate) }}>{getRatePercentage(pitcher['FIP_rate'])}</span>
      </p>
      <p>
        FIP ADJ:<div className="fieldRank">{getRank(pitcher['FIP-_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher['FIP-_rate']) }}>
          {getRatePercentage(pitcher['FIP-_rate'])}
        </span>
      </p>
      <p>
        xFIP:<div className="fieldRank">{getRank(pitcher['xFIP_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher['xFIP_rate']) }}>
          {getRatePercentage(pitcher['xFIP_rate'])}
        </span>
      </p>
      <p>
        xFIP ADJ:<div className="fieldRank">{getRank(pitcher['xFIP-_rank'])}</div>
        <span style={{ backgroundColor: getColor(pitcher['xFIP-_rate']) }}>
          {getRatePercentage(pitcher['xFIP-_rate'])}
        </span>
      </p>
      <div className="fullWidthChart">
        <h2 className="playerChart">Starter</h2>
        <LineChart
          width={1200}
          height={280}
          data={pitchersChartData}
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
export default SPitcherCard;
