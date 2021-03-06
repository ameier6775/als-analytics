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

const CompareStartersCard = ({ comparisonStarters }) => {
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
    let resultArr = comparisonStarters.slice();
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
      {comparisonStarters ? (
        comparisonStarters.map((starter) => (
          <div className="compareContainer" key={starter.value}>
            <h1>{starter.value}</h1>
            <img className="teamLogo" height="10" src={teamLogos.find((obj) => obj.team === starter.Team).logo} />
            <h3 className="fieldSubheader">Record:</h3>
            <p>W:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'W_rate') }}>
              {starter.W + ' - ' + getRatePercentage(starter.W_rate) + ' (' + getRank(starter.W_rank) + ')'}
            </span>
            <p>L:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'L_rate') }}>
              {starter.L + ' - ' + getRatePercentage(starter.L_rate) + ' (' + getRank(starter.L_rank) + ')'}
            </span>
            <h3 className="fieldSubheader">Usage:</h3>
            <p>GS:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'GS_rate') }}>
              {starter.GS + ' - ' + getRatePercentage(starter.GS_rate) + ' (' + getRank(starter.GS_rank) + ')'}
            </span>
            <p>IP:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'IP_rate') }}>
              {starter.IP + ' - ' + getRatePercentage(starter.IP_rate) + ' (' + getRank(starter.IP_rank) + ')'}
            </span>
            <h3 className="fieldSubheader">Production:</h3>
            <p>AVG:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'AVG_rate') }}>
              {starter.AVG + ' - ' + getRatePercentage(starter.AVG_rate) + ' (' + getRank(starter.AVG_rank) + ')'}
            </span>
            <p>ERA:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'ERA_rate') }}>
              {starter.ERA + ' - ' + getRatePercentage(starter.ERA_rate) + ' (' + getRank(starter.ERA_rank) + ')'}
            </span>
            <p>FIP:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'FIP_rate') }}>
              {starter.FIP + ' - ' + getRatePercentage(starter.FIP_rate) + ' (' + getRank(starter.FIP_rank) + ')'}
            </span>
            <p>WHIP:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'WHIP_rate') }}>
              {starter.WHIP + ' - ' + getRatePercentage(starter.WHIP_rate) + ' (' + getRank(starter.WHIP_rank) + ')'}
            </span>
            <h3 className="fieldSubheader">Projection:</h3>
            <p>ERA ADJ:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'ERA-_rate') }}>
              {starter['ERA-'] +
                ' - ' +
                getRatePercentage(starter['ERA-_rate']) +
                ' (' +
                getRank(starter['ERA-_rank']) +
                ')'}
            </span>
            <p>FIP ADJ:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'FIP-_rate') }}>
              {starter['FIP-'] +
                ' - ' +
                getRatePercentage(starter['FIP-_rate']) +
                ' (' +
                getRank(starter['FIP-_rank']) +
                ')'}
            </span>
            <p>SIERA:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'SIERA_rate') }}>
              {starter.SIERA + ' - ' + getRatePercentage(starter.SIERA_rate) + ' (' + getRank(starter.SIERA_rank) + ')'}
            </span>
            <h3 className="fieldSubheader">Per 9:</h3>
            <p>K / 9:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'K/9_rate') }}>
              {starter['K/9'] +
                ' - ' +
                getRatePercentage(starter['K/9_rate']) +
                ' (' +
                getRank(starter['K/9_rank']) +
                ')'}
            </span>
            <p>BB / 9:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'BB/9_rate') }}>
              {starter['BB/9'] +
                ' - ' +
                getRatePercentage(starter['BB/9_rate']) +
                ' (' +
                getRank(starter['BB/9_rank']) +
                ')'}
            </span>
            <p>HR / 9:</p>
            <span style={{ backgroundColor: getColor(starter.value, 'HR/9_rate') }}>
              {starter['HR/9'] +
                ' - ' +
                getRatePercentage(starter['HR/9_rate']) +
                ' (' +
                getRank(starter['HR/9_rank']) +
                ')'}
            </span>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default CompareStartersCard;
