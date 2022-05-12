import Excel from 'exceljs';
import _, { groupBy, keyBy, omit, pick, orderBy } from 'lodash';
import path from 'path';

export default async function handler(req, res) {
  const dir = path.resolve('../stats-app/data/mlb/players/2022');

  // Hitters Standard Data
  const columnArrayHitterFGStandard =
    'Player Team Pos Age G AB R H 2B 3B HR RBI SB CS BB SO SH SF HBP AVG OBP SLG OPS'.split(/\s+/);

  type ColumnHeaderForHitterFGStandard = { [C in typeof columnArrayHitterFGStandard[number]]: number };
  const columnHeaderMapHitterFGStandard: ColumnHeaderForHitterFGStandard = columnArrayHitterFGStandard.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookHitterFGStandard = new Excel.Workbook();
  await workbookHitterFGStandard.csv.readFile(`${dir}/Hitters.csv`);
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

  //   Joining the two hitter fan graphs tables by team name
  const data = [];
  for (let i = 0; i < dataHitterFGStandard.length; i++) {
    const standardHitterElement = dataHitterFGStandard[i];

    // Adding these two fields for the dropdown
    standardHitterElement.value = standardHitterElement['Player'];
    standardHitterElement.label = standardHitterElement['Player'];

    // Finding advanced data object by the standards team name
    //   const advancedHitterElement = dataHitterFGAdvanced.find((obj) => obj['Player'] === standardHitterElement['Player']);
    //   const standardPitcherElement = dataPitcherFGStandard.find(
    //     (obj) => obj['Player'] === standardHitterElement['Player'],
    //   );
    //   const advancedPitcherElement = dataPitcherFGAdvanced.find(
    //     (obj) => obj['Player'] === standardHitterElement['Player'],
    //   );

    // Putting both objects values into one & inserting it into the array
    const element = {
      ...standardHitterElement,
      //     ...advancedHitterElement,
      //     ...standardPitcherElement,
      //     ...advancedPitcherElement,
    };
    data.push(element);
  }

  // Response
  res.status(200).json({
    data: dataHitterFGStandard,
  });
}
