import Excel from 'exceljs';
import _, { groupBy, keyBy, omit, pick, orderBy } from 'lodash';
import path from 'path';

export default async function handler(req, res) {
  const dir = path.resolve('../stats-app/data/mlb/teams/2022');

  // Fan Graphs Standard Data
  const columnArrayFGStandard = 'Team G AB PA H 1B 2B 3B HR R RBI BB IBB SO HBP SF SH GDP SB CS AVG'.split(/\s+/);

  type ColumnHeaderForFGStandard = { [C in typeof columnArrayFGStandard[number]]: number };
  const columnHeaderMapFGStandard: ColumnHeaderForTeamsMoneyPuck = columnArrayFGStandard.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookFGStandard = new Excel.Workbook();
  await workbookFGStandard.csv.readFile(`${dir}/FGStandard.csv`);
  const worksheetFGStandard = workbookFGStandard.worksheets[0];
  const dataFGStandard = [];

  worksheetFGStandard.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapFGStandard).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataFGStandard.push(rowObject);
    }
  });

  // Fan Graphs Standard Data
  const columnArrayFGAdvanced =
    'Team PA BBRate KRate BBPerK AVG OBP SLG OPS ISO Spd BABIP UBR wGDP wSB wRC wRAA wOBA wRC'.split(/\s+/);

  type ColumnHeaderForFGAdvanced = { [C in typeof columnArrayFGAdvanced[number]]: number };
  const columnHeaderMapFGAdvanced: ColumnHeaderForFGAdvanced = columnArrayFGAdvanced.reduce(
    (acc, value, index) => ({ ...acc, [value]: index + 1 }),
    {},
  );

  const workbookFGAdvanced = new Excel.Workbook();
  await workbookFGAdvanced.csv.readFile(`${dir}/FGAdvanced.csv`);
  const worksheetFGAdvanced = workbookFGAdvanced.worksheets[0];
  const dataFGAdvanced = [];

  worksheetFGAdvanced.eachRow((row, rowNumber) => {
    const rowObject = Object.entries(columnHeaderMapFGAdvanced).reduce((acc, value) => {
      return {
        ...acc,
        [value[0]]: row.values[value[1]],
      };
    }, {});

    if (rowNumber !== 1) {
      dataFGAdvanced.push(rowObject);
    }
  });

  // Joining the two hockey-reference tables
  const data = [];
  for (let i = 0; i < 30; i++) {
    const standardElement = dataFGStandard[i];
    const advancedElement = dataFGAdvanced[i];
    const element = { ...standardElement, ...advancedElement };
    data.push(element);
  }

  // Response
  res.status(200).json({
    data: data,
  });
}
