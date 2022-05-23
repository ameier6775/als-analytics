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
import teamLogos from '../../data/nhl/teams/2022/logos';

const TeamCard = ({ teams }) => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const onChange = (e) => {
    setSelectedTeam(e);
  };

  function getPercentile(category, direction = 'positive') {
    // Duplicate the players array
    var resultArr = teams.slice();
    var rankArr = resultArr;

    // Sorting by the category
    if (direction === 'positive') {
      rankArr.sort((a, b) => b[category] - a[category]);
    } else if (direction === 'negative') {
      rankArr.sort((a, b) => a[category] - b[category]);
    }

    let categoryRank = rankArr.indexOf(selectedTeam);
    let result = (rankArr.length - categoryRank) / rankArr.length;

    // Specific conditions (100%, 0%, single digit percentile vs double digit percentile)
    if (result >= 0.995) {
      return '100%';
    } else if (result === 0) {
      return '0%';
    } else if (result.toFixed(2).substring(2, 3) === '0') {
      return result.toFixed(2).substring(3, 4) + '%';
    } else {
      return result.toFixed(2).substring(2, 4) + '%';
    }
  }

  // Gets the ranking for the given statistic
  function getRank(category, order = 'desc') {
    // Duplicate the players array
    var resultArr = teams.slice();
    var rankArr = resultArr;

    // Sorting by the category
    if (order === 'desc') {
      rankArr.sort((a, b) => b[category] - a[category]);
    } else if (order === 'asc') {
      rankArr.sort((a, b) => a[category] - b[category]);
    }
    let categoryRank = rankArr.indexOf(selectedTeam) + 1;
    let rankString = categoryRank.toString();
    let lastDigit = categoryRank % 10;

    // Pronunciation of the ranking
    if ((lastDigit >= 10 && lastDigit <= 20) || (lastDigit >= 4 && lastDigit <= 9) || lastDigit === 0) {
      rankString = rankString + 'th';
    } else if (lastDigit === 1) {
      rankString = rankString + 'st';
    } else if (lastDigit === 2) {
      rankString = rankString + 'nd';
    } else if (lastDigit === 3) {
      rankString = rankString + 'rd';
    }

    return rankString;
  }

  // Set field color based off of incoming value
  function getColor(value) {
    let percentage = parseFloat(value.substring(-1));
    let color =
      percentage <= 33 ? '255, 51, 51' : percentage <= 66 ? '255, 205, 0' : percentage > 66 ? '51, 255, 74' : '0, 0, 0';
    let colorPercentage =
      percentage <= 33
        ? percentage * 3
        : percentage <= 66
        ? ((percentage - 33) * 3) / 100
        : percentage > 66
        ? ((percentage - 67) * 3) / 100
        : 0;

    // Color is too dark, need to fix this eventually (is this a good solution?)
    colorPercentage = colorPercentage < 0.2 ? colorPercentage + 0.15 : colorPercentage;
    let resultColor = 'rgba(' + color + ', ' + colorPercentage + ')';
    return resultColor;
  }

  // Preparing offensive chart data goalsFor
  let goalsFor =
    parseInt(getPercentile('goalsFor').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('goalsFor').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('goalsFor').substring(0, 2));
  let xGoalsFor =
    parseInt(getPercentile('xGoalsFor').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('xGoalsFor').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('xGoalsFor').substring(0, 2));
  let shotAttemptsFor =
    parseInt(getPercentile('shotAttemptsFor').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('shotAttemptsFor').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('shotAttemptsFor').substring(0, 2));
  let takeawaysFor =
    parseInt(getPercentile('takeawaysFor').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('takeawaysFor').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('takeawaysFor').substring(0, 2));
  let reboundsFor =
    parseInt(getPercentile('reboundsFor').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('reboundsFor').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('reboundsFor').substring(0, 2));

  // Preparing defensive chart data
  let goalsAgainst =
    parseInt(getPercentile('goalsAgainst').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('goalsAgainst').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('goalsAgainst').substring(0, 2));
  let xGoalsAgainst =
    parseInt(getPercentile('xGoalsAgainst').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('xGoalsAgainst').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('xGoalsAgainst').substring(0, 2));
  let shotAttemptsAgainst =
    parseInt(getPercentile('shotAttemptsAgainst').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('shotAttemptsAgainst').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('shotAttemptsAgainst').substring(0, 2));
  let giveawaysFor =
    parseInt(getPercentile('giveawaysFor').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('giveawaysFor').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('giveawaysFor').substring(0, 2));
  let reboundsAgainst =
    parseInt(getPercentile('reboundsAgainst').substring(0, 2)) === 10
      ? 100
      : !parseInt(getPercentile('reboundsAgainst').substring(0, 2)) === 0
      ? 0
      : parseInt(getPercentile('reboundsAgainst').substring(0, 2));

  // Plotting chart data
  var offensiveGraphData = [
    {
      category: 'Goals',
      score: goalsFor,
      fullMark: 100,
    },
    {
      category: 'Shot Attempts',
      score: shotAttemptsFor,
      fullMark: 100,
    },

    {
      category: 'Expected Goals',
      score: xGoalsFor,
      fullMark: 100,
    },
    {
      category: 'Takeaways',
      score: takeawaysFor,
      fullMark: 100,
    },
    {
      category: 'Rebounds',
      score: reboundsFor,
      fullMark: 100,
    },
  ];
  var defensiveGraphData = [
    {
      category: 'Goals',
      score: goalsAgainst,
      fullMark: 100,
    },

    {
      category: 'Shot Attempts',
      score: shotAttemptsAgainst,
      fullMark: 100,
    },
    {
      category: 'Expected Goals',
      score: xGoalsAgainst,
      fullMark: 100,
    },

    {
      category: 'Giveaways',
      score: giveawaysFor,
      fullMark: 100,
    },
    {
      category: 'Rebounds',
      score: reboundsAgainst,
      fullMark: 100,
    },
  ];

  var logo = teamLogos.find((obj) => obj.team === selectedTeam['name']);

  // Gets the percentile for the given statistic
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

  return (
    <div>
      <Select onChange={onChange} options={teams} />
      {selectedTeam ? (
        <div id={selectedTeam.playerId} className="playerCard">
          <h1>{selectedTeam.name}</h1>
          <img className="teamLogo" height="10" src={logo.logo} />
          <p>
            Goals For:
            <div className="fieldRank">{getRank('goalsFor')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('goalsFor')) }}>{getPercentile('goalsFor')}</span>
          </p>
          <p>
            Expected Goals For:
            <div className="fieldRank">{getRank('xGoalsFor')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('xGoalsFor')) }}>{getPercentile('xGoalsFor')}</span>
          </p>
          <p>
            Takeaways:
            <div className="fieldRank">{getRank('takeawaysFor')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('takeawaysFor')) }}>
              {getPercentile('takeawaysFor')}
            </span>
          </p>
          <p>
            Shot Attempts For:
            <div className="fieldRank">{getRank('shotAttemptsFor')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('shotAttemptsFor')) }}>
              {getPercentile('shotAttemptsFor')}
            </span>
          </p>
          <p>
            Faceoffs:
            <div className="fieldRank">{getRank('faceoffPercentage')}</div>
            <span
              style={{
                backgroundColor: getColor(
                  (
                    selectedTeam['faceOffsWonFor'] /
                    (selectedTeam['faceOffsWonAgainst'] + selectedTeam['faceOffsWonFor'])
                  )
                    .toFixed(2)
                    .substring(2, 4) + '%',
                ),
              }}
            >
              {(selectedTeam['faceOffsWonFor'] / (selectedTeam['faceOffsWonAgainst'] + selectedTeam['faceOffsWonFor']))
                .toFixed(2)
                .substring(2, 4) + '%'}
            </span>
          </p>
          <p>
            Goals Against:
            <div className="fieldRank">{getRank('goalsAgainst', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('goalsAgainst', 'negative')) }}>
              {getPercentile('goalsAgainst', 'negative')}
            </span>
          </p>
          <p>
            Expected Goals Against:
            <div className="fieldRank">{getRank('xGoalsAgainst', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('xGoalsAgainst', 'negative')) }}>
              {getPercentile('xGoalsAgainst', 'negative')}
            </span>
          </p>
          <p>
            Giveaways:
            <div className="fieldRank">{getRank('giveawaysFor', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('giveawaysFor', 'negative')) }}>
              {getPercentile('giveawaysFor', 'negative')}
            </span>
          </p>
          <p>
            Shot Attempts Against:
            <div className="fieldRank">{getRank('shotAttemptsAgainst', 'asc')}</div>
            <span style={{ backgroundColor: getColor(getPercentile('shotAttemptsAgainst', 'negative')) }}>
              {getPercentile('shotAttemptsAgainst', 'negative')}
            </span>
          </p>
          <p>
            Penalty Differential:
            <div className="fieldRank">{getRank('penaltyDifferential')}</div>
            <span style={{ backgroundColor: 'blue' }}>{selectedTeam['penaltyDifferential']}</span>
          </p>
          <div className="fullWidthChart">
            <h2 className="playerChart">Offense</h2>
            <LineChart
              width={1200}
              height={280}
              data={offensiveGraphData}
              margin={{
                top: 15,
                right: 10,
                left: 5,
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
          <div className="fullWidthChart">
            <h2 className="playerChart">Defense</h2>
            <LineChart
              width={1200}
              height={280}
              data={defensiveGraphData}
              margin={{
                top: 15,
                right: 10,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" stroke="white" />
              <YAxis stroke="white" />
              <ReferenceLine
                y={100}
                label={{ value: 'Worst', angle: 0, position: 'top', fill: 'red', fontSize: 12 }}
                stroke="red"
              />
              <ReferenceLine
                y={50}
                label={{ value: 'Average', angle: 0, position: 'top', fill: 'gold', fontSize: 12 }}
                stroke="gold"
              />
              <ReferenceLine
                y={0}
                label={{ value: 'Best', angle: 0, position: 'top', fill: 'lightgreen', fontSize: 12 }}
                stroke="lightgreen"
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
      )}
    </div>
  );
};

