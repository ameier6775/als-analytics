import Excel from 'exceljs';
import { groupBy, keyBy, omit, pick } from 'lodash';
import path from 'path';
import excuteQuery from '../../../../db';

export default async function handler(req, res) {
  // console.log('req nom', req.body);
  // const result = await excuteQuery({
  //   query: 'INSERT INTO post(content) VALUES(?)',
  //   values: [req.body.content],
  // });
  // console.log('ttt', result);

  const dir = path.resolve('../stats-app/data/nhl/players/2022');

  // Money Puck Data
  const columnArrayMoneyPuck =
    'playerId season name team position situation games_played icetime shifts gameScore onIce_xGoalsPercentage offIce_xGoalsPercentage onIce_corsiPercentage offIce_corsiPercentage onIce_fenwickPercentage offIce_fenwickPercentage iceTimeRank I_F_xOnGoal I_F_xGoals I_F_xRebounds I_F_xFreeze I_F_xPlayStopped I_F_xPlayContinuedInZone I_F_xPlayContinuedOutsideZone I_F_flurryAdjustedxGoals I_F_scoreVenueAdjustedxGoals I_F_flurryScoreVenueAdjustedxGoals I_F_primaryAssists I_F_secondaryAssists I_F_shotsOnGoal I_F_missedShots I_F_blockedShotAttempts I_F_shotAttempts I_F_points I_F_goals I_F_rebounds I_F_reboundGoals I_F_freeze I_F_playStopped I_F_playContinuedInZone I_F_playContinuedOutsideZone I_F_savedShotsOnGoal I_F_savedUnblockedShotAttempts penalties I_F_penalityMinutes I_F_faceOffsWon I_F_hits I_F_takeaways I_F_giveaways I_F_lowDangerShots I_F_mediumDangerShots I_F_highDangerShots I_F_lowDangerxGoals I_F_mediumDangerxGoals I_F_highDangerxGoals I_F_lowDangerGoals I_F_mediumDangerGoals I_F_highDangerGoals I_F_scoreAdjustedShotsAttempts I_F_unblockedShotAttempts I_F_scoreAdjustedUnblockedShotAttempts I_F_dZoneGiveaways I_F_xGoalsFromxReboundsOfShots I_F_xGoalsFromActualReboundsOfShots I_F_reboundxGoals I_F_xGoals_with_earned_rebounds I_F_xGoals_with_earned_rebounds_scoreAdjusted I_F_xGoals_with_earned_rebounds_scoreFlurryAdjusted I_F_shifts I_F_oZoneShiftStarts I_F_dZoneShiftStarts I_F_neutralZoneShiftStarts I_F_flyShiftStarts I_F_oZoneShiftEnds I_F_dZoneShiftEnds I_F_neutralZoneShiftEnds I_F_flyShiftEnds faceoffsWon faceoffsLost timeOnBench penalityMinutes penalityMinutesDrawn penaltiesDrawn shotsBlockedByPlayer OnIce_F_xOnGoal OnIce_F_xGoals OnIce_F_flurryAdjustedxGoals OnIce_F_scoreVenueAdjustedxGoals OnIce_F_flurryScoreVenueAdjustedxGoals OnIce_F_shotsOnGoal OnIce_F_missedShots OnIce_F_blockedShotAttempts OnIce_F_shotAttempts OnIce_F_goals OnIce_F_rebounds OnIce_F_reboundGoals OnIce_F_lowDangerShots OnIce_F_mediumDangerShots OnIce_F_highDangerShots OnIce_F_lowDangerxGoals OnIce_F_mediumDangerxGoals OnIce_F_highDangerxGoals OnIce_F_lowDangerGoals OnIce_F_mediumDangerGoals OnIce_F_highDangerGoals OnIce_F_scoreAdjustedShotsAttempts OnIce_F_unblockedShotAttempts OnIce_F_scoreAdjustedUnblockedShotAttempts OnIce_F_xGoalsFromxReboundsOfShots OnIce_F_xGoalsFromActualReboundsOfShots OnIce_F_reboundxGoals OnIce_F_xGoals_with_earned_rebounds OnIce_F_xGoals_with_earned_rebounds_scoreAdjusted OnIce_F_xGoals_with_earned_rebounds_scoreFlurryAdjusted OnIce_A_xOnGoal OnIce_A_xGoals OnIce_A_flurryAdjustedxGoals OnIce_A_scoreVenueAdjustedxGoals OnIce_A_flurryScoreVenueAdjustedxGoals OnIce_A_shotsOnGoal OnIce_A_missedShots OnIce_A_blockedShotAttempts OnIce_A_shotAttempts OnIce_A_goals OnIce_A_rebounds OnIce_A_reboundGoals OnIce_A_lowDangerShots OnIce_A_mediumDangerShots OnIce_A_highDangerShots OnIce_A_lowDangerxGoals OnIce_A_mediumDangerxGoals OnIce_A_highDangerxGoals OnIce_A_lowDangerGoals OnIce_A_mediumDangerGoals OnIce_A_highDangerGoals OnIce_A_scoreAdjustedShotsAttempts OnIce_A_unblockedShotAttempts OnIce_A_scoreAdjustedUnblockedShotAttempts OnIce_A_xGoalsFromxReboundsOfShots OnIce_A_xGoalsFromActualReboundsOfShots OnIce_A_reboundxGoals OnIce_A_xGoals_with_earned_rebounds OnIce_A_xGoals_with_earned_rebounds_scoreAdjusted OnIce_A_xGoals_with_earned_rebounds_scoreFlurryAdjusted OffIce_F_xGoals OffIce_A_xGoals OffIce_F_shotAttempts OffIce_A_shotAttempts xGoalsForAfterShifts xGoalsAgainstAfterShifts corsiForAfterShifts corsiAgainstAfterShifts fenwickForAfterShifts fenwickAgainstAfterShifts'.split(
      /\s+/,
    );
  type ColumnHeaderForPlayersMoneyPuck = { [C in typeof columnArrayMoneyPuck[number]]: number };
  const columnHeaderMapMoneyPuck: ColumnHeaderForPlayersMoneyPuck = columnArrayMoneyPuck.reduce(
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

    // Creating a new field inside the objects
    rowObject.expectedCases =
      (rowObject['I_F_flurryAdjustedxGoals'] +
        rowObject['I_F_flurryScoreVenueAdjustedxGoals'] +
        rowObject['I_F_highDangerxGoals'] +
        rowObject['I_F_lowDangerxGoals'] +
        rowObject['I_F_mediumDangerxGoals'] +
        rowObject['I_F_reboundxGoals'] +
        rowObject['I_F_scoreVenueAdjustedxGoals'] +
        rowObject['OnIce_F_reboundxGoals'] +
        rowObject['OnIce_F_scoreVenueAdjustedxGoals'] +
        rowObject['OnIce_F_xGoals'] +
        rowObject['OnIce_F_xGoalsFromActualReboundsOfShots'] +
        rowObject['OnIce_F_xGoalsFromxReboundsOfShots'] +
        rowObject['OnIce_F_xGoals_with_earned_rebounds'] +
        rowObject['OnIce_F_xGoals_with_earned_rebounds_scoreAdjusted'] +
        rowObject['OnIce_F_xGoals_with_earned_rebounds_scoreFlurryAdjusted'] +
        rowObject['OnIce_F_flurryAdjustedxGoals'] +
        rowObject['OnIce_F_flurryScoreVenueAdjustedxGoals'] +
        rowObject['OnIce_F_highDangerxGoals'] +
        rowObject['OnIce_F_lowDangerxGoals'] +
        rowObject['OnIce_F_mediumDangerxGoals'] +
        rowObject['I_F_xGoals'] +
        rowObject['I_F_xGoalsFromActualReboundsOfShots'] +
        rowObject['I_F_xGoalsFromxReboundsOfShots'] +
        rowObject['I_F_xGoals_with_earned_rebounds'] +
        rowObject['I_F_xGoals_with_earned_rebounds_scoreAdjusted'] +
        rowObject['I_F_xGoals_with_earned_rebounds_scoreFlurryAdjusted'] +
        rowObject['onIce_xGoalsPercentage']) /
      rowObject['icetime'];

    if (rowNumber !== 1) {
      dataMoneyPuck.push(rowObject);
    }
  });
  // Configuring the average offensive awareness based off the model above
  const dataMoneyPuckAll = dataMoneyPuck.filter(
    (player) => player.situation === 'all' && parseInt(player.icetime) > 2000,
  );

  // Response
  res.status(200).json({
    dataMoneyPuck: dataMoneyPuckAll,
  });

  // NTS On-Ice Data
  // const columnArrayOnIce =
  //   'PlayerId Player Team Position GP TOI CF CA CFPercentage FF FA FFPercentage SF SA SFPercentage GF GA GFPercentage xGF xGA xGFPercentage SCF SCA SCFPercentage HDCF HDCA HDCFPercentage HDGF HDGA HDGFPercentage MDCF MDCA MDCFPercentage MDGF MDGA MDGFPercentage LDCF LDCA LDCFPercentage LDGF LDGA LDGFPercentage On-Ice SHPercentage On-Ice SVPercentage PDO OffZoneStarts NeuZoneStarts DefZoneStarts OnTheFlyStarts OffZoneStartPercentage OffZoneFaceoffs NeuZoneFaceoffsDefZoneFaceoffs OffZoneFaceoffPercentage'.split(
  //     /\s+/,
  //   );
  // type ColumnHeaderForPlayersOnIce = { [C in typeof columnArrayOnIce[number]]: number };
  // const columnHeaderMapOnIce: ColumnHeaderForPlayersOnIce = columnArrayOnIce.reduce(
  //   (acc, value, index) => ({ ...acc, [value]: index + 1 }),
  //   {},
  // );
  // const workbookOnIce = new Excel.Workbook();
  // await workbookOnIce.csv.readFile(`${dir}/onice.csv`);
  // const worksheetOnIce = workbookOnIce.worksheets[0];
  // const dataOnIce = [];
  // worksheetOnIce.eachRow((row, rowNumber) => {
  //   const rowObject = Object.entries(columnHeaderMapOnIce).reduce((acc, value) => {
  //     return {
  //       ...acc,
  //       [value[0]]: row.values[value[1]],
  //     };
  //   }, {});
  //   if (rowNumber !== 1) {
  //     dataOnIce.push(rowObject);
  //   }
  // });

  // NTS Individual Data
  // const columnArrayIndividual =
  //   'PlayerId Player Team Position GP TOI Goals TotalAssists FirstAssists SecondAssists TotalPoints IPP Shots SHPercentage ixG iCF iFF iSCF iHDCF RushAttempts ReboundsCreated PIM TotalPenalties Minor Major Misconduct PenaltiesDrawn Giveaways Takeaways Hits HitsTaken ShotsBlocked FaceoffsWon FaceoffsLost FaceoffsPercentage'.split(
  //     /\s+/,
  //   );
  // type ColumnHeaderForPlayersIndividual = { [C in typeof columnArrayIndividual[number]]: number };
  // const columnHeaderMapIndividual: ColumnHeaderForPlayersIndividual = columnArrayIndividual.reduce(
  //   (acc, value, index) => ({ ...acc, [value]: index + 1 }),
  //   {},
  // );
  // const workbookIndividual = new Excel.Workbook();
  // await workbookIndividual.csv.readFile(`${dir}/individual.csv`);
  // const worksheetIndividual = workbookIndividual.worksheets[0];
  // const dataIndividual = [];
  // worksheetIndividual.eachRow((row, rowNumber) => {
  //   const rowObject = Object.entries(columnHeaderMapIndividual).reduce((acc, value) => {
  //     return {
  //       ...acc,
  //       [value[0]]: row.values[value[1]],
  //     };
  //   }, {});
  //   if (rowNumber !== 1) {
  //     dataIndividual.push(rowObject);
  //   }
  // });

  // Hockey-Reference Stats Data
  // const columnArrayStats =
  //   'rank name id age team position gamesPlayed goals assists points plusMinus pim pointShares evenStrengthGoals powerPlayGoals shortHandedGoals gameWinningGoals evenStrengthAssists powerPlayAssists shortHandedAssists shots shPercentage toi averageTOI blocks hits faceOffWins faceOffLosses faceOffPercentage'.split(
  //     /\s+/,
  //   );

  // type ColumnHeaderForPlayersStats = { [C in typeof columnArrayStats[number]]: number };

  // const columnHeaderMapStats: ColumnHeaderForPlayersStats = columnArrayStats.reduce(
  //   (acc, value, index) => ({ ...acc, [value]: index + 1 }),
  //   {},
  // );

  // const workbookStats = new Excel.Workbook();
  // await workbookStats.csv.readFile(`${dir}/stats.csv`);
  // const worksheetStats = workbookStats.worksheets[0];
  // const dataStats = [];

  // worksheetStats.eachRow((row, rowNumber) => {
  //   const rowObject = Object.entries(columnHeaderMapStats).reduce((acc, value) => {
  //     return {
  //       ...acc,
  //       [value[0]]: row.values[value[1]],
  //     };
  //   }, {});
  //   if (rowNumber !== 1) {
  //     dataStats.push(rowObject);
  //   }
  // });

  // Hockey-Reference Analytics Data
  // const columnArrayAnalytics =
  //   'rank name id age team position gamesPlayed corsiFor corsiAgainst corsiForPercentage relativeCorsiForPercentage fenwickFor fenwickAgainst fenwickForPercentage relativeFenwickForPercentage onIceSHPercentage onIceSVPercentage pdo oZoneStartPercentage dZoneStartPercentage toiPerGame evenTOIPerGame takeAways giveAways expectedPlusMinus shotsAttempted shotsOnNetPercentage'.split(
  //     /\s+/,
  //   );

  // type ColumnHeaderForPlayersAnalytics = { [C in typeof columnArrayAnalytics[number]]: number };

  // const columnHeaderMapAnalytics: ColumnHeaderForPlayersAnalytics = columnArrayAnalytics.reduce(
  //   (acc, value, index) => ({ ...acc, [value]: index + 1 }),
  //   {},
  // );

  // const workbookAnalytics = new Excel.Workbook();
  // await workbookAnalytics.csv.readFile(`${dir}/analytics.csv`);
  // const worksheetAnalytics = workbookAnalytics.worksheets[0];
  // const dataAnalytics = [];

  // worksheetAnalytics.eachRow((row, rowNumber) => {
  //   const rowObject = Object.entries(columnHeaderMapAnalytics).reduce((acc, value) => {
  //     return {
  //       ...acc,
  //       [value[0]]: row.values[value[1]],
  //     };
  //   }, {});
  //   if (rowNumber !== 1) {
  //     dataAnalytics.push(rowObject);
  //   }
  // });

  // Trying to join

  // Joining the two tables
  // const data = [];
  // for (let i = 0; i < dataAnalytics.length; i++) {
  //   const analyticElement = dataAnalytics[i];
  //   const statElement = dataStats.find(({ id }) => id === analyticElement.id);
  //   const element = { ...analyticElement, ...statElement };
  //   data.push(element);
  // }
}
