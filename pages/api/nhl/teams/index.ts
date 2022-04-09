import Excel from 'exceljs';
import _, { groupBy, keyBy, omit, pick, orderBy } from 'lodash';
import path from 'path';

export default async function handler(req, res) {
  const dir = path.resolve('../stats-app/data/nhl/teams/2022');
  // Hockey-Reference Stats Data
  const columnArrayStats =
    'teamId name averageAge gamesPlayed wins losses otLosses points pointsPercentage overallGoalsFor overallGoalsAgainst soWins soLosses ratingSystem strengthOfSchedule goalsForPerGame goalsAgainstPerGame ppGoalsFor ppChancesFor ppPercentage ppGoalsAgainst ppChancesAgainst pkPercentage shGoalsFor shGoalsAgainst pimPerG pimDrawnPerGame saves savePercentage shotsAgainst svPercentage shutouts'.split(
      /\s+/,
    );
  type ColumnHeaderForTeamsStats = { [C in typeof columnArrayStats[number]]: number };
  const columnHeaderMapStats: ColumnHeaderForTeamsStats = columnArrayStats.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );
  const workbookStats = new Excel.Workbook();
  await workbookStats.csv.readFile(`${dir}/stats.csv`);
  const worksheetStats = workbookStats.worksheets[0];
  const dataStats = [];
  worksheetStats.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapStats).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});
    if (rowNumber !== 1) {
      dataStats.push(rowObject);
    }
  });

  // Hockey-Reference Analytics Data
  const columnArrayAnalytics =
    'teamId name shPercentage svPercentage pdo corsiFor corsiAgainst corsiForPercentage fenwickFor fenwickAgainst fenwickForPercentage xGoalsFor xGoalsAgainst actualGoalsFor actualGoalsAgainst actualGoalDifferential scoringChancesFor scoringChancesAgainst scoringChancesForPercentage highDangerChancesFor highDangerChancesAgainst highDangerChancesForPercentage highDangerGoalsFor highDangerConversionRateFor highDangerGoalsAgainst highDangerConversionRateAgainst'.split(
      /\s+/,
    );

  type ColumnHeaderForTeamsAnalytics = { [C in typeof columnArrayAnalytics[number]]: number };
  const columnHeaderMapAnalytics: ColumnHeaderForTeamsAnalytics = columnArrayAnalytics.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookAnalytics = new Excel.Workbook();
  await workbookAnalytics.csv.readFile(`${dir}/analytics.csv`);
  const worksheetAnalytics = workbookAnalytics.worksheets[0];
  const dataAnalytics = [];

  worksheetAnalytics.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapAnalytics).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});
    if (rowNumber !== 1) {
      dataAnalytics.push(rowObject);
    }
  });

  // Money-Puck Data
  const columnArrayMoneyPuck =
    'team season name team position situation games_played xGoalsPercentage corsiPercentage fenwickPercentage iceTime xOnGoalFor xGoalsFor xReboundsFor xFreezeFor xPlayStoppedFor xPlayContinuedInZoneFor xPlayContinuedOutsideZoneFor flurryAdjustedxGoalsFor scoreVenueAdjustedxGoalsFor flurryScoreVenueAdjustedxGoalsFor shotsOnGoalFor missedShotsFor blockedShotAttemptsFor shotAttemptsFor goalsFor reboundsFor reboundGoalsFor freezeFor playStoppedFor playContinuedInZoneFor playContinuedOutsideZoneFor savedShotsOnGoalFor savedUnblockedShotAttemptsFor penaltiesFor penalityMinutesFor faceOffsWonFor hitsFor takeawaysFor giveawaysFor lowDangerShotsFor mediumDangerShotsFor highDangerShotsFor lowDangerxGoalsFor mediumDangerxGoalsFor highDangerxGoalsFor lowDangerGoalsFor mediumDangerGoalsFor highDangerGoalsFor scoreAdjustedShotsAttemptsFor unblockedShotAttemptsFor scoreAdjustedUnblockedShotAttemptsFor dZoneGiveawaysFor xGoalsFromxReboundsOfShotsFor xGoalsFromActualReboundsOfShotsFor reboundxGoalsFor totalShotCreditFor scoreAdjustedTotalShotCreditFor scoreFlurryAdjustedTotalShotCreditFor xOnGoalAgainst xGoalsAgainst xReboundsAgainst xFreezeAgainst xPlayStoppedAgainst xPlayContinuedInZoneAgainst xPlayContinuedOutsideZoneAgainst flurryAdjustedxGoalsAgainst scoreVenueAdjustedxGoalsAgainst flurryScoreVenueAdjustedxGoalsAgainst shotsOnGoalAgainst missedShotsAgainst blockedShotAttemptsAgainst shotAttemptsAgainst goalsAgainst reboundsAgainst reboundGoalsAgainst freezeAgainst playStoppedAgainst playContinuedInZoneAgainst playContinuedOutsideZoneAgainst savedShotsOnGoalAgainst savedUnblockedShotAttemptsAgainst penaltiesAgainst penalityMinutesAgainst faceOffsWonAgainst hitsAgainst takeawaysAgainst giveawaysAgainst lowDangerShotsAgainst mediumDangerShotsAgainst highDangerShotsAgainst lowDangerxGoalsAgainst mediumDangerxGoalsAgainst highDangerxGoalsAgainst lowDangerGoalsAgainst mediumDangerGoalsAgainst highDangerGoalsAgainst scoreAdjustedShotsAttemptsAgainst unblockedShotAttemptsAgainst scoreAdjustedUnblockedShotAttemptsAgainst dZoneGiveawaysAgainst xGoalsFromxReboundsOfShotsAgainst xGoalsFromActualReboundsOfShotsAgainst reboundxGoalsAgainst totalShotCreditAgainst scoreAdjustedTotalShotCreditAgainst scoreFlurryAdjustedTotalShotCreditAgainst'.split(
      /\s+/,
    );

  type ColumnHeaderForTeamsMoneyPuck = { [C in typeof columnArrayMoneyPuck[number]]: number };
  const columnHeaderMapMoneyPuck: ColumnHeaderForTeamsMoneyPuck = columnArrayMoneyPuck.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookMoneyPuck = new Excel.Workbook();
  await workbookMoneyPuck.csv.readFile(`${dir}/moneypuck.csv`);
  const worksheetMoneyPuck = workbookMoneyPuck.worksheets[0];
  const dataMoneyPuck = [];

  worksheetMoneyPuck.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapMoneyPuck).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    rowObject.offensiveAwareness =
      parseFloat(
        rowObject.fenwickPercentage * 0.0666 +
          rowObject.xPlayContinuedInZoneFor * 0.0666 +
          rowObject.flurryAdjustedxGoalsFor * 0.0666 +
          rowObject.playContinuedInZoneFor * 0.0666 +
          rowObject.xGoalsFromActualReboundsOfShotsFor * 0.0666 +
          rowObject.reboundxGoalsFor * 0.0666 +
          rowObject.scoreAdjustedShotsAttemptsFor * 0.0666 +
          rowObject.unblockedShotAttemptsFor * 0.0666 +
          rowObject.scoreAdjustedUnblockedShotAttemptsFor * 0.0666 +
          rowObject.totalShotCreditFor * 0.0666 +
          rowObject.scoreAdjustedTotalShotCreditFor * 0.0666 +
          rowObject.scoreFlurryAdjustedTotalShotCreditFor * 0.0666 +
          // Expected Goals
          (rowObject.lowDangerxGoalsFor * 0.133 +
            rowObject.mediumDangerxGoalsFor * 0.333 +
            rowObject.highDangerxGoalsFor * 0.533) *
            0.0666 +
          // Rebounds
          (rowObject.reboundGoalsFor / rowObject.reboundsFor) * 0.0666 +
          // Goals By Zone
          (rowObject.lowDangerGoalsFor * 0.133 +
            rowObject.mediumDangerGoalsFor * 0.333 +
            rowObject.highDangerGoalsFor * 0.533) *
            0.0666 +
          // Shots By Zone - Shots Blocked / Missed
          (rowObject.lowDangerShotsFor * 0.133 +
            rowObject.mediumDangerShotsFor * 0.333 +
            rowObject.highDangerShotsFor * 0.533) *
            0.0666 -
          (rowObject.missedShotsFor * 0.0333 + rowObject.blockedShotAttemptsFor * 0.0333),
      ) / rowObject.games_played;

    // (team.xPlayContinuedOutsideZoneFor * 0.01 +
    //   team.missedShotsFor * 0.01 +
    //   team.blockedShotAttemptsFor * 0.01 +
    //   team.playStoppedFor * 0.01)

    // if (rowNumber === 8) {
    //   console.log(rowObject.position);
    // }

    if (rowNumber !== 1) {
      dataMoneyPuck.push(rowObject);
    }
  });

  // Configuring the average offensive awareness based off the model above
  const dataMoneyPuckAll = dataMoneyPuck.filter((team) => team.situation === 'all');
  // const averageOffensiveAwareness =
  //   dataMoneyPuckAll.reduce((total, next) => total + parseFloat(next.offensiveAwareness), 0) / dataMoneyPuckAll.length;
  const averageOffensiveAwareness = dataMoneyPuckAll.reduce(
    (first, second) =>
      parseInt(first.offensiveAwareness) > parseInt(second.offensiveAwareness)
        ? parseFloat(first.offensiveAwareness)
        : parseFloat(second.offensiveAwareness),
    0,
  );

  console.log(averageOffensiveAwareness);

  // Trying to formulate a score
  dataMoneyPuckAll.map((team) => {
    team.averageOffensiveAwareness = parseFloat(team.offensiveAwareness) / averageOffensiveAwareness;
  });

  // Joining the two hockey-reference tables
  const data = [];
  for (let i = 0; i < 32; i++) {
    const analyticElement = dataAnalytics[i];
    const statElement = dataStats[i];
    const element = { ...analyticElement, ...statElement };
    data.push(element);
  }

  // Response
  res.status(200).json({
    data: data,
    dataMoneyPuck: dataMoneyPuck,
  });
}
