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

const CompareHittersCard = ({ comparisonHitters }) => {
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
    let resultArr = comparisonHitters.slice();
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
      {comparisonHitters ? (
        comparisonHitters.map((hitter) => (
          <div className="compareContainer" key={hitter.value}>
            <h2>{hitter.value}</h2>
            <img className="teamLogo" height="10" src={teamLogos.find((obj) => obj.team === hitter.Team).logo} />
            <p>PA:</p>
            <span style={{ backgroundColor: getColor(hitter.value, 'PA_rate') }}>
              {getRatePercentage(hitter.PA_rate) + ' (' + getRank(hitter.PA_rank) + ')'}
            </span>
            <p>AVG:</p>
            <span style={{ backgroundColor: getColor(hitter.value, 'AVG_rate') }}>
              {getRatePercentage(hitter.AVG_rate) + ' (' + getRank(hitter.AVG_rank) + ')'}
            </span>
            <p>OBP:</p>
            <span style={{ backgroundColor: getColor(hitter.value, 'OBP_rate') }}>
              {getRatePercentage(hitter['OBP_rate']) + ' (' + getRank(hitter['OBP_rank']) + ')'}
            </span>
            <p>R:</p>
            <span style={{ backgroundColor: getColor(hitter.value, 'R_rate') }}>
              {getRatePercentage(hitter.R_rate) + ' (' + getRank(hitter.R_rank) + ')'}
            </span>
            <p>RBI:</p>
            <span style={{ backgroundColor: getColor(hitter.value, 'RBI_rate') }}>
              {getRatePercentage(hitter.RBI_rate) + ' (' + getRank(hitter.RBI_rank) + ')'}
            </span>
            <p>HR:</p>
            <span style={{ backgroundColor: getColor(hitter.value, 'HR_rate') }}>
              {getRatePercentage(hitter.HR_rate) + ' (' + getRank(hitter.HR_rank) + ')'}
            </span>
            <p>SLG:</p>
            <span style={{ backgroundColor: getColor(hitter.value, 'SLG_rate') }}>
              {getRatePercentage(hitter.SLG_rate) + ' (' + getRank(hitter.SLG_rank) + ')'}
            </span>
            <p>BB%:</p>
            <span style={{ backgroundColor: getColor(hitter.value, 'BB%_rate') }}>
              {getRatePercentage(hitter['BB%_rate']) + ' (' + getRank(hitter['BB%_rank']) + ')'}
            </span>
            <p>K%:</p>
            <span style={{ backgroundColor: getColor(hitter.value, 'K%_rate') }}>
              {getRatePercentage(hitter['K%_rate']) + ' (' + getRank(hitter['K%_rank']) + ')'}
            </span>
            <p>SB:</p>
            <span style={{ backgroundColor: getColor(hitter.value, 'SB_rate') }}>
              {getRatePercentage(hitter.SB_rate) + ' (' + getRank(hitter.SB_rank) + ')'}
            </span>
            <p>SPD:</p>
            <span style={{ backgroundColor: getColor(hitter.value, 'Spd_rate') }}>
              {getRatePercentage(hitter.Spd_rate) + ' (' + getRank(hitter.Spd_rank) + ')'}
            </span>
            <p>UBR:</p>
            <span style={{ backgroundColor: getColor(hitter.value, 'UBR_rate') }}>
              {getRatePercentage(hitter.UBR_rate) + ' (' + getRank(hitter.UBR_rank) + ')'}
            </span>
            <p>wRC+:</p>
            <span style={{ backgroundColor: getColor(hitter.value, 'wRC+_rate') }}>
              {getRatePercentage(hitter['wRC+_rate']) + ' (' + getRank(hitter['wRC+_rank']) + ')'}
            </span>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default CompareHittersCard;
