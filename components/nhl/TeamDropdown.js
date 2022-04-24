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

const TeamDropdown = ({ teams }) => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const onChange = (e) => {
    setSelectedTeam(e);
  };

  // Gets the percentile for the given statistic
  function getProductionPercentile(category) {
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
  }

  // Gets the percentile for the given negative statistic
  function getNegativePercentile(category) {
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

    let topNumber = (selectedPlayer[category] / selectedPlayer['icetime'] / maxValue).toFixed(2);
    // Specific conditions (100% & 0&)
    if (topNumber === '1.00') {
      return '100%';
    } else if (selectedPlayer[category] === 0) {
      return '0%';
    } else if (topNumber.substring(2, 3) === '0') {
      return topNumber.substring(0, 4) + '%';
    } else {
      return topNumber.substring(2, 4) + '%';
    }
  }

  return (
    <div>
      <Select onChange={onChange} options={teams} />
      {selectedTeam ? (
        <div id={selectedTeam.playerId} className="playerCard">
          <h1>{selectedTeam.name}</h1>
          <p>
            Goals For: <span>{getProductionPercentile('goalsFor')}</span>
          </p>
          <p>
            Expected Goals For: <span>{getProductionPercentile('xGoalsFor')}</span>
          </p>
          <p>
            Takeaways: <span>{getProductionPercentile('takeawaysFor')}</span>
          </p>
          <p>
            Shot Attempts For: <span>{getProductionPercentile('shotAttemptsFor')}</span>
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
            Goals Against: <span>{getNegativePercentile('goalsAgainst')}</span>
          </p>

          <p>
            Expected Goals Against: <span>{getNegativePercentile('xGoalsAgainst')}</span>
          </p>

          <p>
            Giveaways: <span>{getNegativePercentile('giveawaysFor')}</span>
          </p>
          <p>
            Shot Attempts Against: <span>{getNegativePercentile('shotAttemptsAgainst')}</span>
          </p>

          <p>
            Penalty Differential: <span>{selectedTeam['penaltiesAgainst'] - selectedTeam['penaltiesFor']}</span>
          </p>
        </div>
      ) : (
        <p>N/A</p>
      )}
    </div>
  );
};

export default TeamDropdown;

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
