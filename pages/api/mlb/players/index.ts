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
  const columnArrayPitcherStandard =
    'Name Team W L ERA G GS CG ShO SV HLD BS IP TBF H R ER HR BB IBB HBP WP BK SO playerid'.split(/\s+/);

  type ColumnHeaderForPitcherStandard = { [C in typeof columnArrayPitcherStandard[number]]: number };
  const columnHeaderMapPitcherStandard: ColumnHeaderForPitcherStandard = columnArrayPitcherStandard.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookPitcherStandard = new Excel.Workbook();
  await workbookPitcherStandard.csv.readFile(`${dir}/PitcherFGStandard.csv`);
  const worksheetPitcherStandard = workbookPitcherStandard.worksheets[0];
  const dataPitcherStandard = [];

  worksheetPitcherStandard.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapPitcherStandard).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataPitcherStandard.push(rowObject);
    }
  });
  // Pitchers Advanced Data - Fan Graphs
  const columnArrayPitcherAdvanced =
    'Name Team KPer9 BBPer9 KPerBB HRPer9 KRate BBRate KBBRate AVG WHIP BABIP LOBRate ERA- FIP- xFIP- ERA FIP E-F xFIP SIERA playerid'.split(
      /\s+/,
    );

  type ColumnHeaderForPitcherAdvanced = { [C in typeof columnArrayPitcherAdvanced[number]]: number };
  const columnHeaderMapPitcherAdvanced: ColumnHeaderForPitcherAdvanced = columnArrayPitcherAdvanced.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookPitcherAdvanced = new Excel.Workbook();
  await workbookPitcherAdvanced.csv.readFile(`${dir}/PitcherFGAdvanced.csv`);
  const worksheetPitcherAdvanced = workbookPitcherAdvanced.worksheets[0];
  const dataPitcherAdvanced = [];

  worksheetPitcherAdvanced.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapPitcherAdvanced).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataPitcherAdvanced.push(rowObject);
    }
  });

  // Filter out pitchers with very few innings
  const pitchersStandardArray = dataPitcherStandard.filter((player) => parseInt(player.IP) > 10);
  const pitchersAdvancedArray = dataPitcherAdvanced.filter((player) => parseInt(player.IP) > 10);

  // Adding new fields to the pitchers array
  const pitchersData = [];
  for (let i = 0; i < pitchersStandardArray.length; i++) {
    const standardPitcherElement = pitchersStandardArray[i];
    const advancedPitcherElement = pitchersAdvancedArray.find((obj) => obj.Name === standardPitcherElement.Name);

    // Adding these two fields for the dropdown
    standardPitcherElement.value = standardPitcherElement.Name;
    standardPitcherElement.label = standardPitcherElement.Name;

    // Putting both objects values into one & inserting it into the array
    const element = {
      ...standardPitcherElement,
      ...advancedPitcherElement,
    };
    pitchersData.push(element);
  }

  // Response
  res.status(200).json({
    hittersData: hittersData,
    pitchersData: pitchersData,
  });
}
