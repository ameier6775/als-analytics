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

const CompareRelieversCard = ({ comparisonRelievers }) => {
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
  // Background color for fields
  function getColor(team, field) {
    let resultArr = comparisonRelievers.slice();
    let comparisonArray = resultArr.sort(function (a, b) {
      return b[field] - a[field];
    });
    let comparedTeam = comparisonArray.find((obj) => obj.value === team);
    let rank = comparisonArray.indexOf(comparedTeam) + 1;
    let color = 'rgba(';
    if (comparisonArray.length >= 6) {
      let comparisonFactor = Math.floor(comparisonArray.length / 3);
      color +=
        rank > comparisonFactor * 2
          ? '255, 51, 51)'
          : rank > comparisonFactor && rank <= comparisonFactor * 2
          ? '255, 205, 0)'
          : rank <= comparisonFactor
          ? '51, 255, 74)'
          : '0, 0, 0)';
    } else {
      color +=
        rank === comparisonArray.length
          ? '255, 51, 51)'
          : rank != 1
          ? '255, 205, 0)'
          : rank === 1
          ? '51, 255, 74)'
          : '0, 0, 0)';
    }
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
  return (
    <div>
      {comparisonRelievers ? (
        comparisonRelievers.map((reliever) => (
          <div className="compareContainer" key={reliever.value}>
            <h1>{reliever.value}</h1>
            <img className="teamLogo" height="10" src={teamLogos.find((obj) => obj.team === reliever.Team).logo} />
            <p>IP:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'IP_rate') }}>
              {getRatePercentage(reliever.IP_rate) + ' (' + getRank(reliever.IP_rank) + ')'}
            </span>
            <p>SV:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'SV_rate') }}>
              {getRatePercentage(reliever.SV_rate) + ' (' + getRank(reliever.SV_rank) + ')'}
            </span>
            <p>HLD:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'HLD_rate') }}>
              {getRatePercentage(reliever.HLD_rate) + ' (' + getRank(reliever.HLD_rank) + ')'}
            </span>
            <p>BS:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'BS_rate') }}>
              {getRatePercentage(reliever.BS_rate) + ' (' + getRank(reliever.BS_rank) + ')'}
            </span>
            <p>W:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'W_rate') }}>
              {getRatePercentage(reliever.W_rate) + ' (' + getRank(reliever.W_rank) + ')'}
            </span>
            <p>L:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'L_rate') }}>
              {getRatePercentage(reliever.L_rate) + ' (' + getRank(reliever.L_rank) + ')'}
            </span>
            <p>AVG:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'AVG_rate') }}>
              {getRatePercentage(reliever.AVG_rate) + ' (' + getRank(reliever.AVG_rank) + ')'}
            </span>
            <p>ERA:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'ERA_rate') }}>
              {getRatePercentage(reliever.ERA_rate) + ' (' + getRank(reliever.ERA_rank) + ')'}
            </span>
            <p>ERA ADJ:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'ERA-_rate') }}>
              {getRatePercentage(reliever['ERA-_rate']) + ' (' + getRank(reliever['ERA-_rank']) + ')'}
            </span>
            <p>SIERA:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'SIERA_rate') }}>
              {getRatePercentage(reliever.SIERA_rate) + ' (' + getRank(reliever.SIERA_rank) + ')'}
            </span>
            <p>WHIP:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'WHIP_rate') }}>
              {getRatePercentage(reliever.WHIP_rate) + ' (' + getRank(reliever.WHIP_rank) + ')'}
            </span>
            <p>FIP:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'FIP_rate') }}>
              {getRatePercentage(reliever.FIP_rate) + ' (' + getRank(reliever.FIP_rank) + ')'}
            </span>
            <p>FIP ADJ:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'FIP-_rate') }}>
              {getRatePercentage(reliever['FIP-_rate']) + ' (' + getRank(reliever['FIP-_rank']) + ')'}
            </span>
            <p>ERA - FIP:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'E-F_rate') }}>
              {getRatePercentage(reliever['E-F_rate']) + ' (' + getRank(reliever['E-F_rank']) + ')'}
            </span>
            <p>K / 9:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'K/9_rate') }}>
              {getRatePercentage(reliever['K/9_rate']) + ' (' + getRank(reliever['K/9_rank']) + ')'}
            </span>
            <p>BB / 9:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'BB/9_rate') }}>
              {getRatePercentage(reliever['BB/9_rate']) + ' (' + getRank(reliever['BB/9_rank']) + ')'}
            </span>
            <p>HR / 9:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'HR/9_rate') }}>
              {getRatePercentage(reliever['HR/9_rate']) + ' (' + getRank(reliever['HR/9_rank']) + ')'}
            </span>
            <p>LOB %:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'LOB%_rate') }}>
              {getRatePercentage(reliever['LOB%_rate']) + ' (' + getRank(reliever['LOB%_rank']) + ')'}
            </span>
            <p>TBF:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'TBF_rate') }}>
              {getRatePercentage(reliever.TBF_rate) + ' (' + getRank(reliever.TBF_rank) + ')'}
            </span>
            <p>WP:</p>
            <span style={{ backgroundColor: getColor(reliever.value, 'WP_rate') }}>
              {getRatePercentage(reliever.WP_rate) + ' (' + getRank(reliever.WP_rank) + ')'}
            </span>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default CompareRelieversCard;
