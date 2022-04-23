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

    // Specific conditions (100% & 0&)
    if (maxValue === selectedTeam[category]) {
      return '100%';
    } else if (selectedTeam[category] === 0) {
      return '0%';
    } else if ((selectedTeam[category] / maxValue).toFixed(2).substring(2, 3) === '0') {
      return (selectedTeam[category] / maxValue).toFixed(2).substring(3, 4) + '%';
    } else {
      return (selectedTeam[category] / maxValue).toFixed(2).substring(2, 4) + '%';
    }
  }

  return (
    <div>
      <Select onChange={onChange} options={teams} />
      {selectedTeam ? (
        <div id={selectedTeam.playerId} className="playerCard">
          <h1>{selectedTeam.name}</h1>
          <h2>
            {selectedTeam.position === 'R' || selectedTeam.position === 'L'
              ? selectedTeam.position + 'W'
              : selectedTeam.position}
          </h2>
          <h2>{selectedTeam['team']}</h2>

          <p>
            Goals: <span>{getProductionPercentile('goalsFor')}</span>
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
