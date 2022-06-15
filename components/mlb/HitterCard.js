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

const HitterCard = ({ hitter }) => {
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
  // Plotting chart data - AVG, RBI, R, OPS, wRC+
  var hittersGraphData = [
    {
      category: 'Average',
      score: getGraphField(hitter.AVG_rate),
      fullMark: 100,
    },
    {
      category: 'Runs',
      score: getGraphField(hitter.R_rate),
      fullMark: 100,
    },
    {
      category: 'RBIs',
      score: getGraphField(hitter.RBI_rate),
      fullMark: 100,
    },
    {
      category: 'OPS',
      score: getGraphField(hitter.OPS_rate),
      fullMark: 100,
    },
    {
      category: 'wRC+',
      score: getGraphField(hitter['wRC+_rate']),
      fullMark: 100,
    },
  ];
  // Team Logo
  var logo = teamLogos.find((obj) => obj.team === hitter.Team);
  return (
    <div className="playerCard">
      <h1>{hitter.value}</h1>
      <h2>{hitter.Team}</h2>
      <img className="teamLogo" height="10" src={logo.logo} />
      <p>
        PA:<div className="fieldRank">{getRank(hitter['PA_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.PA_rate) }}>
          {getRatePercentage(hitter['PA_rate']) + ' (' + hitter['PA'] + ')'}
        </span>
      </p>
      <p>
        H:<div className="fieldRank">{getRank(hitter['H_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.H_rate) }}>
          {getRatePercentage(hitter['H_rate']) + ' (' + hitter['H'] + ')'}
        </span>
      </p>
      <p>
        2B:<div className="fieldRank">{getRank(hitter['2B_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter['2B_rate']) }}>
          {getRatePercentage(hitter['2B_rate']) + ' (' + hitter['2B'] + ')'}
        </span>
      </p>
      <p>
        3B:<div className="fieldRank">{getRank(hitter['3B_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter['3B_rate']) }}>
          {getRatePercentage(hitter['3B_rate']) + ' (' + hitter['3B'] + ')'}
        </span>
      </p>
      <p>
        HR:<div className="fieldRank">{getRank(hitter['HR_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.HR_rate) }}>
          {getRatePercentage(hitter['HR_rate']) + ' (' + hitter['HR'] + ')'}
        </span>
      </p>
      <p>
        AVG:<div className="fieldRank">{getRank(hitter['AVG_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.AVG_rate) }}>
          {getRatePercentage(hitter['AVG_rate']) + ' (' + hitter['AVG'] + ')'}
        </span>
      </p>
      <p>
        R:<div className="fieldRank">{getRank(hitter['R_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.R_rate) }}>
          {getRatePercentage(hitter['R_rate']) + ' (' + hitter['R'] + ')'}
        </span>
      </p>
      <p>
        RBI:<div className="fieldRank">{getRank(hitter['RBI_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.RBI_rate) }}>
          {getRatePercentage(hitter['RBI_rate']) + ' (' + hitter['RBI'] + ')'}
        </span>
      </p>
      <p>
        OBP:<div className="fieldRank">{getRank(hitter['OBP_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.OBP_rate) }}>
          {getRatePercentage(hitter['OBP_rate']) + ' (' + hitter['OBP'] + ')'}
        </span>
      </p>
      <p>
        SLG:<div className="fieldRank">{getRank(hitter['SLG_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.SLG_rate) }}>
          {getRatePercentage(hitter['SLG_rate']) + ' (' + hitter['SLG'] + ')'}
        </span>
      </p>
      <p>
        BABIP:<div className="fieldRank">{getRank(hitter['BABIP_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.BABIP_rate) }}>
          {getRatePercentage(hitter['BABIP_rate']) + ' (' + hitter['BABIP'] + ')'}
        </span>
      </p>
      <p>
        SH:<div className="fieldRank">{getRank(hitter['SH_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.SH_rate) }}>
          {getRatePercentage(hitter['SH_rate']) + ' (' + hitter['SH'] + ')'}
        </span>
      </p>
      <p>
        SF:<div className="fieldRank">{getRank(hitter['SF_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.SF_rate) }}>
          {getRatePercentage(hitter['SF_rate']) + ' (' + hitter['SF'] + ')'}
        </span>
      </p>
      <p>
        BB/SO:<div className="fieldRank">{getRank(hitter['BB/K_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter['BB/K_rate']) }}>
          {getRatePercentage(hitter['BB/K_rate']) + ' (' + hitter['BB/K'] + ')'}
        </span>
      </p>
      <p>
        wRC+:<div className="fieldRank">{getRank(hitter['wRC+_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter['wRC+_rate']) }}>
          {getRatePercentage(hitter['wRC+_rate']) + ' (' + hitter['wRC+'] + ')'}
        </span>
      </p>
      <p>
        BB%:<div className="fieldRank">{getRank(hitter['BB%_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter['BB%_rate']) }}>
          {getRatePercentage(hitter['BB%_rate']) + ' (' + hitter['BB%'] + ')'}
        </span>
      </p>
      <p>
        SB:<div className="fieldRank">{getRank(hitter['SB_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.SB_rate) }}>
          {getRatePercentage(hitter['SB_rate']) + ' (' + hitter['SB'] + ')'}
        </span>
      </p>
      <p>
        Spd:<div className="fieldRank">{getRank(hitter['Spd_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.Spd_rate) }}>
          {getRatePercentage(hitter['Spd_rate']) + ' (' + hitter['Spd'] + ')'}
        </span>
      </p>
      <p>
        uBR:<div className="fieldRank">{getRank(hitter['UBR_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.UBR_rate) }}>
          {getRatePercentage(hitter['UBR_rate']) + ' (' + hitter['UBR'] + ')'}
        </span>
      </p>
      <p>
        ISO:<div className="fieldRank">{getRank(hitter['ISO_rank'])}</div>
        <span style={{ backgroundColor: getColor(hitter.ISO_rate) }}>
          {getRatePercentage(hitter['ISO_rate']) + ' (' + hitter['ISO'] + ')'}
        </span>
      </p>
      <div className="fullWidthChart">
        <h2 className="playerChart">Hitter</h2>
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
  );
};
export default HitterCard;
