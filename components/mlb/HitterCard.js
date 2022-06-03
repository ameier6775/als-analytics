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
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['PA_rate'])}</span>
      </p>
      <p>
        H:<div className="fieldRank">{getRank(hitter['SH_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['H_rate'])}</span>
      </p>
      <p>
        2B:<div className="fieldRank">{getRank(hitter['2B_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['2B_rate'])}</span>
      </p>
      <p>
        3B:<div className="fieldRank">{getRank(hitter['3B_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['3B_rate'])}</span>
      </p>
      <p>
        HR:<div className="fieldRank">{getRank(hitter['HR_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['HR_rate'])}</span>
      </p>
      <p>
        AVG:<div className="fieldRank">{getRank(hitter['AVG_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['AVG_rate'])}</span>
      </p>
      <p>
        R:<div className="fieldRank">{getRank(hitter['R_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['R_rate'])}</span>
      </p>
      <p>
        RBI:<div className="fieldRank">{getRank(hitter['RBI_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['RBI_rate'])}</span>
      </p>
      <p>
        OBP:<div className="fieldRank">{getRank(hitter['OBP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['OBP_rate'])}</span>
      </p>
      <p>
        SLG:<div className="fieldRank">{getRank(hitter['SLG_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['SLG_rate'])}</span>
      </p>
      <p>
        BABIP:<div className="fieldRank">{getRank(hitter['BABIP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['BABIP_rate'])}</span>
      </p>
      <p>
        SH:<div className="fieldRank">{getRank(hitter['SH_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['SH_rate'])}</span>
      </p>
      <p>
        SF:<div className="fieldRank">{getRank(hitter['SF_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['SF_rate'])}</span>
      </p>
      <p>
        BB/SO:<div className="fieldRank">{getRank(hitter['BBPerK_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['BBPerK_rate'])}</span>
      </p>
      <p>
        wRC+:<div className="fieldRank">{getRank(hitter['wRC+_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['wRC+_rate'])}</span>
      </p>
      <p>
        BB%:<div className="fieldRank">{getRank(hitter['BBRate_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['BBRate_rate'])}</span>
      </p>
      <p>
        SB:<div className="fieldRank">{getRank(hitter['SB_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['SB_rate'])}</span>
      </p>
      <p>
        Speed:<div className="fieldRank">{getRank(hitter['Spd_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['Spd_rate'])}</span>
      </p>
      <p>
        Baserunning:<div className="fieldRank">{getRank(hitter['UBR_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['UBR_rate'])}</span>
      </p>
      <p>
        Power:<div className="fieldRank">{getRank(hitter['ISO_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['ISO_rate'])}</span>
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
      {/* <p>
        OPS:<div className="fieldRank">{getRank(hitter['AVG_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['AVG_rate'])}</span>
      </p>
      <p>
        1B:<div className="fieldRank">{getRank(hitter['1B_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['1B_rate'])}</span>
      </p>
      <p>
        wGDP:<div className="fieldRank">{getRank(hitter['wGDP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['wGDP_rate'])}</span>
      </p>
      <p>
        wSB:<div className="fieldRank">{getRank(hitter['wSB_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['wSB_rate'])}</span>
      </p>
      <p>
        wRC:<div className="fieldRank">{getRank(hitter['wRC_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['wRC_rate'])}</span>
      </p>
      <p>
        wRAA:<div className="fieldRank">{getRank(hitter['wRAA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['wRAA_rate'])}</span>
      </p>
      <p>
        wOBA:<div className="fieldRank">{getRank(hitter['wOBA_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['wOBA_rate'])}</span>
      </p> 
      <p>
        BB:<div className="fieldRank">{getRank(hitter['BB_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['BB_rate'])}</span>
      </p>
      <p>
        SO:<div className="fieldRank">{getRank(hitter['SO_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['SO_rate'])}</span>
      </p>
      <p>
        GDP:<div className="fieldRank">{getRank(hitter['GDP_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['GDP_rate'])}</span>
      </p>
      <p>
        CS:<div className="fieldRank">{getRank(hitter['CS_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['CS_rate'])}</span>
      </p>
      <p>
        SO%:<div className="fieldRank">{getRank(hitter['KRate_rank'])}</div>
        <span style={{ backgroundColor: 'rgb(255, 174, 0)' }}>{getRatePercentage(hitter['KRate_rate'])}</span>
      </p> */}
    </div>
  );
};
export default HitterCard;