export default TeamCard;

// Offensive
// xGoalsPercentage
// corsiPercentage
// fenwickPercentage
// xOnGoalFor
// xGoalsFor
// xReboundsFor
// xFreezeFor
// xPlayStoppedFor
// xPlayContinuedInZoneFor
// xPlayContinuedOutsideZoneFor
// flurryAdjustedxGoalsFor
// scoreVenueAdjustedxGoalsFor
// flurryScoreVenueAdjustedxGoalsFor
// shotsOnGoalFor
// missedShotsFor
// blockedShotAttemptsFor
// shotAttemptsFor
// goalsFor
// reboundsFor
// reboundGoalsFor
// freezeFor
// playStoppedFor
// playContinuedInZoneFor
// playContinuedOutsideZoneFor
// savedShotsOnGoalFor
// savedUnblockedShotAttemptsFor
// takeawaysFor
// giveawaysFor
// lowDangerShotsFor
// mediumDangerShotsFor
// highDangerShotsFor
// lowDangerxGoalsFor
// mediumDangerxGoalsFor
// highDangerxGoalsFor
// lowDangerGoalsFor
// mediumDangerGoalsFor
// highDangerGoalsFor
// scoreAdjustedShotsAttemptsFor
// unblockedShotAttemptsFor
// scoreAdjustedUnblockedShotAttemptsFor
// dZoneGiveawaysFor
// xGoalsFromxReboundsOfShotsFor
// xGoalsFromActualReboundsOfShotsFor
// reboundxGoalsFor
// totalShotCreditFor
// scoreAdjustedTotalShotCreditFor
// scoreFlurryAdjustedTotalShotCreditFor

