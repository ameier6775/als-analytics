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

const TeamCard = ({ teams }) => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const onChange = (e) => {
    setSelectedTeam(e);
  };

  // Gets the percentile for the given statistic
  function getProductionPercentile(category, direction) {
    // Get the maximum player value for the statistic
    var positionalArr = teams;
    var maxValue = Math.max.apply(
      Math,
      positionalArr.map((obj) => {
        return obj[category];
      }),
    );
    var minValue = Math.min.apply(
      Math,
      positionalArr.map((obj) => {
        return obj[category];
      }),
    );
    var difference = maxValue - minValue;
    var teamValue = selectedTeam[category];
    var result = (teamValue - minValue) / difference;

    if (direction === 'positive') {
      // Specific conditions (100% & 0&)
      if (maxValue === teamValue) {
        return '100%';
      } else if (minValue === teamValue) {
        return '0%';
      } else if (result.toFixed(2).substring(2, 3) === '0') {
        return result.toFixed(2).substring(3, 4) + '%';
      } else {
        return result.toFixed(2).substring(2, 4) + '%';
      }
    } else if (direction === 'negative') {
      if (minValue === teamValue) {
        return '100%';
      } else if (maxValue === teamValue) {
        return '0%';
      } else if ((1 - result).toFixed(2).substring(2, 3) === '0') {
        return (1 - result).toFixed(2).substring(3, 4) + '%';
      } else {
        return (1 - result).toFixed(2).substring(2, 4) + '%';
      }
    }
  }

  // Gets the percentile for the given statistic
  function getTimePercentile(category) {
    // Get the maximum player value for the statistic
    var positionalArr = teams;
    var maxValue = Math.max.apply(
      Math,
      positionalArr.map((obj) => {
        return obj[category] / obj['icetime'];
      }),
    );
    var minValue = Math.min.apply(
      Math,
      positionalArr.map((obj) => {
        return obj[category] / obj['icetime'];
      }),
    );
    var difference = maxValue - minValue;
    var teamValue = selectedTeam[category];
    var result = (teamValue - minValue) / difference;

    // Specific conditions (100% & 0%)
    if (minValue === teamValue) {
      return '100%';
    } else if (maxValue === teamValue) {
      return '0%';
    } else if ((1 - result).toFixed(2).substring(2, 3) === '0') {
      return (1 - result).toFixed(2).substring(3, 4) + '%';
    } else {
      return (1 - result).toFixed(2).substring(2, 4) + '%';
    }
  }

  // Preparing offensive chart data goalsFor
  let goalsFor =
    parseInt(getProductionPercentile('goalsFor', 'positive').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('goalsFor', 'positive').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('goalsFor', 'positive').substring(0, 2));
  let xGoalsFor =
    parseInt(getProductionPercentile('xGoalsFor', 'positive').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('xGoalsFor', 'positive').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('xGoalsFor', 'positive').substring(0, 2));
  let shotAttemptsFor =
    parseInt(getProductionPercentile('shotAttemptsFor', 'positive').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('shotAttemptsFor', 'positive').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('shotAttemptsFor', 'positive').substring(0, 2));
  let takeawaysFor =
    parseInt(getProductionPercentile('takeawaysFor', 'positive').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('takeawaysFor', 'positive').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('takeawaysFor', 'positive').substring(0, 2));
  let reboundsFor =
    parseInt(getProductionPercentile('reboundsFor', 'positive').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('reboundsFor', 'positive').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('reboundsFor', 'positive').substring(0, 2));

  // Preparing defensive chart data
  let goalsAgainst =
    parseInt(getProductionPercentile('goalsAgainst', 'positive').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('goalsAgainst', 'positive').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('goalsAgainst', 'positive').substring(0, 2));
  let xGoalsAgainst =
    parseInt(getProductionPercentile('xGoalsAgainst', 'positive').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('xGoalsAgainst', 'positive').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('xGoalsAgainst', 'positive').substring(0, 2));
  let shotAttemptsAgainst =
    parseInt(getProductionPercentile('shotAttemptsAgainst', 'positive').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('shotAttemptsAgainst', 'positive').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('shotAttemptsAgainst', 'positive').substring(0, 2));
  let giveawaysFor =
    parseInt(getProductionPercentile('giveawaysFor', 'positive').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('giveawaysFor', 'positive').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('giveawaysFor', 'positive').substring(0, 2));
  let reboundsAgainst =
    parseInt(getProductionPercentile('reboundsAgainst', 'positive').substring(0, 2)) === 10
      ? 100
      : !parseInt(getProductionPercentile('reboundsAgainst', 'positive').substring(0, 2)) === 0
      ? 0
      : parseInt(getProductionPercentile('reboundsAgainst', 'positive').substring(0, 2));

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

  return (
    <div>
      <Select onChange={onChange} options={teams} />
      {selectedTeam ? (
        <div id={selectedTeam.playerId} className="playerCard">
          <h1>{selectedTeam.name}</h1>
          <p>
            Goals For: <span>{getProductionPercentile('goalsFor', 'positive')}</span>
          </p>
          <p>
            Expected Goals For: <span>{getProductionPercentile('xGoalsFor', 'positive')}</span>
          </p>
          <p>
            Takeaways: <span>{getProductionPercentile('takeawaysFor', 'positive')}</span>
          </p>
          <p>
            Shot Attempts For: <span>{getProductionPercentile('shotAttemptsFor', 'positive')}</span>
          </p>
          <p>
            Faceoffs:{' '}
            <span>
              {(selectedTeam['faceOffsWonFor'] / (selectedTeam['faceOffsWonAgainst'] + selectedTeam['faceOffsWonFor']))
                .toFixed(2)
                .substring(2, 4) + '%'}
            </span>
          </p>
          <p>
            Goals Against: <span>{getProductionPercentile('goalsAgainst', 'negative')}</span>
          </p>

          <p>
            Expected Goals Against: <span>{getProductionPercentile('xGoalsAgainst', 'negative')}</span>
          </p>

          <p>
            Giveaways: <span>{getProductionPercentile('giveawaysFor', 'negative')}</span>
          </p>
          <p>
            Shot Attempts Against: <span>{getProductionPercentile('shotAttemptsAgainst', 'negative')}</span>
          </p>

          <p>
            Penalty Differential: <span>{selectedTeam['penaltiesAgainst'] - selectedTeam['penaltiesFor']}</span>
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
