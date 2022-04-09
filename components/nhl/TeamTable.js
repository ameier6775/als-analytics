import Link from 'next/link';

const TeamTable = ({ team }) => {
  return (
    <table key={team.id}>
      <thead></thead>
      <tbody>
        <tr>
          <td className="subCategoryTable" colSpan={8}>
            Totals
          </td>
        </tr>
        {/* <tr className="subCategoryGroupHeader">
          <td colSpan={1}></td>
          <td colSpan={3}>Corsi</td>
        </tr> */}
        <tr>
          <td className="tableHeaders">Games Played</td>
          <td className="tableHeaders">Corsi For</td>
          <td className="tableHeaders">Corsi Against</td>
          <td className="tableHeaders">Corsi</td>
          <td className="tableHeaders">Corsi %</td>
          <td className="tableHeaders">Fenwick For</td>
          <td className="tableHeaders">Fenwick Against</td>
        </tr>
        <tr>
          <td className="tableCells">{team.own_record.statistics.total.games_played}</td>
          <td className="tableCells">{team.own_record.statistics.total.corsi_for}</td>
          <td className="tableCells">{team.own_record.statistics.total.corsi_against}</td>
          <td className="tableCells">{team.own_record.statistics.total.corsi_total}</td>
          <td className="tableCells"> {team.own_record.statistics.total.corsi_pct.toFixed(2).substring(2)}%</td>
          <td className="tableCells">{team.own_record.statistics.total.fenwick_for}</td>
          <td className="tableCells">{team.own_record.statistics.total.fenwick_against}</td>
        </tr>
        <tr>
          <td className="tableHeaders">Fenwick</td>
          <td className="tableHeaders">Fenwick %</td>
          <td className="tableHeaders">Shots For</td>
          <td className="tableHeaders">Shots Against</td>
          <td className="tableHeaders">Shot Differential</td>
          <td className="tableHeaders">Shots %</td>
          <td className="tableHeaders">SH% + SV%</td>
        </tr>
        <tr>
          <td className="tableCells">{team.own_record.statistics.total.fenwick_total}</td>
          <td className="tableCells">{team.own_record.statistics.total.fenwick_pct.toFixed(2).substring(2)}%</td>
          <td className="tableCells">{team.own_record.statistics.total.on_ice_shots_for}</td>
          <td className="tableCells">{team.own_record.statistics.total.on_ice_shots_against}</td>
          <td className="tableCells">{team.own_record.statistics.total.on_ice_shots_differential}</td>
          <td className="tableCells">{team.own_record.statistics.total.on_ice_shots_pct.toFixed(2).substring(2)}%</td>
          <td className="tableCells">{team.own_record.statistics.total.pdo.toFixed(2)}</td>
        </tr>
        <tr>
          <td className="subCategoryTable" colSpan={8}>
            Averages
          </td>
        </tr>
        <tr>
          <td className="tableHeaders">Corsi For</td>
          <td className="tableHeaders">Corsi Against</td>
          <td className="tableHeaders">Fenwick For</td>
          <td className="tableHeaders">Fenwick Against</td>
          <td className="tableHeaders">Shots For</td>
          <td className="tableHeaders">Shots Against</td>
          <td className="tableHeaders">Shot Differential</td>
        </tr>
        <tr>
          <td className="tableCells">{team.own_record.statistics.average.corsi_for}</td>
          <td className="tableCells">{team.own_record.statistics.average.corsi_against}</td>
          <td className="tableCells">{team.own_record.statistics.average.fenwick_for}</td>
          <td className="tableCells">{team.own_record.statistics.average.fenwick_against}</td>
          <td className="tableCells">{team.own_record.statistics.average.on_ice_shots_for}</td>
          <td className="tableCells">{team.own_record.statistics.average.on_ice_shots_against}</td>
          <td className="tableCells">{team.own_record.statistics.average.average_shot_distance.toFixed(2)}</td>
        </tr>
        <tr>
          <td colSpan={7} className="subCategoryTable">
            Shots
          </td>
        </tr>
        <tr align="center">
          <td></td>
          <td className="tableHeaders">Type</td>
          <td className="tableHeaders">Shots</td>
          <td className="tableHeaders">Goals</td>
          <td className="tableHeaders">S/PG</td>
          <td className="tableHeaders">G/PG</td>
        </tr>
        <tr>
          <td></td>
          <td className="tableCells">Wrist</td>
          <td className="tableCells">{team.own_record.statistics.total.shots.wrist_shot_shots}</td>
          <td className="tableCells">{team.own_record.statistics.total.shots.wrist_shot_goals}</td>
          <td className="tableCells">{team.own_record.statistics.average.shots.wrist_shot_shots}</td>
          <td className="tableCells">{team.own_record.statistics.average.shots.wrist_shot_goals}</td>
        </tr>
        <tr>
          <td></td>

          <td className="tableCells">Slap</td>
          <td className="tableCells">{team.own_record.statistics.total.shots.slap_shot_shots}</td>
          <td className="tableCells">{team.own_record.statistics.total.shots.slap_shot_goals}</td>
          <td className="tableCells">{team.own_record.statistics.average.shots.slap_shot_shots}</td>
          <td className="tableCells">{team.own_record.statistics.average.shots.slap_shot_goals}</td>
        </tr>
        <tr>
          <td></td>

          <td className="tableCells">Backhand</td>
          <td className="tableCells">{team.own_record.statistics.total.shots.backhand_shot_shots}</td>
          <td className="tableCells">{team.own_record.statistics.total.shots.backhand_shot_goals}</td>
          <td className="tableCells">{team.own_record.statistics.average.shots.backhand_shot_shots}</td>
          <td className="tableCells">{team.own_record.statistics.average.shots.backhand_shot_goals}</td>
        </tr>
        <tr>
          <td></td>

          <td className="tableCells">Tip</td>
          <td className="tableCells">{team.own_record.statistics.total.shots.tip_shot_shots}</td>
          <td className="tableCells">{team.own_record.statistics.total.shots.tip_shot_goals}</td>
          <td className="tableCells">{team.own_record.statistics.average.shots.tip_shot_shots}</td>
          <td className="tableCells">{team.own_record.statistics.average.shots.tip_shot_goals}</td>
        </tr>
        <tr>
          <td></td>

          <td className="tableCells">Snap</td>
          <td className="tableCells">{team.own_record.statistics.total.shots.snap_shot_shots}</td>
          <td className="tableCells">{team.own_record.statistics.total.shots.snap_shot_goals}</td>
          <td className="tableCells">{team.own_record.statistics.average.shots.snap_shot_shots}</td>
          <td className="tableCells">{team.own_record.statistics.average.shots.snap_shot_goals}</td>
        </tr>
        <tr>
          <td></td>

          <td className="tableCells">Wrap Around</td>
          <td className="tableCells">{team.own_record.statistics.total.shots.wrap_around_shot_shots}</td>
          <td className="tableCells">{team.own_record.statistics.total.shots.wrap_around_shot_goals}</td>
          <td className="tableCells">{team.own_record.statistics.average.shots.wrap_around_shot_shots}</td>
          <td className="tableCells">{team.own_record.statistics.average.shots.wrap_around_shot_goals}</td>
        </tr>
        <tr>
          <td className="subCategoryTable" colSpan={7}>
            Depth Chart
          </td>
        </tr>
        <tr>
          <td className="tableHeaders">Type</td>
          <td className="tableHeaders">Position</td>
          <td className="tableHeaders">GP</td>
          <td className="tableHeaders">CF</td>
          <td className="tableHeaders">CA</td>
          <td className="tableHeaders">CT</td>
          <td className="tableHeaders">C%</td>
        </tr>
        {team.players.map((player) => (
          // eslint-disable-next-line react/jsx-key
          <Link passHref={true} href={`/players/${player.id}`}>
            <tr key={player.id}>
              <td className="tableCells">{player.full_name} </td>
              <td className="tableCells">{player.primary_position}</td>
              <td className="tableCells">{player.statistics.total.games_played}</td>
              <td className="tableCells">{player.statistics.total.corsi_for}</td>
              <td className="tableCells">{player.statistics.total.corsi_against}</td>
              <td className="tableCells">{player.statistics.total.corsi_total}</td>
              <td className="tableCells">{player.statistics.total.corsi_pct}</td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
};
export default TeamTable;
