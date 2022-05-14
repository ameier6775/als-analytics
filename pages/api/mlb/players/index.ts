import Excel from 'exceljs';
import _, { groupBy, keyBy, omit, pick, orderBy } from 'lodash';
import path from 'path';

export default async function handler(req, res) {
  const dir = path.resolve('../stats-app/data/mlb/players/2022');

  // Hitters Standard Data
  const columnArrayHitterStandard =
    'Player Team Pos Age G AB R H 2B 3B HR RBI SB CS BB SO SH SF HBP AVG OBP SLG OPS'.split(/\s+/);

  type ColumnHeaderForHitterStandard = { [C in typeof columnArrayHitterStandard[number]]: number };
  const columnHeaderMapHitterStandard: ColumnHeaderForHitterStandard = columnArrayHitterStandard.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookHitterStandard = new Excel.Workbook();
  await workbookHitterStandard.csv.readFile(`${dir}/Hitters.csv`);
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

  // Pitchers Standard Data
  const columnArrayPitcherStandard = 'Player Team Age G GS CG SHO IP H ER K BB HR W L SV BS HLD ERA WHIP'.split(/\s+/);

  type ColumnHeaderForPitcherStandard = { [C in typeof columnArrayPitcherStandard[number]]: number };
  const columnHeaderMapPitcherStandard: ColumnHeaderForPitcherStandard = columnArrayPitcherStandard.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookPitcherStandard = new Excel.Workbook();
  await workbookPitcherStandard.csv.readFile(`${dir}/Pitchers.csv`);
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

  // Filter out hitters with very few at bats
  const hittersArray = dataHitterStandard.filter((player) => parseInt(player.AB) > 50);
  // Filter out pitchers with very few innings
  const pitchersArray = dataPitcherStandard.filter((player) => parseInt(player.IP) > 10);

  // Adding new fields to the hitters array
  const hittersData = [];
  for (let i = 0; i < hittersArray.length; i++) {
    const standardHitterElement = hittersArray[i];

    // Adding these two fields for the dropdown
    standardHitterElement.value = standardHitterElement['Player'];
    standardHitterElement.label = standardHitterElement['Player'];

    // Putting both objects values into one & inserting it into the array
    const element = {
      ...standardHitterElement,
    };
    hittersData.push(element);
  }
  // Adding new fields to the pitchers array
  const pitchersData = [];
  for (let i = 0; i < pitchersArray.length; i++) {
    const standardPitcherElement = pitchersArray[i];

    // Adding these two fields for the dropdown
    standardPitcherElement.value = standardPitcherElement['Player'];
    standardPitcherElement.label = standardPitcherElement['Player'];

    // Putting both objects values into one & inserting it into the array
    const element = {
      ...standardPitcherElement,
    };
    pitchersData.push(element);
  }

  // Response
  res.status(200).json({
    hittersData: hittersData,
    pitchersData: pitchersData,
  });
}