// Defensive
// xOnGoalAgainst
// xGoalsAgainst
// xReboundsAgainst
// xFreezeAgainst
// xPlayStoppedAgainst
// xPlayContinuedInZoneAgainst
// xPlayContinuedOutsideZoneAgainst
// flurryAdjustedxGoalsAgainst
// scoreVenueAdjustedxGoalsAgainst
// flurryScoreVenueAdjustedxGoalsAgainst
// shotsOnGoalAgainst
// missedShotsAgainst
// shotAttemptsAgainst
// goalsAgainst
// reboundsAgainst
// reboundGoalsAgainst
// freezeAgainst
// playStoppedAgainst
// playContinuedInZoneAgainst
// playContinuedOutsideZoneAgainst
// savedShotsOnGoalAgainst
// savedUnblockedShotAttemptsAgainst
// takeawaysAgainst
// giveawaysAgainst
// lowDangerShotsAgainst
// mediumDangerShotsAgainst
// highDangerShotsAgainst
// lowDangerxGoalsAgainst
// mediumDangerxGoalsAgainst
// highDangerxGoalsAgainst
// lowDangerGoalsAgainst
// mediumDangerGoalsAgainst
// highDangerGoalsAgainst
// scoreAdjustedShotsAttemptsAgainst
// unblockedShotAttemptsAgainst
// scoreAdjustedUnblockedShotAttemptsAgainst
// dZoneGiveawaysAgainst
// xGoalsFromxReboundsOfShotsAgainst
// xGoalsFromActualReboundsOfShotsAgainst
// reboundxGoalsAgainst
// totalShotCreditAgainst
// scoreAdjustedTotalShotCreditAgainst
// scoreFlurryAdjustedTotalShotCreditAgainst

// Penalties
// penaltiesFor
// penaltyMinutesFor
// penaltiesAgainst
// penaltyMinutesAgainst

// Physicality
// hitsFor
// hitsAgainst
// blockedShotAttemptsAgainst

// Situational

// General Information
// team
// season
// name
// position
// situation
// games_played
// iceTime
// faceOffsWonFor
// faceOffsWonAgainst
