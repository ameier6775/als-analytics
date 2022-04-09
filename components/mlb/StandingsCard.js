import Link from 'next/link';
import styles from '../../styles/Card.module.css';

const StandingsCard = ({ team }) => {
  return (
    <>
      <div key={team.id} className={styles.card}>
        <div className={styles.container}>
          <Link passHref={true} href={`/mlb/teams/${team.id}`}>
            <h4 className={styles.h4}>
              <b>
                {team.market} {team.name}
              </b>
            </h4>
          </Link>
          <p className={styles.pC}>Ranks</p>
          <p className={styles.pL}>Division:</p>
          <p className={styles.pR}>#{team.rank.division}</p>
          <p className={styles.pL}>League:</p>
          <p className={styles.pR}>#{team.rank.league}</p>
          <p className={styles.pL}>Games Back:</p>
          <p className={styles.pR}>#{team.games_back}</p>
          <p className={styles.pL}>Percentage:</p>
          <p className={styles.pR}>{team.win_p}%</p>

          <p className={styles.pC}>Records</p>
          <p className={styles.pL}>Overall:</p>
          <p className={styles.pR}>
            {team.wins}-{team.losses}
          </p>
          <p className={styles.pL}>Home:</p>
          <p className={styles.pR}>
            {team.home_win}-{team.home_loss}
          </p>
          <p className={styles.pL}>Away:</p>
          <p className={styles.pR}>
            {team.away_win}-{team.away_loss}
          </p>
          <p className={styles.pL}>Streak:</p>
          <p className={styles.pR}>{team.streak}</p>
        </div>
      </div>
    </>
  );
};
export default StandingsCard;
