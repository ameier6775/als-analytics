import Excel from 'exceljs';
import _, { groupBy, keyBy, omit, pick, orderBy } from 'lodash';
import path from 'path';

export default async function handler(req, res) {
  const dir = path.resolve('../stats-app/data/mlb/players/2022');

  // Hitters Standard Data - Rotowire
  const columnArrayHitterStandard =
    'Player Team Pos Age G AB R H 2B 3B HR RBI SB CS BB SO SH SF HBP AVG OBP SLG OPS'.split(/\s+/);

  type ColumnHeaderForHitterStandard = { [C in typeof columnArrayHitterStandard[number]]: number };
  const columnHeaderMapHitterStandard: ColumnHeaderForHitterStandard = columnArrayHitterStandard.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookHitterStandard = new Excel.Workbook();
  await workbookHitterStandard.csv.readFile(`${dir}/HitterRWStandard.csv`);
  const worksheetHitterStandard = workbookHitterStandard.worksheets[0];
  const dataHitterStandard = [];

  worksheetHitterStandard.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapHitterStandard).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataHitterStandard.push(rowObject);
    }
  });

  // Hitters Advanced Data - Fan Graphs
  const columnArrayHitterAdvanced =
    'Name Team PA BBRate KRate BBPerK AVG OBP SLG OPS ISO Spd BABIP UBR wGDP wSB wRC wRAA wOBA wRC+ playerid'.split(
      /\s+/,
    );

  type ColumnHeaderForHitterAdvanced = { [C in typeof columnArrayHitterAdvanced[number]]: number };
  const columnHeaderMapHitterAdvanced: ColumnHeaderForHitterAdvanced = columnArrayHitterAdvanced.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookHitterAdvanced = new Excel.Workbook();
  await workbookHitterAdvanced.csv.readFile(`${dir}/HitterFGAdvanced.csv`);
  const worksheetHitterAdvanced = workbookHitterAdvanced.worksheets[0];
  const dataHitterAdvanced = [];

  worksheetHitterAdvanced.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapHitterAdvanced).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataHitterAdvanced.push(rowObject);
    }
  });

  // Filter out hitters with very few at bats
  const hittersStandardArray = dataHitterStandard.filter((player) => parseInt(player.AB) > 50);
  const hittersAdvancedArray = dataHitterAdvanced.filter((player) => parseInt(player.PA) > 50);

  // Adding new fields to the hitters array
  const hittersData = [];
  for (let i = 0; i < hittersStandardArray.length; i++) {
    const standardHitterElement = hittersStandardArray[i];
    const advancedHitterElement = hittersAdvancedArray.find((obj) => obj.Name === standardHitterElement['Player']);

    // Adding these two fields for the dropdown
    standardHitterElement.value = standardHitterElement['Player'];
    standardHitterElement.label = standardHitterElement['Player'];

    // Putting both objects values into one & inserting it into the array
    const element = {
      ...standardHitterElement,
      ...advancedHitterElement,
    };
    hittersData.push(element);
  }

  // Pitchers Standard Data - Fan Graphs
  const columnArrayPitcherStandardSP =
    'Name Team W L ERA G GS CG ShO SV HLD BS IP TBF H R ER HR BB IBB HBP WP BK SO playerid'.split(/\s+/);

  type ColumnHeaderForPitcherStandardSP = { [C in typeof columnArrayPitcherStandardSP[number]]: number };
  const columnHeaderMapPitcherStandardSP: ColumnHeaderForPitcherStandardSP = columnArrayPitcherStandardSP.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookPitcherStandardSP = new Excel.Workbook();
  await workbookPitcherStandardSP.csv.readFile(`${dir}/SPitcherFGStandard.csv`);
  const worksheetPitcherStandardSP = workbookPitcherStandardSP.worksheets[0];
  const dataPitcherStandardSP = [];

  worksheetPitcherStandardSP.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapPitcherStandardSP).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataPitcherStandardSP.push(rowObject);
    }
  });
  // Starting Pitchers Advanced Data - Fan Graphs
  const columnArrayPitcherAdvancedSP =
    'Name Team KPer9 BBPer9 KPerBB HRPer9 KRate BBRate KBBRate AVG WHIP BABIP LOBRate ERAadjusted FIPadjusted xFIPadjusted ERA FIP EadjustedF xFIP SIERA playerid'.split(
      /\s+/,
    );

  type ColumnHeaderForPitcherAdvancedSP = { [C in typeof columnArrayPitcherAdvancedSP[number]]: number };
  const columnHeaderMapPitcherAdvancedSP: ColumnHeaderForPitcherAdvancedSP = columnArrayPitcherAdvancedSP.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookPitcherAdvancedSP = new Excel.Workbook();
  await workbookPitcherAdvancedSP.csv.readFile(`${dir}/SPitcherFGAdvanced.csv`);
  const worksheetPitcherAdvancedSP = workbookPitcherAdvancedSP.worksheets[0];
  const dataPitcherAdvancedSP = [];

  worksheetPitcherAdvancedSP.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapPitcherAdvancedSP).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataPitcherAdvancedSP.push(rowObject);
    }
  });

  // Adding new fields to the pitchers array
  const pitchersDataSP = [];
  for (let i = 0; i < dataPitcherStandardSP.length; i++) {
    const standardPitcherElement = dataPitcherStandardSP[i];
    const advancedPitcherElement = dataPitcherAdvancedSP.find(
      (obj) => obj.playerid === standardPitcherElement.playerid,
    );

    // Adding these two fields for the dropdown
    standardPitcherElement.value = standardPitcherElement.Name;
    standardPitcherElement.label = standardPitcherElement.Name;
    standardPitcherElement.position = 'Starters';

    // Putting both objects values into one & inserting it into the array
    const element = {
      ...standardPitcherElement,
      ...advancedPitcherElement,
    };
    pitchersDataSP.push(element);
  }

  // Relief Pitchers Standard Data - Fan Graphs
  const columnArrayPitcherStandardRP =
    'Name Team W L ERA G GS CG ShO SV HLD BS IP TBF H R ER HR BB IBB HBP WP BK SO playerid'.split(/\s+/);

  type ColumnHeaderForPitcherStandardRP = { [C in typeof columnArrayPitcherStandardRP[number]]: number };
  const columnHeaderMapPitcherStandardRP: ColumnHeaderForPitcherStandardRP = columnArrayPitcherStandardRP.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookPitcherStandardRP = new Excel.Workbook();
  await workbookPitcherStandardRP.csv.readFile(`${dir}/RPitcherFGStandard.csv`);
  const worksheetPitcherStandardRP = workbookPitcherStandardRP.worksheets[0];
  const dataPitcherStandardRP = [];

  worksheetPitcherStandardRP.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapPitcherStandardRP).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataPitcherStandardRP.push(rowObject);
    }
  });
  // Pitchers Advanced Data - Fan Graphs
  const columnArrayPitcherAdvancedRP =
    'Name Team KPer9 BBPer9 KPerBB HRPer9 KRate BBRate KBBRate AVG WHIP BABIP LOBRate ERAadjusted FIPadjusted xFIPadjusted ERA FIP EadjustedF xFIP SIERA playerid'.split(
      /\s+/,
    );

  type ColumnHeaderForPitcherAdvancedRP = { [C in typeof columnArrayPitcherAdvancedRP[number]]: number };
  const columnHeaderMapPitcherAdvancedRP: ColumnHeaderForPitcherAdvancedRP = columnArrayPitcherAdvancedRP.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookPitcherAdvancedRP = new Excel.Workbook();
  await workbookPitcherAdvancedRP.csv.readFile(`${dir}/RPitcherFGAdvanced.csv`);
  const worksheetPitcherAdvancedRP = workbookPitcherAdvancedRP.worksheets[0];
  const dataPitcherAdvancedRP = [];

  worksheetPitcherAdvancedRP.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapPitcherAdvancedRP).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataPitcherAdvancedRP.push(rowObject);
    }
  });

  // Adding new fields to the pitchers array
  const pitchersDataRP = [];
  for (let i = 0; i < dataPitcherStandardRP.length; i++) {
    const standardPitcherElement = dataPitcherStandardRP[i];
    const advancedPitcherElement = dataPitcherAdvancedRP.find(
      (obj) => obj.playerid === standardPitcherElement.playerid,
    );

    // Adding these two fields for the dropdown
    standardPitcherElement.value = standardPitcherElement.Name;
    standardPitcherElement.label = standardPitcherElement.Name;
    standardPitcherElement.position = 'Relievers';

    // Putting both objects values into one & inserting it into the array
    const element = {
      ...standardPitcherElement,
      ...advancedPitcherElement,
    };
    pitchersDataRP.push(element);
  }

  // Response
  res.status(200).json({
    hittersData: hittersData,
    pitchersDataSP: pitchersDataSP,
    pitchersDataRP: pitchersDataRP,
  });
}
