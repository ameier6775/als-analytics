/* eslint-disable react/jsx-key */
import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import {
  LineChart,
  Scatter,
  ScatterChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  BarChart,
  YAxis,
  Legend,
  Bar,
  RadialBar,
  RadialBarChart,
  Cell,
  LabelList,
  Label,
  Text,
  ResponsiveContainer,
  ZAxis,
  AreaChart,
  Area,
} from 'recharts';
import StandingsCard from '../../components/nhl/StandingsCard';

const fetcher = (url) => fetch(url).then((res) => res.json());

const COLORS = ['#FFADAD', '#CAFFBF', '#BDB2FF', '#FFD6A5', '#9BF6FF', '#FFC6FF', '#FDFFB6', '#A0C4FF', '#FFFFFC'];
const ZONECOLORS = ['#fe2712', '#ff7e00', '#ffbe00'];
const COMPARISONCOLORS = ['#ff1b6b', '#45caff'];

export default function Teams() {
  const { data, error } = useSWR(`/api/nhl/teams`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  // Setting up data for the charts
  const moneyPuckData = data.dataMoneyPuck;
  const teams = data.data;
  const powerPlay = data.dataMoneyPuck.filter((team) => team.situation === '5on4');
  const evenStrength = data.dataMoneyPuck.filter((team) => team.situation === '5on5');
  const shortHanded = data.dataMoneyPuck.filter((team) => team.situation === '4on5');
  const allSituations = data.dataMoneyPuck.filter((team) => team.situation === 'all');

  // More data arrays for even strength play
  var evenStrengthLineChartData = [];
  var evenStrengthAreaChartData = [];
  for (let i = 0; i < 32; i++) {
    evenStrengthLineChartData.push(evenStrength[i]);
    evenStrengthAreaChartData.push(evenStrength[i]);
  }

  // Divisions (Hockey-Reference Data)
  // var atlantic = [teams[2], teams[3], teams[10], teams[12], teams[15], teams[20], teams[26], teams[27]];
  // var central = [teams[1], teams[6], teams[7], teams[9], teams[14], teams[16], teams[25], teams[31]];
  // var metro = [teams[5], teams[8], teams[17], teams[18], teams[19], teams[21], teams[22], teams[30]];
  // var pacific = [teams[0], teams[4], teams[11], teams[13], teams[23], teams[24], teams[28], teams[29]];

  // Conferences (Hockey-Reference Data)
  var east = [
    teams[2],
    teams[3],
    teams[5],
    teams[8],
    teams[10],
    teams[12],
    teams[15],
    teams[17],
    teams[18],
    teams[19],
    teams[20],
    teams[21],
    teams[22],
    teams[26],
    teams[27],
    teams[30],
  ];
  var west = [
    teams[0],
    teams[1],
    teams[4],
    teams[6],
    teams[7],
    teams[9],
    teams[11],
    teams[13],
    teams[14],
    teams[16],
    teams[23],
    teams[24],
    teams[25],
    teams[28],
    teams[29],
    teams[31],
  ];

  // Sorting the data
  east.sort(function (a, b) {
    var keyA = a.pointsPercentage;
    var keyB = b.pointsPercentage;
    if (keyA > keyB) return 1;
    if (keyA < keyB) return -1;
  });
  west.sort(function (a, b) {
    var keyA = a.pointsPercentage;
    var keyB = b.pointsPercentage;
    if (keyA > keyB) return 1;
    if (keyA < keyB) return -1;
  });
  powerPlay.sort(function (a, b) {
    var keyA = a.goalsFor;
    var keyB = b.goalsFor;
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
  });
  evenStrength.sort(function (a, b) {
    var keyA = a.goalsFor;
    var keyB = b.goalsFor;
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
  });
  evenStrengthAreaChartData.sort(function (a, b) {
    var keyA = a.team;
    var keyB = b.team;
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
  });
  shortHanded.sort(function (a, b) {
    var keyA = a.goalsAgainst;
    var keyB = b.goalsAgainst;
    if (keyA > keyB) return 1;
    if (keyA < keyB) return -1;
  });
  allSituations.sort(function (a, b) {
    var keyA = a.offensiveAwareness;
    var keyB = b.offensiveAwareness;
    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
  });

  console.log(allSituations);

  // Need this for even strength area chart
  const renderTooltipContent = (o) => {
    const { payload, label } = o;
    const total = payload.reduce((result, entry) => result + entry.value, 0);

    return (
      <div className="customized-tooltip-content">
        <p className="total">{`${label} (Total: ${total.toFixed(2)})`}</p>
        <ul className="list">
          {payload.map((entry, index) => (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;
  const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio, 2);
  };

  // Triangle Bar Chart
  const getPath = (x, y, width, height) => `M${x},${y + height}
            C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
            C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
            Z`;

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  TriangleBar.propTypes = {
    x: Number,
    y: Number,
    width: Number,
    height: Number,
  };

  return (
    <>
      <div className="teamCharts">
        {/* Custom Made Analytics */}
        <h1>Als Analytics</h1>
        <h2>Decision Making</h2>
        <h3>Offensive Zone</h3>
        <BarChart
          width={1400}
          height={600}
          data={allSituations}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tick={false} />
          <Tooltip />
          <Bar dataKey="offensiveAwareness" shape={<TriangleBar />}>
            {allSituations.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>

        {/* Radial Bar Chart */}
        {/* East */}
        <h2>Points %</h2>
        <h3>Eastern Conference</h3>
        <RadialBarChart
          width={1400}
          height={975}
          innerRadius={100}
          outerRadius={500}
          barSize={20}
          data={east}
          startAngle={180}
          endAngle={-180}
          cx="50%"
          cy="50%"
        >
          <RadialBar
            label={{
              fill: '#333333',
              position: 'insideStart',
              fontSize: '18px',
              fontWeight: 600,
              fontFamily: 'OCR A Std, monospace',
              fontStretch: 'max',
            }}
            background={{ fill: '#c2c2c2' }}
            clockWise={true}
            dataKey="pointsPercentage"
            animationEasing="ease-in"
          >
            {east.map((team, index) => (
              <Cell key={team.name} value={team.name + ' - ' + team.points} fill={COLORS[index % COLORS.length]}></Cell>
            ))}
          </RadialBar>
          <Tooltip />
        </RadialBarChart>
        {/* West */}
        <h3>Western Conference</h3>
        <RadialBarChart
          width={1400}
          height={975}
          innerRadius={100}
          outerRadius={500}
          barSize={20}
          data={west}
          startAngle={180}
          endAngle={-180}
          cx="50%"
          cy="50%"
        >
          <RadialBar
            label={{
              fill: '#333333',
              position: 'insideStart',
              fontSize: '18px',
              fontWeight: 600,
              fontFamily: 'OCR A Std, monospace',
              fontStretch: 'max',
            }}
            background={{ fill: '#c2c2c2' }}
            clockWise={true}
            dataKey="pointsPercentage"
            animationEasing="ease-in"
          >
            {west.map((team, index) => (
              <Cell key={team.name} value={team.name + ': ' + team.points} fill={COLORS[index % COLORS.length]}></Cell>
            ))}
          </RadialBar>
          <Tooltip />
        </RadialBarChart>

        {/* Even Strength */}
        <h2>Even Strength</h2>
        {/* Area Chart */}
        <h3>Expected Goals For By Type</h3>
        <AreaChart
          width={1400}
          height={600}
          data={evenStrengthAreaChartData}
          stackOffset="expand"
          margin={{
            top: 10,
            right: 10,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="team" />
          <YAxis tickFormatter={toPercent} />
          <Tooltip content={renderTooltipContent} />
          <Area type="monotone" dataKey="lowDangerxGoalsFor" stackId="1" stroke="#222831" fill={ZONECOLORS[2]} />
          <Area type="monotone" dataKey="mediumDangerxGoalsFor" stackId="1" stroke="#222831" fill={ZONECOLORS[1]} />
          <Area type="monotone" dataKey="highDangerxGoalsFor" stackId="1" stroke="#222831" fill={ZONECOLORS[0]} />
        </AreaChart>

        {/* Types of Goals */}
        <h3>Actual Goals For By Type</h3>
        <BarChart width={1400} height={600} data={evenStrength}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize="13px" fontStyle="italic" tickSize={10} />
          <YAxis dataKey="goalsFor" />
          <Tooltip />
          <Legend />
          <Bar dataKey="lowDangerGoalsFor" stackId="a" fill={ZONECOLORS[2]} />
          <Bar dataKey="mediumDangerGoalsFor" stackId="a" fill={ZONECOLORS[1]} />
          <Bar dataKey="highDangerGoalsFor" stackId="a" fill={ZONECOLORS[0]} />
        </BarChart>

        {/* Offense */}
        <h3>Expected vs Actual Goals For</h3>
        <LineChart
          width={1400}
          height={600}
          data={evenStrength.sort((a, b) => (a.goalsFor > b.goalsFor ? -1 : 1))}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize="13px" dataKey="name" name="Team" fontStyle="italic" tickSize={10}></XAxis>
          <YAxis tickSize={10}>
            {/* <Label
              value="🚨 GOALS 🚨"
              position="insideLeft"
              angle={-90}
              offset={10}
              viewBox={0}
              fontWeight={500}
              fontSize="19px"
              fontFamily="OCR A Std, monospace"
            /> */}
          </YAxis>
          <Tooltip value="Goals" />
          <Legend />
          <Line type="monotone" dataKey="xGoalsFor" stroke={COMPARISONCOLORS[0]} />
          <Line type="monotone" dataKey="goalsFor" stroke={COMPARISONCOLORS[1]} />
        </LineChart>
        {/* Defense */}
        <h3>Expected vs Actual Goals Against</h3>
        <LineChart
          width={1400}
          height={600}
          data={evenStrengthLineChartData.sort((a, b) => (a.goalsAgainst > b.goalsAgainst ? 1 : -1))}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize="13px" dataKey="name" name="Team" fontStyle="italic" tickSize={10}></XAxis>
          <YAxis tickSize={10}></YAxis>
          <Tooltip value="Goals" />
          <Legend />
          <Line type="monotone" dataKey="xGoalsAgainst" stroke={COMPARISONCOLORS[0]} />
          <Line type="monotone" dataKey="goalsAgainst" stroke={COMPARISONCOLORS[1]} />
        </LineChart>
        {/* Power Play */}
        <h2>Power Play</h2>
        {/* Types of Goals */}
        <h3>Actual Goals For By Type</h3>
        <BarChart width={1400} height={600} data={powerPlay}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize="13px" fontStyle="italic" tickSize={10} />
          <YAxis dataKey="goalsFor" />
          <Tooltip />
          <Legend />
          <Bar dataKey="lowDangerGoalsFor" stackId="a" fill={ZONECOLORS[2]} />
          <Bar dataKey="mediumDangerGoalsFor" stackId="a" fill={ZONECOLORS[1]} />
          <Bar dataKey="highDangerGoalsFor" stackId="a" fill={ZONECOLORS[0]} />
        </BarChart>

        {/* Offense */}
        <h3>Expected vs Actual Goals For</h3>
        <LineChart
          width={1400}
          height={600}
          data={powerPlay.sort((a, b) => (a.goalsFor > b.goalsFor ? -1 : 1))}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize="13px" dataKey="name" name="Team" fontStyle="italic" tickSize={10}></XAxis>
          <YAxis tickSize={10}></YAxis>
          <Tooltip value="Goals" />
          <Legend />
          <Line type="monotone" dataKey="xGoalsFor" stroke={COMPARISONCOLORS[0]} />
          <Line type="monotone" dataKey="goalsFor" stroke={COMPARISONCOLORS[1]} />
        </LineChart>
        {/* Short Handed */}
        <h2>Short Handed</h2>
        {/* Types of Goals */}
        <h3>Actual Goals Against By Type</h3>
        <BarChart width={1400} height={600} data={shortHanded}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize="13px" fontStyle="italic" tickSize={10} />
          <YAxis dataKey="goalsAgainst" />
          <Tooltip />
          <Legend />
          <Bar dataKey="lowDangerGoalsAgainst" stackId="a" fill={ZONECOLORS[2]} />
          <Bar dataKey="mediumDangerGoalsAgainst" stackId="a" fill={ZONECOLORS[1]} />
          <Bar dataKey="highDangerGoalsAgainst" stackId="a" fill={ZONECOLORS[0]} />
        </BarChart>

        {/* Defense */}
        <h3>Expected vs Actual Goals Against</h3>
        <LineChart
          width={1400}
          height={600}
          data={shortHanded.sort((a, b) => (a.goalsAgainst > b.goalsAgainst ? 1 : -1))}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize="13px" dataKey="name" name="Team" fontStyle="italic" tickSize={10}></XAxis>
          <YAxis tickSize={10}></YAxis>
          <Tooltip value="Goals" />
          <Legend />
          <Line type="monotone" dataKey="xGoalsAgainst" stroke={COMPARISONCOLORS[0]} />
          <Line type="monotone" dataKey="goalsAgainst" stroke={COMPARISONCOLORS[1]} />
        </LineChart>
      </div>

      {/* <div className="sideBySide">
        <h2 className="font-mono">{central.name}</h2>
        {data ? central.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>) : <p>Loading</p>}
      </div>

      <div className="sideBySide">
        <h2 className="font-mono">{pacific.name}</h2>
        {data ? pacific.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>) : <p>Loading</p>}
      </div>
      <div className="sideBySide">
        <h2 className="font-mono">{atlantic.name}</h2>
        {data ? (
          atlantic.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>)
        ) : (
          <p>Loading</p>
        )}
      </div>

      <div className="sideBySide">
        <h2 className="font-mono">{metro.name}</h2>
        {data ? metro.teams.map((team) => <StandingsCard key={team.id} team={team}></StandingsCard>) : <p>Loading</p>}
      </div> */}
    </>
  );
}
