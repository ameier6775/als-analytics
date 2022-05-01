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

const PlayerCard = ({ players }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const onChange = (e) => {
    setSelectedPlayer(e);
  };

  // Preparing offensive chart data
  let xGF =
    parseInt(getTimePercentile('OnIce_F_xGoals').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('OnIce_F_xGoals').substring(0, 2));
  let goals =
    parseInt(getTimePercentile('OnIce_F_goals').substring(0, 2)) === 10
      ? 100
      : !parseInt(getTimePercentile('OnIce_F_goals').substring(0, 2))
      ? 0
      : parseInt(getTimePercentile('OnIce_F_goals').substring(0, 2));
  let points =
    parseInt(getTimePercentile('I_F_points').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('I_F_points').substring(0, 2));
  let shotAttemptsFor =
    parseInt(getTimePercentile('OnIce_F_shotAttempts').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('OnIce_F_shotAttempts').substring(0, 2));
  let reboundsFor =
    parseInt(getTimePercentile('I_F_rebounds').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('I_F_rebounds').substring(0, 2));

  // Preparing defensive chart data
  let xGA =
    parseInt(getTimePercentile('OnIce_A_xGoals').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('OnIce_A_xGoals').substring(0, 2));
  let goalsAgainst =
    parseInt(getTimePercentile('OnIce_A_goals').substring(0, 2)) === 10
      ? 100
      : !parseInt(getTimePercentile('OnIce_A_goals').substring(0, 2))
      ? 0
      : parseInt(getTimePercentile('OnIce_A_goals').substring(0, 2));
  let giveaways =
    parseInt(getTimePercentile('I_F_giveaways').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('I_F_giveaways').substring(0, 2));
  let shotAttemptsAgainst =
    parseInt(getTimePercentile('OnIce_A_shotAttempts').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('OnIce_A_shotAttempts').substring(0, 2));
  let reboundsAgainst =
    parseInt(getTimePercentile('OnIce_A_reboundGoals').substring(0, 2)) === 10
      ? 100
      : parseInt(getTimePercentile('OnIce_A_reboundGoals').substring(0, 2));

  // Plotting chart data
  var offensiveGraphData = [
    {
      category: 'Points',
      score: points,
      fullMark: 100,
    },

    {
      category: '🧊 Goals For',
      score: goals,
      fullMark: 100,
    },
    {
      category: 'Expected Goals',
      score: xGF,
      fullMark: 100,
    },

    {
      category: '🧊 Shot Attempts',
      score: shotAttemptsFor,
      fullMark: 100,
    },
    {
      category: 'Net Front',
      score: reboundsFor,
      fullMark: 100,
    },
  ];
  var defensiveGraphData = [
    {
      category: 'Giveaways',
      score: giveaways,
      fullMark: 100,
    },

    {
      category: '🧊 Goals Against',
      score: goalsAgainst,
      fullMark: 100,
    },
    {
      category: 'Expected Goals',
      score: xGA,
      fullMark: 100,
    },

    {
      category: '🧊 Shot Attempts',
      score: shotAttemptsAgainst,
      fullMark: 100,
    },
    {
      category: 'Net Front',
      score: reboundsAgainst,
      fullMark: 100,
    },
  ];

  // Gets the percentile for the given statistic
  function getProductionPercentile(category, direction) {
    // Group forwards & defensemen separately
    if (selectedPlayer['position'] === 'D') {
      var positionalArr = players.filter((player) => player.position === 'D');
    } else {
      var positionalArr = players.filter((player) => player.position != 'D');
    }

    // Get the maximum & minimum player values for the statistic
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
    var playerValue = selectedPlayer[category];
    var result = (playerValue - minValue) / difference;

    if (direction === 'positive') {
      // Specific conditions (100% & 0&)
      if (maxValue === playerValue) {
        return '100%';
      } else if (minValue === playerValue) {
        return '0%';
      } else if (result.toFixed(2).substring(2, 3) === '0') {
        return result.toFixed(2).substring(3, 4) + '%';
      } else {
        return result.toFixed(2).substring(2, 4) + '%';
      }
    } else if (direction === 'negative') {
      if (minValue === playerValue) {
        return '100%';
      } else if (maxValue === playerValue) {
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
    // Group forwards & defensemen together
    if (selectedPlayer['position'] === 'D') {
      var positionalArr = players.filter((player) => player.position === 'D');
    } else {
      var positionalArr = players.filter((player) => player.position != 'D');
    }

    // Get the maximum player value for the statistic
    var maxValue = Math.max.apply(
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

  function combineCategories(categoryOne, categoryTwo) {
    let category1 = parseInt(categoryOne.substring(0, categoryOne.length - 1));
    let category2 = parseInt(categoryTwo.substring(0, categoryTwo.length - 1));
    console.log(category1, category2);
    let avg = ((category1 + category2) / 2).toString() + '%';
    return avg;
  }

  function getFaceOffPercentage() {
    let faceOffPercentage =
      (selectedPlayer['faceoffsWon'] / (selectedPlayer['faceoffsWon'] + selectedPlayer['faceoffsLost']))
        .toFixed(2)
        .substring(2, 4) + '%';
    if (selectedPlayer['faceoffsWon'] != 0) {
      return faceOffPercentage;
    } else {
      return 'N/A';
    }
  }

  return (
    <div>
      <Select onChange={onChange} options={players} />
      {selectedPlayer ? (
        <div id={selectedPlayer.playerId} className="playerCard">
          <h1>{selectedPlayer.name}</h1>
          <h2>
            {selectedPlayer.position === 'R' || selectedPlayer.position === 'L'
              ? selectedPlayer.position + 'W'
              : selectedPlayer.position}
          </h2>
          <h2>{selectedPlayer['team']}</h2>

          <p>
            Goals: <span>{getProductionPercentile('I_F_goals', 'positive')}</span>
          </p>
          <p>
            Assists:{' '}
            <span>
              {combineCategories(
                getProductionPercentile('I_F_primaryAssists', 'positive'),
                getProductionPercentile('I_F_secondaryAssists', 'positive'),
              )}
            </span>
          </p>
          <p>
            Points: <span>{getProductionPercentile('I_F_points', 'positive')}</span>
          </p>
          <p>
            Expected Goals For: <span>{getProductionPercentile('I_F_xGoals', 'positive')}</span>
          </p>
          <p>
            🧊 Goals For: <span>{getProductionPercentile('OnIce_F_xGoals', 'positive')}</span>
          </p>
          <p>
            🚨 Per 60: <span>{getTimePercentile('I_F_goals')}</span>
          </p>
          <p>
            🍏 Per 60:{' '}
            <span>
              {combineCategories(getTimePercentile('I_F_primaryAssists'), getTimePercentile('I_F_secondaryAssists'))}
            </span>
          </p>
          <p>
            🥅 Per 60: <span>{getTimePercentile('I_F_points')}</span>
          </p>
          <p>
            Expected Goals Against: <span>{getProductionPercentile('OnIce_A_xGoals', 'negative')}</span>
          </p>
          <p>
            🧊 Goals Against: <span>{getProductionPercentile('OnIce_A_goals', 'negative')}</span>
          </p>
          <p>
            Shot Attempts: <span>{getProductionPercentile('I_F_shotAttempts', 'positive')}</span>
          </p>
          <p>
            Hits: <span>{getProductionPercentile('I_F_hits', 'positive')}</span>
          </p>
          <p>
            Blocks: <span>{getProductionPercentile('shotsBlockedByPlayer', 'positive')}</span>
          </p>
          <p>
            Takeaways: <span>{getProductionPercentile('I_F_takeaways', 'positive')}</span>
          </p>
          <p>
            Giveaways: <span>{getProductionPercentile('I_F_giveaways', 'negative')}</span>
          </p>
          <p>
            Games: <span>{getProductionPercentile('games_played', 'positive')}</span>
          </p>
          <p>
            Time On Ice: <span>{getProductionPercentile('icetime', 'positive')}</span>
          </p>
          {/* <p>
            Faceoffs: <span>{getFaceOffPercentage()}</span>
          </p>
          <p>
            Game Score: <span>{getProductionPercentile('gameScore')}</span>
          </p> */}
          <p>
            Offensive Zone Starts:{' '}
            <span>
              {parseFloat(
                selectedPlayer['I_F_oZoneShiftStarts'] /
                  (selectedPlayer['I_F_oZoneShiftStarts'] +
                    selectedPlayer['I_F_dZoneShiftStarts'] +
                    selectedPlayer['I_F_neutralZoneShiftStarts']),
              )
                .toFixed(2)
                .substring(2, 4) + '%'}
            </span>
          </p>
          <p>
            Neutral Zone Starts:{' '}
            <span>
              {parseFloat(
                selectedPlayer['I_F_neutralZoneShiftStarts'] /
                  (selectedPlayer['I_F_oZoneShiftStarts'] +
                    selectedPlayer['I_F_dZoneShiftStarts'] +
                    selectedPlayer['I_F_neutralZoneShiftStarts']),
              )
                .toFixed(2)
                .substring(2, 4) + '%'}
            </span>
          </p>
          <p>
            Defensive Zone Starts:{' '}
            <span>
              {parseFloat(
                selectedPlayer['I_F_dZoneShiftStarts'] /
                  (selectedPlayer['I_F_oZoneShiftStarts'] +
                    selectedPlayer['I_F_dZoneShiftStarts'] +
                    selectedPlayer['I_F_neutralZoneShiftStarts']),
              )
                .toFixed(2)
                .substring(2, 4) + '%'}
            </span>
          </p>
          <div className="fullWidthChart">
            <h2 className="playerChart">Offense Per 60</h2>
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
            <h2 className="playerChart">Defense Per 60</h2>
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

export default PlayerCard;

{
  /* Offensive */
}
// Goals For
// I_F_lowDangerGoals
// I_F_lowDangerxGoals
// I_F_mediumDangerGoals
// I_F_mediumDangerxGoals
// I_F_highDangerGoals
// I_F_highDangerxGoals
// OnIce_F_lowDangerGoals
// OnIce_F_lowDangerxGoals
// OnIce_F_mediumDangerGoals
// OnIce_F_mediumDangerxGoals
// OnIce_F_highDangerGoals
// OnIce_F_highDangerxGoals

// Net Front
// OnIce_F_rebounds
// OnIce_F_reboundGoals
// I_F_reboundGoals
// I_F_rebounds
// I_F_flurryAdjustedxGoals
// I_F_flurryScoreVenueAdjustedxGoals
// I_F_reboundxGoals
// I_F_xRebounds
// I_F_xGoalsFromActualReboundsOfShots
// I_F_xGoalsFromxReboundsOfShots
// I_F_xGoals_with_earned_rebounds
// I_F_xGoals_with_earned_rebounds_scoreFlurryAdjusted
// OnIce_F_reboundxGoals
// OnIce_F_xGoalsFromActualReboundsOfShots
// OnIce_F_xGoalsFromxReboundsOfShots
// OnIce_F_xGoals_with_earned_rebounds
// OnIce_F_xGoals_with_earned_rebounds_scoreAdjusted
// OnIce_F_xGoals_with_earned_rebounds_scoreFlurryAdjusted
// OnIce_F_flurryAdjustedxGoals

// Play Making
// I_F_unblockedShotAttempts
// I_F_savedUnblockedShotAttempts
// I_F_shotAttempts
// OnIce_F_shotAttempts
// OnIce_F_unblockedShotAttempts
// OnIce_F_blockedShotAttempts
// onIce_corsiPercentage
// onIce_fenwickPercentage

// Scoring
// I_F_primaryAssists
// I_F_secondaryAssists
// I_F_goals
// I_F_xGoals
// I_F_points
// I_F_xOnGoal
// OnIce_F_goals
// OnIce_F_xGoals
// OnIce_F_xOnGoal
// onIce_xGoalsPercentage

// Shots
// I_F_lowDangerShots
// I_F_mediumDangerShots
// I_F_highDangerShots
// I_F_shotsOnGoal
// I_F_savedShotsOnGoal
// OnIce_F_lowDangerShots
// OnIce_F_mediumDangerShots
// OnIce_F_highDangerShots
// OnIce_F_shotsOnGoal

// Situational Play
// I_F_scoreVenueAdjustedxGoals
// I_F_scoreAdjustedShotsAttempts
// I_F_scoreAdjustedUnblockedShotAttempts
// I_F_xGoals_with_earned_rebounds_scoreAdjusted
// OnIce_F_scoreVenueAdjustedxGoals
// OnIce_F_scoreAdjustedShotsAttempts
// OnIce_F_scoreAdjustedUnblockedShotAttempts
// OnIce_F_flurryScoreVenueAdjustedxGoals
{
  /* Defensive */
}
// Goals Against
// OnIce_A_goals
// OnIce_A_xGoals
// OnIce_A_xOnGoal
// OnIce_A_lowDangerGoals
// OnIce_A_lowDangerxGoals
// OnIce_A_mediumDangerGoals
// OnIce_A_mediumDangerxGoals
// OnIce_A_highDangerGoals
// OnIce_A_highDangerxGoals

// Physicality
// shotsBlockedByPlayer
// I_F_blockedShotAttempts
// I_F_hits
// OnIce_A_blockedShotAttempts
// OnIce_A_reboundGoals
// OnIce_A_reboundxGoals
// OnIce_A_xGoalsFromActualReboundsOfShots
// OnIce_A_xGoalsFromxReboundsOfShots
// OnIce_A_xGoals_with_earned_rebounds

// Puck Management
// I_F_dZoneGiveaways
// I_F_giveaways
// I_F_takeaways

// Shots Against
// OnIce_A_lowDangerShots
// OnIce_A_mediumDangerShots
// OnIce_A_highDangerShots
// OnIce_A_shotsOnGoal
// OnIce_A_missedShots
// OnIce_A_shotAttempts
// OnIce_A_unblockedShotAttempts
// OnIce_A_rebounds

// Situational
// OnIce_A_flurryAdjustedxGoals
// OnIce_A_flurryScoreVenueAdjustedxGoals
// OnIce_A_scoreAdjustedShotsAttempts
// OnIce_A_scoreAdjustedUnblockedShotAttempts
// OnIce_A_scoreVenueAdjustedxGoals
// OnIce_A_xGoals_with_earned_rebounds_scoreAdjusted
// OnIce_A_xGoals_with_earned_rebounds_scoreFlurryAdjusted
{
  /* Neutral */
}
// Gaps
// I_F_playContinuedInZone
// I_F_xPlayContinuedInZone
// I_F_playContinuedOutsideZone
// I_F_xPlayContinuedOutsideZone

// Line Changes
// xGoalsForAfterShifts
// xGoalsAgainstAfterShifts
// fenwickForAfterShifts
// fenwickAgainstAfterShifts
// corsiForAfterShifts
// corsiAgainstAfterShifts

// Penalties
// I_F_penalityMinutes
// penalityMinutes
// penalityMinutesDrawn
// penalties
// penaltiesDrawn

// Production
// gameScore
// I_F_faceOffsWon
// faceoffsLost
// faceoffsWon
// expectedGoalDifferential
// I_F_missedShots

// Other
// games_played
// situation
// team
// OnIce_F_missedShots

// Shifts
// icetime
// iceTimeRank
// timeOnBench
// shifts
// I_F_shifts
// I_F_dZoneShiftStarts
// I_F_dZoneShiftEnds
// I_F_flyShiftStarts
// I_F_flyShiftEnds
// I_F_neutralZoneShiftStarts
// I_F_neutralZoneShiftEnds
// I_F_oZoneShiftEnds
// I_F_oZoneShiftStarts

// Value
// OffIce_A_shotAttempts
// OffIce_F_shotAttempts
// offIce_corsiPercentage
// offIce_fenwickPercentage
// OffIce_A_xGoals
// OffIce_F_xGoals
// offIce_xGoalsPercentage

// Zones
// I_F_playStopped
// I_F_xPlayStopped
// I_F_freeze
// I_F_xFreeze