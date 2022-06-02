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
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['W_rate'])}</span>
      </p>
      <p>
        L:<div className="fieldRank">{getRank(pitcher['L_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['L_rate'])}</span>
      </p>
      <p>
        ERA:<div className="fieldRank">{getRank(pitcher['ERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['ERA_rate'])}</span>
      </p>
      <p>
        G:<div className="fieldRank">{getRank(pitcher['GS_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['GS_rate'])}</span>
      </p>
      <p>
        ShO:<div className="fieldRank">{getRank(pitcher['ShO_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['ShO_rate'])}</span>
      </p>
      <p>
        IP:<div className="fieldRank">{getRank(pitcher['IP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['IP_rate'])}</span>
      </p>
      <p>
        TBF:<div className="fieldRank">{getRank(pitcher['TBF_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['TBF_rate'])}</span>
      </p>
      <p>
        H:<div className="fieldRank">{getRank(pitcher['H_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['H_rate'])}</span>
      </p>
      <p>
        HR:<div className="fieldRank">{getRank(pitcher['HR_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['HR_rate'])}</span>
      </p>
      <p>
        BB:<div className="fieldRank">{getRank(pitcher['BB_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['BB_rate'])}</span>
      </p>
      <p>
        WP:<div className="fieldRank">{getRank(pitcher['WP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['WP_rate'])}</span>
      </p>
      <p>
        K:<div className="fieldRank">{getRank(pitcher['SO_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['SO_rate'])}</span>
      </p>
      <p>
        K / 9:<div className="fieldRank">{getRank(pitcher['KPer9_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['KPer9_rate'])}</span>
      </p>
      <p>
        BB / 9:<div className="fieldRank">{getRank(pitcher['BBPer9_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['BBPer9_rate'])}</span>
      </p>
      <p>
        K / BB:<div className="fieldRank">{getRank(pitcher['KPerBB_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['KPerBB_rate'])}</span>
      </p>
      <p>
        K%:<div className="fieldRank">{getRank(pitcher['KRate_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['KRate_rate'])}</span>
      </p>
      <p>
        BB%:<div className="fieldRank">{getRank(pitcher['BBRate_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['BBRate_rate'])}</span>
      </p>
      <p>
        K/BB%:<div className="fieldRank">{getRank(pitcher['KPerBBRate_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['KPerBBRate_rate'])}</span>
      </p>
      <p>
        AVG:<div className="fieldRank">{getRank(pitcher['AVG_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['AVG_rate'])}</span>
      </p>
      <p>
        WHIP:<div className="fieldRank">{getRank(pitcher['WHIP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['WHIP_rate'])}</span>
      </p>
      <p>
        BABIP:<div className="fieldRank">{getRank(pitcher['BABIP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['BABIP_rate'])}</span>
      </p>
      <p>
        LOB%:<div className="fieldRank">{getRank(pitcher['LOBRate_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['LOBRate_rate'])}</span>
      </p>
      <p>
        ERA adj:<div className="fieldRank">{getRank(pitcher['ERAadj_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['ERAadj_rate'])}</span>
      </p>
      <p>
        FIP adj:<div className="fieldRank">{getRank(pitcher['FIPadj_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['FIPadj_rate'])}</span>
      </p>
      <p>
        xFIP adj:<div className="fieldRank">{getRank(pitcher['xFIPadj_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['xFIPadj_rate'])}</span>
      </p>
      <p>
        FIP:<div className="fieldRank">{getRank(pitcher['FIP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['FIP_rate'])}</span>
      </p>
      <p>
        EF:<div className="fieldRank">{getRank(pitcher['EF_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['EF_rate'])}</span>
      </p>
      <p>
        xFIP:<div className="fieldRank">{getRank(pitcher['xFIP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['xFIP_rate'])}</span>
      </p>
      <p>
        SIERA:<div className="fieldRank">{getRank(pitcher['SIERA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(pitcher['SIERA_rate'])}</span>
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
