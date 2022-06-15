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
  // Background color for fields (currently not being used)
  function getColor(field) {
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
  console.log(team);

  return (
    <div id={team.value} className="playerCard">
      <h1>{team.value}</h1>
      <img className="teamLogo" height="10" src={logo.logo} />
      <p>
        AVG:<div className="fieldRank">{getRank(team['hAVG_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.hAVG_rate) }}>
          {getRatePercentage(team['hAVG_rate']) + ' (' + team.hAVG.toString() + ')'}
        </span>
      </p>
      <p>
        1B:<div className="fieldRank">{getRank(team['1B_rank'])}</div>
        <span style={{ backgroundColor: getColor(team['1B_rate']) }}>
          {getRatePercentage(team['1B_rate']) + ' (' + team['1B'] + ')'}
        </span>
      </p>
      <p>
        2B:<div className="fieldRank">{getRank(team['2B_rank'])}</div>
        <span style={{ backgroundColor: getColor(team['2B_rate']) }}>
          {getRatePercentage(team['2B_rate']) + ' (' + team['2B'] + ')'}
        </span>
      </p>
      <p>
        3B:<div className="fieldRank">{getRank(team['3B_rank'])}</div>
        <span style={{ backgroundColor: getColor(team['3B_rate']) }}>
          {getRatePercentage(team['3B_rate']) + ' (' + team['3B'] + ')'}
        </span>
      </p>
      <p>
        HR:<div className="fieldRank">{getRank(team['hHR_rank'])}</div>
        <span style={{ backgroundColor: getColor(team['hHR_rate']) }}>
          {getRatePercentage(team['hHR_rate']) + ' (' + team['hHR'] + ')'}
        </span>
      </p>
      <p>
        R:<div className="fieldRank">{getRank(team['hR_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.hR_rate) }}>
          {getRatePercentage(team['hR_rate']) + ' (' + team['hR'] + ')'}
        </span>
      </p>
      <p>
        RBI:<div className="fieldRank">{getRank(team['RBI_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.RBI_rate) }}>
          {getRatePercentage(team['RBI_rate']) + ' (' + team['RBI'] + ')'}
        </span>
      </p>
      <p>
        OBP:<div className="fieldRank">{getRank(team['hOBP_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.hOBP_rate) }}>
          {getRatePercentage(team['hOBP_rate']) + ' (' + team['hOBP'] + ')'}
        </span>
      </p>
      <p>
        SLG:<div className="fieldRank">{getRank(team['hSLG_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.hSLG_rate) }}>
          {getRatePercentage(team['hSLG_rate']) + ' (' + team['hSLG'] + ')'}
        </span>
      </p>
      <p>
        ISO:<div className="fieldRank">{getRank(team['hISO_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.hISO_rate) }}>
          {getRatePercentage(team['hISO_rate']) + ' (' + team['hISO'] + ')'}
        </span>
      </p>
      <p>
        BABIP:<div className="fieldRank">{getRank(team['hBABIP_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.hBABIP_rate) }}>
          {getRatePercentage(team['hBABIP_rate']) + ' (' + team['hBABIP'] + ')'}
        </span>
      </p>
      <p>
        SB:<div className="fieldRank">{getRank(team['hSB_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.hSB_rate) }}>
          {getRatePercentage(team['hSB_rate']) + ' (' + team['hSB'] + ')'}
        </span>
      </p>
      <p>
        BB / K:<div className="fieldRank">{getRank(team['hBBPerK_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.hBBPerK_rate) }}>
          {getRatePercentage(team['hBBPerK_rate']) + ' (' + team['hBBperK'] + ')'}
        </span>
      </p>
      <p>
        Base Running:<div className="fieldRank">{getRank(team['hUBR_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.hUBR_rate) }}>
          {getRatePercentage(team['hUBR_rate']) + ' (' + team['hUBR'] + ')'}
        </span>
      </p>
      <p>
        wRC+:<div className="fieldRank">{getRank(team['hwRC+_rank'])}</div>
        <span style={{ backgroundColor: getColor(team['hwRC+_rate']) }}>
          {getRatePercentage(team['hwRC+_rate']) + ' (' + team['wRC+'] + ')'}
        </span>
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
        AVG:<div className="fieldRank">{getRank(team['pAVG_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.pAVG_rate) }}>
          {getRatePercentage(team['pAVG_rate']) + ' (' + team['pAVG'] + ')'}
        </span>
      </p>
      <p>
        Hits:<div className="fieldRank">{getRank(team['pH_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.pH_rate) }}>
          {getRatePercentage(team['pH_rate']) + ' (' + team['pH'] + ')'}
        </span>
      </p>
      <p>
        TBA:<div className="fieldRank">{getRank(team['pTBF_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.pTBF_rate) }}>
          {getRatePercentage(team['pTBF_rate']) + ' (' + team['pTBF'] + ')'}
        </span>
      </p>
      <p>
        BABIP:<div className="fieldRank">{getRank(team['pBABIP_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.pBABIP_rate) }}>
          {getRatePercentage(team['pBABIP_rate']) + ' (' + team['pBABIP'] + ')'}
        </span>
      </p>
      <p>
        LOB:<div className="fieldRank">{getRank(team['pLOB_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.pLOB_rate) }}>
          {getRatePercentage(team['pLOB_rate']) + ' (' + team['pLOBrate'] + ')'}
        </span>
      </p>
      <p>
        ERA:<div className="fieldRank">{getRank(team['ERA_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.ERA_rate) }}>
          {getRatePercentage(team['ERA_rate']) + ' (' + team['ERA'] + ')'}
        </span>
      </p>
      <p>
        WHIP:<div className="fieldRank">{getRank(team['pWHIP_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.pWHIP_rate) }}>
          {getRatePercentage(team['pWHIP_rate']) + ' (' + team['WHIP'] + ')'}
        </span>
      </p>
      <p>
        K per 9:<div className="fieldRank">{getRank(team['pKPer9_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.pKPer9_rate) }}>
          {getRatePercentage(team['pKPer9_rate']) + ' (' + team['pKper9'] + ')'}
        </span>
      </p>
      <p>
        BB per 9:<div className="fieldRank">{getRank(team['pBBPer9_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.pBBPer9_rate) }}>
          {getRatePercentage(team['pBBPer9_rate']) + ' (' + team['pBBper9'] + ')'}
        </span>
      </p>
      <p>
        HR per 9:<div className="fieldRank">{getRank(team['pHRPer9_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.pHRPer9_rate) }}>
          {getRatePercentage(team['pHRPer9_rate']) + ' (' + team['pHRper9'] + ')'}
        </span>
      </p>
      <p>
        SIERA:<div className="fieldRank">{getRank(team['SIERA_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.SIERA_rate) }}>
          {getRatePercentage(team['SIERA_rate']) + ' (' + team['SIERA'] + ')'}
        </span>
      </p>
      <p>
        K per BB:<div className="fieldRank">{getRank(team['pKPerBB_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.pKPerBB_rate) }}>
          {getRatePercentage(team['pKPerBB_rate']) + ' (' + team['pKperBB'] + ')'}
        </span>
      </p>
      <p>
        IP:<div className="fieldRank">{getRank(team['IP_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.IP_rate) }}>
          {getRatePercentage(team['IP_rate']) + ' (' + team['innings_pitched'] + ')'}
        </span>
      </p>
      <p>
        W:<div className="fieldRank">{getRank(team['wins_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.wins_rate) }}>
          {getRatePercentage(team['wins_rate']) + ' (' + team['wins'] + ')'}
        </span>
      </p>
      <p>
        L:<div className="fieldRank">{getRank(team['losses_rank'])}</div>
        <span style={{ backgroundColor: getColor(team.losses_rate) }}>
          {getRatePercentage(team['losses_rate']) + ' (' + team['losses'] + ')'}
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
