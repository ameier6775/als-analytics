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

  // Filter out hitters with very few at bats
  const hittersArray = dataHitterStandard.filter((player) => parseInt(player.AB) > 50);

  //   Joining the two hitter fan graphs tables by team name
  const data = [];
  for (let i = 0; i < hittersArray.length; i++) {
    const standardHitterElement = hittersArray[i];

    // Adding these two fields for the dropdown
    standardHitterElement.value = standardHitterElement['Player'];
    standardHitterElement.label = standardHitterElement['Player'];

    // Putting both objects values into one & inserting it into the array
    const element = {
      ...standardHitterElement,
    };
    data.push(element);
  }

  // Response
  res.status(200).json({
    data: data,
  });
}
