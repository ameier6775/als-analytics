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

const PlayerDropdown = ({ players }) => {
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

  // Plotting chart data
  var offensiveGraphData = [
    {
      category: 'xGF',
      score: xGF,
      fullMark: 100,
    },
    {
      category: 'Goals For',
      score: goals,
      fullMark: 100,
    },
    {
      category: 'Points',
      score: points,
      fullMark: 100,
    },
  ];
  var defensiveGraphData = [
    {
      category: 'xGA',
      score: xGA,
      fullMark: 100,
    },
    {
      category: 'Goals Against',
      score: goalsAgainst,
      fullMark: 100,
    },
    {
      category: 'Giveaways',
      score: giveaways,
      fullMark: 100,
    },
  ];

  // Gets the percentile for the given statistic
  function getProductionPercentile(category) {
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
        return obj[category];
      }),
    );

    // Specific conditions (100% & 0&)
    if (maxValue === selectedPlayer[category]) {
      return '100%';
    } else if (selectedPlayer[category] === 0) {
      return 'N/A';
    } else if ((selectedPlayer[category] / maxValue).toFixed(2).substring(2, 3) === '0') {
      return (selectedPlayer[category] / maxValue).toFixed(2).substring(3, 4) + '%';
    } else {
      return (selectedPlayer[category] / maxValue).toFixed(2).substring(2, 4) + '%';
    }
  }

  // Gets the percentile for the given negative statistic
  function getNegativePercentile(category) {
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
        return obj[category];
      }),
    );

    // Specific conditions (100% & 0%)
    if (maxValue === selectedPlayer[category]) {
      return '100%';
    } else if (selectedPlayer[category] === 0) {
      return 'N/A';
    } else if ((1 - selectedPlayer[category] / maxValue).toFixed(2).substring(2, 3) === '0') {
      return (1 - selectedPlayer[category] / maxValue).toFixed(2).substring(3, 4) + '%';
    } else {
      return (1 - selectedPlayer[category] / maxValue).toFixed(2).substring(2, 4) + '%';
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
      return 'N/A';
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
            Goals: <span>{getProductionPercentile('I_F_goals')}</span>
          </p>
          <p>
            Assists:{' '}
            <span>
              {combineCategories(
                getProductionPercentile('I_F_primaryAssists'),
                getProductionPercentile('I_F_secondaryAssists'),
              )}
            </span>
          </p>
          <p>
            Points: <span>{getProductionPercentile('I_F_points')}</span>
          </p>
          <p>
            xGF: <span>{getProductionPercentile('I_F_xGoals')}</span>
          </p>
          <p>
            🧊 GF: <span>{getProductionPercentile('OnIce_F_xGoals')}</span>
          </p>
          <p>
            Hits: <span>{getProductionPercentile('I_F_hits')}</span>
          </p>
          <p>
            Time On Ice:{' '}
            <span>
              {/* {(selectedPlayer.icetime / 60 / selectedPlayer.games_played).toFixed(2).substring(0, 4)} */}
              {getProductionPercentile('icetime')}
            </span>
          </p>

          <p>
            Takeaways: <span>{getProductionPercentile('I_F_takeaways')}</span>
          </p>
          <p>
            Faceoffs: <span>{getFaceOffPercentage()}</span>
          </p>
          <p>
            Game Score: <span>{getProductionPercentile('gameScore')}</span>
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
            xGA: <span>{getNegativePercentile('OnIce_A_xGoals')}</span>
          </p>
          <p>
            🧊 GA: <span>{getNegativePercentile('OnIce_A_goals')}</span>
          </p>

          <p>
            Blocks: <span>{getProductionPercentile('shotsBlockedByPlayer')}</span>
          </p>

          <p>
            Games: <span>{getProductionPercentile('games_played')}</span>
          </p>
          <p>
            Giveaways: <span>{getProductionPercentile('I_F_giveaways')}</span>
          </p>
          <p>
            Shot Attempts: <span>{getProductionPercentile('I_F_shotAttempts')}</span>
          </p>

          <p>
            Expected: <span>{getProductionPercentile('expectedCases')}</span>
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

export default PlayerDropdown;

{
  /* Offensive */
}
// Pure Production Sub Category
// I_F_goals
// I_F_highDangerGoals
// I_F_highDangerShots
// I_F_lowDangerGoals
// I_F_lowDangerShots
// I_F_mediumDangerGoals
// I_F_mediumDangerShots
// I_F_points
// I_F_primaryAssists
// I_F_reboundGoals
// I_F_rebounds
// I_F_savedShotsOnGoal
// I_F_savedUnblockedShotAttempts
// I_F_secondaryAssists
// I_F_shotsOnGoal
// I_F_shotAttempts
// I_F_unblockedShotAttempts
// OnIce_F_reboundGoals
// OnIce_F_rebounds
// OnIce_F_shotAttempts
// OnIce_F_shotsOnGoal
// OnIce_F_unblockedShotAttempts
// OnIce_F_blockedShotAttempts
// OnIce_F_highDangerGoals
// OnIce_F_highDangerShots
// OnIce_F_goals
// OnIce_F_lowDangerGoals
// OnIce_F_lowDangerShots
// OnIce_F_mediumDangerGoals
// OnIce_F_mediumDangerShots
// onIce_corsiPercentage
// onIce_fenwickPercentage

// Anything Expected / Adjusted
// I_F_flurryAdjustedxGoals
// I_F_flurryScoreVenueAdjustedxGoals
// I_F_highDangerxGoals
// I_F_lowDangerxGoals
// I_F_mediumDangerxGoals
// I_F_reboundxGoals
// I_F_scoreAdjustedShotsAttempts
// I_F_scoreAdjustedUnblockedShotAttempts
// I_F_scoreVenueAdjustedxGoals
// I_F_xRebounds
// I_F_xGoals
// I_F_xGoalsFromActualReboundsOfShots
// I_F_xGoalsFromxReboundsOfShots
// I_F_xGoals_with_earned_rebounds
// I_F_xGoals_with_earned_rebounds_scoreAdjusted
// I_F_xGoals_with_earned_rebounds_scoreFlurryAdjusted
// I_F_xOnGoal
// I_F_xPlayContinuedInZone
// OnIce_F_scoreAdjustedShotsAttempts
// OnIce_F_scoreAdjustedUnblockedShotAttempts
// OnIce_F_scoreVenueAdjustedxGoals
// OnIce_F_reboundxGoals
// OnIce_F_xGoals
// OnIce_F_xGoalsFromActualReboundsOfShots
// OnIce_F_xGoalsFromxReboundsOfShots
// OnIce_F_xGoals_with_earned_rebounds
// OnIce_F_xGoals_with_earned_rebounds_scoreAdjusted
// OnIce_F_xGoals_with_earned_rebounds_scoreFlurryAdjusted
// OnIce_F_xOnGoal
// OnIce_F_flurryAdjustedxGoals
// OnIce_F_flurryScoreVenueAdjustedxGoals
// OnIce_F_highDangerxGoals
// OnIce_F_lowDangerxGoals
// OnIce_F_mediumDangerxGoals
// onIce_xGoalsPercentage

// Zones / Shifts
// I_F_oZoneShiftEnds
// I_F_oZoneShiftStarts
// I_F_playContinuedInZone
// fenwickForAfterShifts

{
  /* Defensive */
}
// Pure Production Sub Category
// I_F_blockedShotAttempts
// I_F_dZoneGiveaways
// I_F_giveaways
// I_F_hits
// I_F_takeaways
// OnIce_A_blockedShotAttempts
// OnIce_A_goals
// OnIce_A_highDangerGoals
// OnIce_A_highDangerShots
// OnIce_A_lowDangerGoals
// OnIce_A_lowDangerShots
// OnIce_A_mediumDangerGoals
// OnIce_A_mediumDangerShots
// OnIce_A_missedShots
// OnIce_A_reboundGoals
// OnIce_A_rebounds
// OnIce_A_shotAttempts
// OnIce_A_shotsOnGoal
// OnIce_A_unblockedShotAttempts
// shotsBlockedByPlayer

// Anything Expected / Adjusted
// OnIce_A_flurryAdjustedxGoals
// OnIce_A_flurryScoreVenueAdjustedxGoals
// OnIce_A_highDangerxGoals
// OnIce_A_lowDangerxGoals
// OnIce_A_mediumDangerxGoals
// OnIce_A_reboundxGoals
// OnIce_A_scoreAdjustedShotsAttempts
// OnIce_A_scoreAdjustedUnblockedShotAttempts
// OnIce_A_scoreVenueAdjustedxGoals
// OnIce_A_xGoals
// OnIce_A_xGoalsFromActualReboundsOfShots
// OnIce_A_xGoalsFromxReboundsOfShots
// OnIce_A_xGoals_with_earned_rebounds
// OnIce_A_xGoals_with_earned_rebounds_scoreAdjusted
// OnIce_A_xGoals_with_earned_rebounds_scoreFlurryAdjusted
// OnIce_A_xOnGoal
// xGoalsAgainstAfterShifts

// Zones / Shifts
// I_F_dZoneShiftEnds
// I_F_dZoneShiftStarts
// fenwickAgainstAfterShifts
{
  /* Neutral */
}
// Pure Production Sub Category
// I_F_faceOffsWon
// I_F_flyShiftEnds
// I_F_missedShots
// I_F_penalityMinutes
// I_F_shifts
// OffIce_A_shotAttempts
// OffIce_F_shotAttempts
// games_played
// iceTimeRank
// icetime
// corsiForAfterShifts
// corsiAgainstAfterShifts
// offIce_corsiPercentage
// offIce_fenwickPercentage
// situation
// team
// timeOnBench
// faceoffsLost
// faceoffsWon
// penalityMinutes
// penalityMinutesDrawn
// penalties
// penaltiesDrawn
// I_F_playStopped
// I_F_freeze
// I_F_playContinuedOutsideZone
// OnIce_F_missedShots
// actualOnIceGoalsAgainst

// Anything Expected / Adjusted
// OffIce_A_xGoals
// OffIce_F_xGoals
// gameScore
// xGoalsForAfterShifts
// offIce_xGoalsPercentage
// expectedGoalDifferential
// I_F_xFreeze
// I_F_xPlayContinuedOutsideZone
// I_F_xPlayStopped

// Zones / Shifts
// I_F_flyShiftStarts
// I_F_neutralZoneShiftEnds
// I_F_neutralZoneShiftStarts
// shifts
