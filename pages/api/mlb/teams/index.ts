import Excel from 'exceljs';
import _, { groupBy, keyBy, omit, pick, orderBy } from 'lodash';
import path from 'path';

export default async function handler(req, res) {
  const dir = path.resolve('../stats-app/data/mlb/teams/2022');

  // Hitters Fan Graphs Standard Data
  const columnArrayHitterFGStandard = 'Team G AB PA H 1B 2B 3B HR R RBI BB IBB SO HBP SF SH GDP SB CS AVG'.split(/\s+/);

  type ColumnHeaderForHitterFGStandard = { [C in typeof columnArrayHitterFGStandard[number]]: number };
  const columnHeaderMapHitterFGStandard: ColumnHeaderForHitterFGStandard = columnArrayHitterFGStandard.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookHitterFGStandard = new Excel.Workbook();
  await workbookHitterFGStandard.csv.readFile(`${dir}/HitterFGStandard.csv`);
  const worksheetHitterFGStandard = workbookHitterFGStandard.worksheets[0];
  const dataHitterFGStandard = [];

  worksheetHitterFGStandard.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapHitterFGStandard).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataHitterFGStandard.push(rowObject);
    }
  });
  // Hitters Fan Graphs Advanced Data
  const columnArrayHitterFGAdvanced =
    'Team PA BBRate KRate BBPerK AVG OBP SLG OPS ISO Spd BABIP UBR wGDP wSB wRC wRAA wOBA wRC'.split(/\s+/);

  type ColumnHeaderForHitterFGAdvanced = { [C in typeof columnArrayHitterFGAdvanced[number]]: number };
  const columnHeaderMapHitterFGAdvanced: ColumnHeaderForHitterFGAdvanced = columnArrayHitterFGAdvanced.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookHitterFGAdvanced = new Excel.Workbook();
  await workbookHitterFGAdvanced.csv.readFile(`${dir}/HitterFGAdvanced.csv`);
  const worksheetHitterFGAdvanced = workbookHitterFGAdvanced.worksheets[0];
  const dataHitterFGAdvanced = [];

  worksheetHitterFGAdvanced.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapHitterFGAdvanced).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataHitterFGAdvanced.push(rowObject);
    }
  });

  // Pitchers Fan Graphs Standard Data
  const columnArrayPitcherFGStandard = 'Team W L ERA G GS CG ShO SV HLD BS IP TBF H R ER HR BB IBB HBP WP BK SO'.split(
    /\s+/,
  );

  type ColumnHeaderForPitcherFGStandard = { [C in typeof columnArrayPitcherFGStandard[number]]: number };
  const columnHeaderMapPitcherFGStandard: ColumnHeaderForPitcherFGStandard = columnArrayPitcherFGStandard.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookPitcherFGStandard = new Excel.Workbook();
  await workbookPitcherFGStandard.csv.readFile(`${dir}/PitcherFGStandard.csv`);
  const worksheetPitcherFGStandard = workbookPitcherFGStandard.worksheets[0];
  const dataPitcherFGStandard = [];

  worksheetPitcherFGStandard.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapPitcherFGStandard).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataPitcherFGStandard.push(rowObject);
    }
  });
  // Pitchers Fan Graphs Advanced Data
  const columnArrayPitcherFGAdvanced =
    'Team K/9 BB/9 K/BB HR/9 KPer BBPer K-BBPer AVG WHIP BABIP LOBPer ERA- FIP- xFIP- ERA FIP E-F xFIP SIERA'.split(
      /\s+/,
    );
  type ColumnHeaderForPitcherFGAdvanced = { [C in typeof columnArrayPitcherFGAdvanced[number]]: number };
  const columnHeaderMapPitcherFGAdvanced: ColumnHeaderForPitcherFGAdvanced = columnArrayPitcherFGAdvanced.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookPitcherFGAdvanced = new Excel.Workbook();
  await workbookPitcherFGAdvanced.csv.readFile(`${dir}/PitcherFGAdvanced.csv`);
  const worksheetPitcherFGAdvanced = workbookPitcherFGAdvanced.worksheets[0];
  const dataPitcherFGAdvanced = [];

  worksheetPitcherFGAdvanced.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapPitcherFGAdvanced).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataPitcherFGAdvanced.push(rowObject);
    }
  });

  // Joining the two hitter fan graphs tables by team name
  const hittingData = [];
  for (let i = 0; i < 30; i++) {
    const standardElement = dataHitterFGStandard[i];

    // Adding these two fields for the dropdown
    standardElement.value = standardElement['Team'];
    standardElement.label = standardElement['Team'];

    // Finding advanced data object by the standards team name
    const advancedElement = dataHitterFGAdvanced.find((obj) => obj['Team'] === standardElement['Team']);

    // Putting both objects values into one & inserting it into the array
    const element = { ...standardElement, ...advancedElement };
    hittingData.push(element);
  }

  // Joining the two pitcher fan graphs tables by team name
  const pitchingData = [];
  for (let i = 0; i < 30; i++) {
    const standardElement = dataPitcherFGStandard[i];

    // Adding these two fields for the dropdown
    standardElement.value = standardElement['Team'];
    standardElement.label = standardElement['Team'];

    // Finding advanced data object by the standards team name
    const advancedElement = dataPitcherFGAdvanced.find((obj) => obj['Team'] === standardElement['Team']);

    // Putting both objects values into one & inserting it into the array
    const element = { ...standardElement, ...advancedElement };
    pitchingData.push(element);
  }

  // Response
  res.status(200).json({
    hittingData: hittingData,
    pitchingData: pitchingData,
  });
}
