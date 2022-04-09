import Link from 'next/link';
import styles from '../../styles/Card.module.css';
const StandingsCard = ({ team }) => {
  return (
    <div key={team.id} className={styles.card}>
      <div className={styles.container}>
        <Link passHref={true} href={`/teams/${team.id}`}>
          <h4 className={styles.h4}>
            <b>
              {team.market} {team.name}
            </b>
          </h4>
        </Link>
        <p className={styles.pC}>Ranks</p>
        <p className={styles.pL}>Division:</p>
        <p className={styles.pR}>#{team.rank.division}</p>
        <p className={styles.pL}>Conference:</p>
        <p className={styles.pR}>#{team.rank.conference}</p>
        <p className={styles.pC}>Points</p>
        <p className={styles.pL}>Total:</p>
        <p className={styles.pR}>{team.points}</p>
        <p className={styles.pL}>Percentage:</p>
        <p className={styles.pR}>{team.points_pct}%</p>

        <p className={styles.pC}>Records</p>
        <p className={styles.pL}>Overall:</p>
        <p className={styles.pR}>
          {team.wins}-{team.losses}-{team.overtime_losses}
        </p>
        <p className={styles.pL}>Home:</p>
        <p className={styles.pR}>
          {team.records[4].wins}-{team.records[4].losses}-{team.records[4].overtime_losses}
        </p>
        <p className={styles.pL}>Away:</p>
        <p className={styles.pR}>
          {team.records[10].wins}-{team.records[10].losses}-{team.records[10].overtime_losses}
        </p>
        <p className={styles.pL}>Last Ten:</p>
        <p className={styles.pR}>
          {team.records[5].wins}-{team.records[5].losses}-{team.records[5].overtime_losses}
        </p>
        <p className={styles.pC}>Special Teams</p>
        <p className={styles.pL}>Power-Play:</p>
        <p className={styles.pR}>{team.powerplay_pct}%</p>
        <p className={styles.pL}>Penalty-Kill:</p>
        <p className={styles.pR}>{team.penalty_killing_pct}%</p>
        <p className={styles.pC}>Other</p>
        <p className={styles.pL}>Games Played:</p>
        <p className={styles.pR}>{team.games_played}</p>
        <p className={styles.pL}>Goal Differential:</p>
        <p className={styles.pR}>{team.goal_diff}</p>
        <p className={styles.pL}>Streak:</p>
        <p className={styles.pR}>
          {team.streak.length}
          {team.streak.kind.substring(0, 1).toUpperCase()}
        </p>
        <p className={styles.pL}>Regulation Wins:</p>
        <p className={styles.pR}>{team.regulation_wins}</p>
      </div>
    </div>
  );
};
export default StandingsCard;
